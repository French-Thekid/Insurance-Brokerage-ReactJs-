// Taken from /src/app/support
const cache = {}

function has(key) {
  return cache.hasOwnProperty(key)
}

function put(key, value) {
  cache[key] = value
}

function get(key) {
  if (!cache.hasOwnProperty(key)) return null

  return cache[key]
}

export const SimpleCache = { put, get, has }
