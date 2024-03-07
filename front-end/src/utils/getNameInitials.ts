export const getNameInitials = (name: string) => {
  const nameArray = name.split(" ")
  const firstName = nameArray[0].charAt(0).toUpperCase()
  if (nameArray.length > 1) {
    const lastName = nameArray[nameArray.length - 1].charAt(0).toUpperCase()
    return firstName + lastName
  }
  return firstName
}