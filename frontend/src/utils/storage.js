const KEY = 'elexmart_v1'
export const loadState = () => {
  try {
    const s = localStorage.getItem(KEY)
    return s ? JSON.parse(s) : undefined
  } catch { return undefined }
}
export const saveState = (state) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {}
}
