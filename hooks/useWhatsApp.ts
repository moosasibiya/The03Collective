import { buildWhatsApp } from '@/utils/format'

export function useWhatsApp(phone: string, message: string) {
  return buildWhatsApp(phone, message)
}
