import { store } from '@/lib/store'

describe('Store', () => {
  beforeEach(() => {
    // 각 테스트 전에 스토어 초기화
    const items = store.getAllItems()
    items.forEach((item) => {
      store.deleteItem(item.id)
    })
    
    // 초기 데이터 추가
    store.createItem({
      title: 'Test Item 1',
      description: 'Test Description 1',
    })
    store.createItem({
      title: 'Test Item 2',
      description: 'Test Description 2',
    })
  })

  test('should get all items', () => {
    const items = store.getAllItems()
    expect(items.length).toBeGreaterThan(0)
  })

  test('should get item by id', () => {
    const items = store.getAllItems()
    const firstItem = items[0]
    const foundItem = store.getItemById(firstItem.id)
    expect(foundItem).toEqual(firstItem)
  })

  test('should create new item', () => {
    const newItem = store.createItem({
      title: 'New Item',
      description: 'New Description',
    })
    expect(newItem.id).toBeDefined()
    expect(newItem.title).toBe('New Item')
    expect(newItem.description).toBe('New Description')
  })

  test('should update item', () => {
    const items = store.getAllItems()
    const firstItem = items[0]
    const updatedItem = store.updateItem(firstItem.id, {
      title: 'Updated Title',
    })
    expect(updatedItem?.title).toBe('Updated Title')
    expect(updatedItem?.description).toBe(firstItem.description)
  })

  test('should delete item', () => {
    const items = store.getAllItems()
    const initialCount = items.length
    const firstItem = items[0]
    const deleted = store.deleteItem(firstItem.id)
    expect(deleted).toBe(true)
    expect(store.getAllItems().length).toBe(initialCount - 1)
  })
})

