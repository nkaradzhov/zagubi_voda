const key = 'zagubi_voda_key'

export const getAll = () => JSON.parse(localStorage.getItem(key) || '[]')

const set = obj => {
  localStorage.setItem(key, JSON.stringify(obj))
  window.dispatchEvent(new Event('localstorage'))
}

export const del = time => set(getAll().filter(item => item.time !== time))

export const save = (payload, name) => {
  set([
    ...getAll(),
    {
      name,
      time: Date.now(),
      payload
    }
  ])
}
