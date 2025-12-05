import { isValidEmail, isValidPhoneFormat } from '../validation'

describe('isValidEmail', () => {
  it('유효한 이메일 형식을 확인해야 한다', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('user.name@domain.co.kr')).toBe(true)
    expect(isValidEmail('user+tag@example.com')).toBe(true)
  })

  it('@ 기호가 없는 이메일은 유효하지 않아야 한다', () => {
    expect(isValidEmail('testexample.com')).toBe(false)
    expect(isValidEmail('test@')).toBe(false)
  })

  it('도메인이 없는 이메일은 유효하지 않아야 한다', () => {
    expect(isValidEmail('test@')).toBe(false)
    expect(isValidEmail('test@.com')).toBe(false)
  })

  it('로컬 파트가 없는 이메일은 유효하지 않아야 한다', () => {
    expect(isValidEmail('@example.com')).toBe(false)
  })

  it('공백이 포함된 이메일은 유효하지 않아야 한다', () => {
    expect(isValidEmail('test @example.com')).toBe(false)
    expect(isValidEmail('test@ example.com')).toBe(false)
  })

  it('빈 문자열은 유효하지 않아야 한다', () => {
    expect(isValidEmail('')).toBe(false)
  })

  it('점이 없는 도메인은 유효하지 않아야 한다', () => {
    expect(isValidEmail('test@example')).toBe(false)
  })
})

describe('isValidPhoneFormat', () => {
  it('올바른 전화번호 형식을 확인해야 한다', () => {
    expect(isValidPhoneFormat('010-1234-5678')).toBe(true)
    expect(isValidPhoneFormat('011-1234-5678')).toBe(true)
    expect(isValidPhoneFormat('016-1234-5678')).toBe(true)
  })

  it('하이픈이 없는 전화번호는 유효하지 않아야 한다', () => {
    expect(isValidPhoneFormat('01012345678')).toBe(false)
    expect(isValidPhoneFormat('010 1234 5678')).toBe(false)
  })

  it('하이픈 위치가 잘못된 전화번호는 유효하지 않아야 한다', () => {
    expect(isValidPhoneFormat('0101-234-5678')).toBe(false)
    expect(isValidPhoneFormat('010-12345-678')).toBe(false)
  })

  it('자릿수가 부족한 전화번호는 유효하지 않아야 한다', () => {
    expect(isValidPhoneFormat('010-123-5678')).toBe(false)
    expect(isValidPhoneFormat('01-1234-5678')).toBe(false)
  })

  it('자릿수가 초과한 전화번호는 유효하지 않아야 한다', () => {
    expect(isValidPhoneFormat('010-12345-5678')).toBe(false)
    expect(isValidPhoneFormat('0101-1234-5678')).toBe(false)
  })

  it('문자가 포함된 전화번호는 유효하지 않아야 한다', () => {
    expect(isValidPhoneFormat('010-1234-abcd')).toBe(false)
    expect(isValidPhoneFormat('abc-1234-5678')).toBe(false)
  })

  it('빈 문자열은 유효하지 않아야 한다', () => {
    expect(isValidPhoneFormat('')).toBe(false)
  })

  it('하이픈만 있는 문자열은 유효하지 않아야 한다', () => {
    expect(isValidPhoneFormat('---')).toBe(false)
  })
})

