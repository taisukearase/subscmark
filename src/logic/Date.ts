import { getDate, setDate, subMonths, isAfter } from 'date-fns'

export const isRead = (lastReadDay?: string , type?: string, date?: number[]): boolean => {
  console.log('hoge')
  if (lastReadDay === undefined) return false
  const lastReadDate = new Date(lastReadDay)
  switch (type) {
    case 'day':
      return true
    case 'week':
      return true
    case 'month':
      return isAfter(lastReadDate, getPrevDate(date))
    default:
      return false
  }
}

const getPrevDate = (date?: number[]): Date => {
  if (date === undefined) {
    debugger
    throw Error
  }
  const today = getDate(new Date())
  if (today < Math.min(...date)) {
    return subMonths(setDate(new Date(), Math.max(...date)), 1)
  }
  const prevDate = date.reduce((acc, crr) => acc < crr && crr <= today ? crr : acc)
  return setDate(new Date(), prevDate)
}
