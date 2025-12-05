import { formatPhoneNumber, filterKoreanOnly } from '../formatting'

describe('formatPhoneNumber', () => {
  it('숫자만 포함된 문자열을 전화번호 형식으로 변환해야 한다', () => {
    expect(formatPhoneNumber('01012345678')).toBe('010-1234-5678')
  })

  it('3자리 이하는 하이픈 없이 반환해야 한다', () => {
    expect(formatPhoneNumber('010')).toBe('010')
    expect(formatPhoneNumber('01')).toBe('01')
    expect(formatPhoneNumber('0')).toBe('0')
  })

  it('4-7자리는 첫 번째 하이픈만 추가해야 한다', () => {
    expect(formatPhoneNumber('0101234')).toBe('010-1234')
    expect(formatPhoneNumber('010123')).toBe('010-123')
  })

  it('8자리 이상은 두 개의 하이픈을 추가해야 한다', () => {
    expect(formatPhoneNumber('01012345678')).toBe('010-1234-5678')
    expect(formatPhoneNumber('010123456789')).toBe('010-1234-5678')
  })

  it('하이픈이 포함된 문자열도 올바르게 포맷해야 한다', () => {
    expect(formatPhoneNumber('010-1234-5678')).toBe('010-1234-5678')
    expect(formatPhoneNumber('010--1234--5678')).toBe('010-1234-5678')
  })

  it('공백이나 특수문자가 포함된 문자열도 처리해야 한다', () => {
    expect(formatPhoneNumber('010 1234 5678')).toBe('010-1234-5678')
    expect(formatPhoneNumber('010.1234.5678')).toBe('010-1234-5678')
  })

  it('빈 문자열을 처리해야 한다', () => {
    expect(formatPhoneNumber('')).toBe('')
  })

  it('숫자가 아닌 문자만 포함된 문자열은 빈 문자열을 반환해야 한다', () => {
    expect(formatPhoneNumber('abc')).toBe('')
    expect(formatPhoneNumber('---')).toBe('')
  })
})

describe('filterKoreanOnly', () => {
  it('한글만 남기고 나머지 문자를 제거해야 한다', () => {
    expect(filterKoreanOnly('안녕하세요123')).toBe('안녕하세요')
    expect(filterKoreanOnly('Hello안녕')).toBe('안녕')
  })

  it('한글 자음과 모음을 포함해야 한다', () => {
    expect(filterKoreanOnly('ㄱㄴㄷㅏㅑㅓ')).toBe('ㄱㄴㄷㅏㅑㅓ')
  })

  it('영어, 숫자, 특수문자를 제거해야 한다', () => {
    expect(filterKoreanOnly('안녕123!@#')).toBe('안녕')
    expect(filterKoreanOnly('Hello World')).toBe('')
  })

  it('빈 문자열을 처리해야 한다', () => {
    expect(filterKoreanOnly('')).toBe('')
  })

  it('한글이 없는 문자열은 빈 문자열을 반환해야 한다', () => {
    expect(filterKoreanOnly('123')).toBe('')
    expect(filterKoreanOnly('abc')).toBe('')
    expect(filterKoreanOnly('!@#')).toBe('')
  })

  it('한글과 다른 문자가 섞인 경우 한글만 반환해야 한다', () => {
    expect(filterKoreanOnly('안녕하세요Hello123')).toBe('안녕하세요')
    expect(filterKoreanOnly('Test테스트123!')).toBe('테스트')
  })
})

