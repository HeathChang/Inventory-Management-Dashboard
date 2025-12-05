import { store, type Item } from './store'

// 서버 사이드에서 사용할 API 함수들
export async function getItems(): Promise<Item[]> {
  // 실제로는 비동기 작업이 있을 수 있으므로 Promise로 반환
  return Promise.resolve(store.getAllItems())
}

export async function getItem(id: string): Promise<Item | null> {
  const item = store.getItemById(id)
  return Promise.resolve(item || null)
}

