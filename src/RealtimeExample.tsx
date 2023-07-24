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

export default function Realtime({
  itemColor,
  userId,
}: {
  itemColor: string
  userId: number
}) {
  const { db } = useElectric()!
  const { demo } = useDemoContext()!

  const { results: liveItems } = useLiveQuery(
    db.items.liveMany({
      where: {
        demo_id: demo.id,
      },
      orderBy: {
        inserted_at: 'asc',
      },
      take: 24,
    }),
  )

  const add = async () => {
    await db.items.create({
      data: newItem(demo.id),
    })
  }

  const clear = async () => {
    await db.items.deleteMany({
      where: {
        demo_id: demo.id,
      },
    })
  }

  if (liveItems === undefined) {
    return null
  }

  return (
    <div className="mb-4">
      <div>
        <label className={'section-label text-small ' + itemColor}>
          User: {userId}
        </label>
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
