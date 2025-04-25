'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type DateContextType = {
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
}

export const DateContext = createContext<DateContextType | null>(null)

type Props = { children: ReactNode }

const STORAGE_KEY_DATE = 'selectedDate'
const STORAGE_KEY_TIMESTAMP = 'selectedDateTimestamp'

export const DateProvider = ({ children }: Props) => {
  const [selectedDate, setSelectedDateState] = useState<Date | undefined>(
    new Date(),
  )

  // リセットチェック（時間ベース）
  const checkAndRestoreDate = () => {
    const savedDateStr = localStorage.getItem(STORAGE_KEY_DATE)
    const savedTimestampStr = localStorage.getItem(STORAGE_KEY_TIMESTAMP)

    if (savedDateStr && savedTimestampStr) {
      const savedTimestamp = new Date(savedTimestampStr)
      const now = new Date()

      const isSameDay =
        savedTimestamp.getFullYear() === now.getFullYear() &&
        savedTimestamp.getMonth() === now.getMonth() &&
        savedTimestamp.getDate() === now.getDate()

      if (isSameDay) {
        setSelectedDateState(new Date(savedDateStr))
      } else {
        // 時刻ベースで日付を跨いだ → リセット
        setSelectedDateState(new Date())
        localStorage.removeItem(STORAGE_KEY_DATE)
        localStorage.removeItem(STORAGE_KEY_TIMESTAMP)
      }
    }
  }

  // 初期化
  useEffect(() => {
    checkAndRestoreDate()
  }, [])

  // 日付を選んだら保存
  const setSelectedDate = (date: Date | undefined) => {
    setSelectedDateState(date)
    if (date) {
      localStorage.setItem(STORAGE_KEY_DATE, date.toISOString())
      localStorage.setItem(STORAGE_KEY_TIMESTAMP, new Date().toISOString())
    } else {
      localStorage.removeItem(STORAGE_KEY_DATE)
      localStorage.removeItem(STORAGE_KEY_TIMESTAMP)
    }
  }

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  )
}

export const useDate = () => useContext(DateContext)
