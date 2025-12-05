import { generateRandomId } from '../generateRandomId'

describe('generateRandomId', () => {
    describe('기본 동작', () => {
        it('문자열을 반환해야 한다', () => {
            const id = generateRandomId()
            expect(typeof id).toBe('string')
        })

        it('16자리 문자열을 반환해야 한다', () => {
            const id = generateRandomId()
            expect(id.length).toBe(16)
        })

        it('16진수 문자(0-9, A-F)만 포함해야 한다', () => {
            const id = generateRandomId()
            const hexPattern = /^[0-9A-F]{16}$/
            expect(hexPattern.test(id)).toBe(true)
        })
    })

    describe('랜덤성', () => {
        it('매번 다른 값을 생성해야 한다', () => {
            const ids = new Set<string>()
            const iterations = 100

            for (let i = 0; i < iterations; i++) {
                ids.add(generateRandomId())
            }

            expect(ids.size).toBeGreaterThan(iterations * 0.9)
        })

        it('연속 호출 시 다른 값을 생성해야 한다', () => {
            const id1 = generateRandomId()
            const id2 = generateRandomId()
            const id3 = generateRandomId()

            expect(id1).not.toBe(id2)
            expect(id2).not.toBe(id3)
            expect(id1).not.toBe(id3)
        })
    })

    describe('형식 검증', () => {
        it('모든 문자가 대문자 16진수여야 한다', () => {
            const id = generateRandomId()
            const validChars = '0123456789ABCDEF'

            for (const char of id) {
                expect(validChars.includes(char)).toBe(true)
            }
        })

        it('소문자가 포함되지 않아야 한다', () => {
            const id = generateRandomId()
            const hasLowerCase = /[a-f]/.test(id)
            expect(hasLowerCase).toBe(false)
        })

        it('특수문자가 포함되지 않아야 한다', () => {
            const id = generateRandomId()
            const hasSpecialChar = /[^0-9A-F]/.test(id)
            expect(hasSpecialChar).toBe(false)
        })
    })

    describe('다중 호출', () => {
        it('여러 번 호출해도 항상 16자리를 반환해야 한다', () => {
            for (let i = 0; i < 50; i++) {
                const id = generateRandomId()
                expect(id.length).toBe(16)
            }
        })

        it('여러 번 호출해도 항상 유효한 형식을 반환해야 한다', () => {
            const hexPattern = /^[0-9A-F]{16}$/

            for (let i = 0; i < 50; i++) {
                const id = generateRandomId()
                expect(hexPattern.test(id)).toBe(true)
            }
        })
    })
})

