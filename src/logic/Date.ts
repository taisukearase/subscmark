import { setDate, subMonths, isAfter, startOfDay, subWeeks } from 'date-fns'

export const isRead = (lastReadDay?: string, type?: string, date?: number[]): boolean => {
  if (lastReadDay === undefined) return false
  const lastReadDateTime = new Date(lastReadDay)
  return isAfter(lastReadDateTime, startOfDay(getLatestSubscDate(type, date)))
}

const getLatestSubscDate = (type?: string, date?: number[]): Date => {
  if (type === undefined || date === undefined) {
    return new Date()
  }

  switch (type) {
    case 'week':
      return getWeekDate(date)
    case 'month':
      return getMonthDate(date)
    default:
      return new Date()
  }
}

const getMonthDate = (date: number[]): Date => {
  const today = new Date()
  if (today.getDate() < Math.min(...date)) {
    return subMonths(setDate(today, Math.max(...date)), 1)
  }
  const prevDate = date.reduce((acc, crr) => (acc < crr && crr <= today.getDate() ? crr : acc))
  return setDate(today, prevDate)
}

const getWeekDate = (date: number[]): Date => {
  const today = new Date()
  const thisWeekDates = date.map(day => today.getDate() - today.getDay() + day)
  if (today.getDate() < Math.min(...thisWeekDates)) {
    return subWeeks(setDate(today, Math.max(...thisWeekDates)), 1)
  }
  const prevDate = date.reduce((acc, crr) => (acc < crr && crr <= today.getDate() ? crr : acc))
  return setDate(today, prevDate)
}

export default null
