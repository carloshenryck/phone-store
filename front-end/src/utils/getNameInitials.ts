export const getInitials = (name: string) => {
  const nameArray = name.split(" ")
  const firstName = nameArray[0].charAt(0).toUpperCase()
  const lastName = nameArray[nameArray.length - 1].charAt(0).toUpperCase()
  return firstName + lastName
}