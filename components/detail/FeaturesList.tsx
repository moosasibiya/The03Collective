import styles from './FeaturesList.module.css'

type FeaturesListProps = {
  features?: string[]
}

export default function FeaturesList({ features = [] }: FeaturesListProps) {
  return (
    <div className={styles.grid}>
      {features.map((feature) => (
        <div className={styles.item} key={feature}>
          {feature}
        </div>
      ))}
    </div>
  )
}
