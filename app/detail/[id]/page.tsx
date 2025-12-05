import { getItem } from '@/lib/api'
import { notFound } from 'next/navigation'
import styles from './page.module.css'

interface DetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params
  const item = await getItem(id)

  if (!item) {
    notFound()
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{item.title}</h1>
        </div>
        <div className={styles.content}>
          <p className={styles.description}>{item.description}</p>
          {/* 상세 페이지 내용은 여기에 추가하시면 됩니다 */}
        </div>
      </div>
    </main>
  )
}

