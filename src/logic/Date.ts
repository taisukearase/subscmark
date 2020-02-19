import { getDate, setDate, subMonths, isAfter, startOfDay } from 'date-fns'

export const isRead = (lastReadDay?: string, type?: string, date?: number[]): boolean => {
  if (lastReadDay === undefined) return false
  const lastReadDateTime = new Date(lastReadDay)
  switch (type) {
    case 'day':
      return isAfter(lastReadDateTime, startOfDay(new Date()))
    case 'week':
      return isAfter(lastReadDateTime, startOfDay(getPrevDate(getWeekDates(date))))
    case 'month':
      return isAfter(lastReadDateTime, startOfDay(getPrevDate(date)))
    default:
      return false
  }
}

const getPrevDate = (date?: number[]): Date => {
  if (date === undefined) {
    throw Error
  }
  const today = getDate(new Date())
  if (today < Math.min(...date)) {
    return subMonths(setDate(new Date(), Math.max(...date)), 1)
  }
  const prevDate = date.reduce((acc, crr) => (acc < crr && crr <= today ? crr : acc))
  return setDate(new Date(), prevDate)
}

const getWeekDates = (date?: number[]): number[] => {
  if (date === undefined) {
    throw Error
  }
  const today = new Date()
  return date.map(day => today.getDate() - today.getDay() + day)
}

export default null
