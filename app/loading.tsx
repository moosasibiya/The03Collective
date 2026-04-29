import styles from './state.module.css'

export default function Loading() {
  return (
    <div className={`${styles.wrap} ${styles.loadingFront}`}>
      <div className={styles.card}>
        <div className={styles.loader} />
        <span className={styles.label}>The 03 Collective</span>
        <h1 className={styles.title}>Loading</h1>
        <p className={styles.body}>Bringing the next screen into view.</p>
      </div>
    </div>
  )
}
