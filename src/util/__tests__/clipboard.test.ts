import { copyToClipboard } from '../clipboard'

describe('copyToClipboard', () => {
  const originalClipboard = navigator.clipboard

  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn(),
      },
      writable: true,
      configurable: true,
    })
  })

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
      configurable: true,
    })
    jest.clearAllMocks()
  })

  it('클립보드에 텍스트를 복사하고 true를 반환해야 한다', async () => {
    const mockWriteText = navigator.clipboard.writeText as jest.Mock
    mockWriteText.mockResolvedValue(undefined)

    const result = await copyToClipboard('test text')

    expect(mockWriteText).toHaveBeenCalledWith('test text')
    expect(result).toBe(true)
  })

  it('복사 성공 시 true를 반환해야 한다', async () => {
    const mockWriteText = navigator.clipboard.writeText as jest.Mock
    mockWriteText.mockResolvedValue(undefined)

    const result = await copyToClipboard('hello world')

    expect(result).toBe(true)
  })

  it('복사 실패 시 false를 반환해야 한다', async () => {
    const mockWriteText = navigator.clipboard.writeText as jest.Mock
    mockWriteText.mockRejectedValue(new Error('Clipboard error'))

    const result = await copyToClipboard('test')

    expect(result).toBe(false)
  })

  it('빈 문자열도 복사할 수 있어야 한다', async () => {
    const mockWriteText = navigator.clipboard.writeText as jest.Mock
    mockWriteText.mockResolvedValue(undefined)

    const result = await copyToClipboard('')

    expect(mockWriteText).toHaveBeenCalledWith('')
    expect(result).toBe(true)
  })

  it('긴 문자열도 복사할 수 있어야 한다', async () => {
    const mockWriteText = navigator.clipboard.writeText as jest.Mock
    mockWriteText.mockResolvedValue(undefined)
    const longText = 'a'.repeat(1000)

    const result = await copyToClipboard(longText)

    expect(mockWriteText).toHaveBeenCalledWith(longText)
    expect(result).toBe(true)
  })
})

