import { Item } from './electric'
// import styles from './styles.module.css'

type Props = {
  add: () => Promise<void>
  clear: () => Promise<void>
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
        {itemsArray.map((item: Item) => (
          <div
            key={item.id}
            className={'w-10 h-10 relative inline-block mr-2 bg-current'}
          />
        ))}
      </div>
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
    </>
  )
}

export default ItemsWidget
