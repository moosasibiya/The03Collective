export const formatPrice = (n: number): string =>
  n.toLocaleString('en-ZA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

export const formatMileage = (n: number): string => `${n.toLocaleString('en-ZA')} km`

export const buildWhatsApp = (phone: string, msg: string): string =>
  `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`

export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
