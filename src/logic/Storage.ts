export const setUserCd = (value: string): string | false => {
  try {
    localStorage.setItem('userCd', value)
    return value
  } catch (e) {
    return false
  }
}

export const getUserCd = (): string | null | false => {
  try {
    return localStorage.getItem('userCd')
  } catch (e) {
    return false
  }
}

export default null
