export const isUserLogged = () => {
  const user = localStorage.getItem('user');
  return user !== null
}

export const addToken = (token: string) => {
  localStorage.setItem('user', token)
}