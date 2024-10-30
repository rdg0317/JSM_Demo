import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(timestamp: string): string {
  const now: Date = new Date()
  const date: Date = new Date(timestamp)
  const seconds: number = Math.floor((now.getTime() - date.getTime()) / 1000)
  const minutes: number = Math.floor(seconds / 60)
  const hours: number = Math.floor(minutes / 60)
  const days: number = Math.floor(hours / 24)
  const weeks: number = Math.floor(days / 7)
  const months: number = Math.floor(days / 30)
  const years: number = Math.floor(days / 365)
  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`
  if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return `${seconds} second${seconds > 1 ? 's' : ''} ago`
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId)
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file) 

//export const multiFormatDateString = (timestamp: string = ""): string => {
//}