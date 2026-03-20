'use client'

import { useState } from 'react'
import type { Vehicle } from '@/types'
import InventoryGrid from './InventoryGrid'
import styles from './FilterBar.module.css'

type Filters = {
  make?: string
  status?: string
  price?: string
  trans?: string
}

type FilterBarProps = {
  initialFilters?: Filters
  vehicles: Vehicle[]
}

const priceRanges = [
  { value: '', label: 'Any Price' },
  { value: '0-500000', label: 'Under R 500k' },
  { value: '500000-1000000', label: 'R 500k - R 1M' },
  { value: '1000000-2000000', label: 'R 1M - R 2M' },
  { value: '2000000-99000000', label: 'Over R 2M' },
]

export default function FilterBar({ initialFilters, vehicles }: FilterBarProps) {
  const [filters, setFilters] = useState<Filters>({
    make: initialFilters?.make || '',
    status: initialFilters?.status || '',
    price: initialFilters?.price || '',
    trans: initialFilters?.trans || '',
  })

  const makes = [...new Set(vehicles.map((vehicle) => vehicle.make))].sort((a, b) => a.localeCompare(b))
  const transmissions = [...new Set(vehicles.map((vehicle) => vehicle.transmission).filter(Boolean))] as string[]

  const filtered = vehicles.filter((vehicle) => {
    if (filters.make && vehicle.make !== filters.make) return false
    if (filters.status && vehicle.status !== filters.status) return false
    if (filters.trans && vehicle.transmission !== filters.trans) return false

    if (filters.price) {
      const [min, max] = filters.price.split('-').map(Number)
      if (vehicle.price < min || vehicle.price > max) return false
    }

    return true
  })

  return (
    <>
      <div className={styles.bar}>
        <div className="container">
          <div className={styles.inner}>
            <select
              className={styles.select}
              onChange={(event) => setFilters((current) => ({ ...current, make: event.target.value }))}
              value={filters.make}
            >
              <option value="">All Makes</option>
              {makes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>

            <select
              className={styles.select}
              onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}
              value={filters.status}
            >
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>

            <select
              className={styles.select}
              onChange={(event) => setFilters((current) => ({ ...current, price: event.target.value }))}
              value={filters.price}
            >
              {priceRanges.map((range) => (
                <option key={range.label} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            <select
              className={styles.select}
              onChange={(event) => setFilters((current) => ({ ...current, trans: event.target.value }))}
              value={filters.trans}
            >
              <option value="">Transmission</option>
              {transmissions.map((transmission) => (
                <option key={transmission} value={transmission}>
                  {transmission}
                </option>
              ))}
            </select>

            <button
              className={styles.reset}
              onClick={() => setFilters({ make: '', status: '', price: '', trans: '' })}
              type="button"
            >
              Reset
            </button>

            <span className={styles.count}>
              <strong>{filtered.length}</strong> vehicle{filtered.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>
      </div>

      <section className={styles.page}>
        <div className="container">
          <InventoryGrid vehicles={filtered} />
        </div>
      </section>
    </>
  )
}
