import { useState } from 'react'
import { Item, useElectric } from './electric'
import { useDemoContext } from './utils/models'
import { useLiveQuery } from 'electric-sql/react'
import { genUUID } from 'electric-sql/util'
import ItemsWidget from './ItemsWidget'

const newItem = (demo_id: string): Item => {
  return {
    id: genUUID(),
    inserted_at: `${Date.now()}`,
    demo_id: demo_id,
  }
}

let expectingItem = ''

export default function Realtime({
  itemColor,
  userId,
}: {
  itemColor: string
  userId: number
}) {
  const { db } = useElectric()!
  const { demo } = useDemoContext()!

  const [count, setCount] = useState(24)

  const { results: liveItems } = useLiveQuery(
    db.items.liveMany({
      where: {
        demo_id: demo.id,
      },
      orderBy: {
        inserted_at: 'asc',
      },
      take: count,
    }),
  )

  const add = () => {
    const item = newItem(demo.id)

    expectingItem = item.id
    console.time('full-insert')

    db.items
      .create({
        data: item,
      })
      .then(() => console.time('insert-to-live'))
      .catch((x) => console.error(x))
  }

  const clear = () => {
    db.items
      .deleteMany({
        where: {
          demo_id: demo.id,
        },
      })
      .catch((x) => console.error(x))
  }

  const runTest = () => {
    db.raw({
      sql: `INSERT INTO sessions (id, inserted_at) VALUES ('...')`,
    }).catch((e) => console.error(e))
  }

  if (liveItems?.some((x) => x.id === expectingItem)) {
    console.timeEnd('insert-to-live')
    console.timeEnd('full-insert')
  }

  if (liveItems === undefined) {
    return null
  }

  return (
    <div className="mb-4">
      WHY
      <div>
        <label className={'section-label text-small ' + itemColor}>
          User: {userId}
        </label>
        <label>
          Limit:{' '}
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </label>
        <button onClick={() => runTest()}>TEST</button>
      </div>
      <ItemsWidget
        add={add}
        clear={clear}
        items={liveItems}
        itemColor={itemColor}
        disableWhenInProgress={false}
      />
    </div>
  )
}
