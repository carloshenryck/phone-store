export const isUserLogged = () => {
  const user = localStorage.getItem('user');
  return user !== null
}

export const getToken = () => {
  return localStorage.getItem('user');
}

export const addToken = (token: string) => {
  localStorage.setItem('user', token)
}

export const removeToken = () => {
  localStorage.removeItem('user')
}