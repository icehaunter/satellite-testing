const get = (key: string): unknown => {
  const itemStr = localStorage.getItem(key)

  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr) as {expiry: number, value: unknown}
  const now = new Date()

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key)

    return null
  }

  return item.value
}

const set = (key: string, value: unknown, ttl: number) => {
  const now = new Date()

  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  }

  localStorage.setItem(key, JSON.stringify(item))
}

const unset = (key: string) => {
  localStorage.removeItem(key)
}

export default {
  get: get,
  set: set,
  unset: unset,
}
