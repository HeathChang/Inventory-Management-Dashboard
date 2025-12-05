export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhoneFormat = (phone: string): boolean => {
  const phoneRegex = /^\d{3}-\d{4}-\d{4}$/
  return phoneRegex.test(phone)
}

