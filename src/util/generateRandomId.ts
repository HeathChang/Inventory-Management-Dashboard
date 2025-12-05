export function generateRandomId(): string {
    const chars = '0123456789ABCDEF'
    let result = ''
    for (let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}