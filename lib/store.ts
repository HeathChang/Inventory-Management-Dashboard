// 간단한 메모리 스토리지 구현
export interface Item {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

class Store {
  private items: Item[] = []

  constructor() {
    // 초기 데이터
    this.items = [
      {
        id: '1',
        title: '첫 번째 항목',
        description: '이것은 첫 번째 항목의 설명입니다.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: '두 번째 항목',
        description: '이것은 두 번째 항목의 설명입니다.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: '세 번째 항목',
        description: '이것은 세 번째 항목의 설명입니다.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  }

  getAllItems(): Item[] {
    return this.items
  }

  getItemById(id: string): Item | undefined {
    return this.items.find((item) => item.id === id)
  }

  createItem(item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Item {
    const newItem: Item = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.items.push(newItem)
    return newItem
  }

  updateItem(id: string, updates: Partial<Omit<Item, 'id' | 'createdAt'>>): Item | null {
    const index = this.items.findIndex((item) => item.id === id)
    if (index === -1) {
      return null
    }
    this.items[index] = {
      ...this.items[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return this.items[index]
  }

  deleteItem(id: string): boolean {
    const index = this.items.findIndex((item) => item.id === id)
    if (index === -1) {
      return false
    }
    this.items.splice(index, 1)
    return true
  }
}

// 싱글톤 인스턴스
export const store = new Store()

