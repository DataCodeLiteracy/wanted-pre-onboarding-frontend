export const isValidEmail = (email: string) => {
  return email.includes('@')
}

export const isValidPassword = (password: string) => {
  return password.length >= 8
}
