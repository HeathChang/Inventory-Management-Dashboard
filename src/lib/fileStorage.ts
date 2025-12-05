import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

// 인벤토리 아이템 파일 경로
const INVENTORY_FILE = path.join(DATA_DIR, 'inventory.json')
const INVENTORY_BACKUP_FILE = path.join(DATA_DIR, 'inventory.backup.json')

// 수령정보 파일 경로
const RECIPIENT_INFO_FILE = path.join(DATA_DIR, 'recipient-info.json')
const RECIPIENT_INFO_BACKUP_FILE = path.join(DATA_DIR, 'recipient-info.backup.json')

// 인벤토리 아이템 읽기
export function getInventoryItems() {
    try {
        const fileContent = fs.readFileSync(INVENTORY_FILE, 'utf-8')
        return JSON.parse(fileContent)
    } catch (error) {
        console.error('Error reading inventory file:', error)
        return []
    }
}

// 인벤토리 아이템 저장
export function saveInventoryItems(items: any[]) {
    try {
        fs.writeFileSync(INVENTORY_FILE, JSON.stringify(items, null, 2), 'utf-8')
        return true
    } catch (error) {
        console.error('Error saving inventory file:', error)
        return false
    }
}

// 인벤토리 아이템 삭제
export function deleteInventoryItem(id: number) {
    const items = getInventoryItems()
    const filteredItems = items.filter((item: any) => item.id !== id)
    return saveInventoryItems(filteredItems)
}

// 수령정보 읽기
export function getRecipientInfo() {
    try {
        const fileContent = fs.readFileSync(RECIPIENT_INFO_FILE, 'utf-8')
        return JSON.parse(fileContent)
    } catch (error) {
        console.error('Error reading recipient info file:', error)
        return null
    }
}

// 수령정보 저장
export function saveRecipientInfo(info: any) {
    try {
        fs.writeFileSync(RECIPIENT_INFO_FILE, JSON.stringify(info, null, 2), 'utf-8')
        return true
    } catch (error) {
        console.error('Error saving recipient info file:', error)
        return false
    }
}

// 초기화: 백업 파일에서 복원
export function resetData() {
    try {
        // 인벤토리 복원
        if (fs.existsSync(INVENTORY_BACKUP_FILE)) {
            const backupContent = fs.readFileSync(INVENTORY_BACKUP_FILE, 'utf-8')
            fs.writeFileSync(INVENTORY_FILE, backupContent, 'utf-8')
        }

        // 수령정보 복원
        if (fs.existsSync(RECIPIENT_INFO_BACKUP_FILE)) {
            const backupContent = fs.readFileSync(RECIPIENT_INFO_BACKUP_FILE, 'utf-8')
            fs.writeFileSync(RECIPIENT_INFO_FILE, backupContent, 'utf-8')
        }

        return true
    } catch (error) {
        console.error('Error resetting data:', error)
        return false
    }
}

