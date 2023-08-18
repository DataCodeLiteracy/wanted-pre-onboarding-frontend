export const isValidEmail = (email) => {
  return email.includes('@')
}

export const isValidPassword = (password) => {
  return password.length >= 8
}
