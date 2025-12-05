import Link from 'next/link'
import { getItems } from '@/lib/api'
import styles from './page.module.css'

export default async function Home() {
  const items = await getItems()

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Toonation 2025</h1>
        <div className={styles.grid}>
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/detail/${item.id}`}
              className={styles.card}
            >
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

