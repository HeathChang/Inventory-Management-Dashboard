import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.description}>페이지를 찾을 수 없습니다.</p>
        <Link href="/" className={styles.link}>
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  )
}

