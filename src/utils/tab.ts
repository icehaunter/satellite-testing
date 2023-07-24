import { genUUID } from 'electric-sql/util'

const key = 'electric.intro.tab:id'

export const getOrSetTabId = (): string => {
  const existingTabId = sessionStorage.getItem(key)

  if (existingTabId !== null) {
    return existingTabId
  }

  const newTabId = genUUID()
  sessionStorage.setItem(key, newTabId)

  return newTabId
}
