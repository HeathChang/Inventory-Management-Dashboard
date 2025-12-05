import fs from 'fs'
import path from 'path'
import { InventoryItem, RecipientInfo } from '@/type/Inventory.type'

const DATA_DIR = path.join(process.cwd(), 'data')

const INVENTORY_FILE = path.join(DATA_DIR, 'inventory.json')
const INVENTORY_BACKUP_FILE = path.join(DATA_DIR, 'inventory.backup.json')

const RECIPIENT_INFO_FILE = path.join(DATA_DIR, 'recipient-info.json')
const RECIPIENT_INFO_BACKUP_FILE = path.join(DATA_DIR, 'recipient-info.backup.json')

export function getInventoryItems(): InventoryItem[] {
    try {
        const fileContent = fs.readFileSync(INVENTORY_FILE, 'utf-8')
        return JSON.parse(fileContent)
    } catch {
        return []
    }
}

export function saveInventoryItems(items: InventoryItem[]): boolean {
    try {
        fs.writeFileSync(INVENTORY_FILE, JSON.stringify(items, null, 2), 'utf-8')
        return true
    } catch {
        return false
    }
}

export function deleteInventoryItem(id: number): boolean {
    const items = getInventoryItems()
    const filteredItems = items.filter((item: InventoryItem) => item.id !== id)
    return saveInventoryItems(filteredItems)
}

export function getRecipientInfo(): RecipientInfo | null {
    try {
        const fileContent = fs.readFileSync(RECIPIENT_INFO_FILE, 'utf-8')
        return JSON.parse(fileContent)
    } catch {
        return null
    }
}

export function saveRecipientInfo(info: RecipientInfo): boolean {
    try {
        fs.writeFileSync(RECIPIENT_INFO_FILE, JSON.stringify(info, null, 2), 'utf-8')
        return true
    } catch {
        return false
    }
}

export function resetData(): boolean {
    try {
        if (fs.existsSync(INVENTORY_BACKUP_FILE)) {
            const backupContent = fs.readFileSync(INVENTORY_BACKUP_FILE, 'utf-8')
            fs.writeFileSync(INVENTORY_FILE, backupContent, 'utf-8')
        }

        if (fs.existsSync(RECIPIENT_INFO_BACKUP_FILE)) {
            const backupContent = fs.readFileSync(RECIPIENT_INFO_BACKUP_FILE, 'utf-8')
            fs.writeFileSync(RECIPIENT_INFO_FILE, backupContent, 'utf-8')
        }

        return true
    } catch {
        return false
    }
}

