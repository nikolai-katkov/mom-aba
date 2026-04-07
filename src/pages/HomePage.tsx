import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Neuron</h1>
      <p className={styles.subtitle}>Helping parents support their autistic children.</p>
    </main>
  )
}
