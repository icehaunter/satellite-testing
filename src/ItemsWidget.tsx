import { Item } from './electric'
// import styles from './styles.module.css'

type Props = {
  add: () => void
  clear: () => void
  items: Item[] | undefined
  inProgress?: boolean
  disableWhenInProgress: boolean
  itemColor: string
}

const ItemsWidget = ({
  add,
  clear,
  items,
  inProgress,
  disableWhenInProgress, // itemColor,
}: Props) => {
  const itemsArray = items !== undefined ? [...items] : []
  const shouldDisable = inProgress && disableWhenInProgress

  return (
    <>
      <div>
        <button
          className="button button--secondary button--outline me-2"
          disabled={shouldDisable}
          onMouseDown={add}
        >
          Add
        </button>
        <button
          className="button button--secondary button--outline"
          disabled={shouldDisable}
          onMouseDown={clear}
        >
          Clear
        </button>
      </div>
      <div className='grid grid-cols-4 gap-3'>
        {itemsArray.map((item: Item) => (
          <div
            key={item.id}
            className={'h-30 relative inline-block bg-current p-2 font-mono'}
          >
            <span className="text-white">{item.id}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default ItemsWidget
