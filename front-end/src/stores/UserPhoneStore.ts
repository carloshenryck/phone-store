import { Phone } from '@/@types/Phone'
import { create } from 'zustand'

type PhoneStore = {
  userPhones: Phone[]
  setUserPhones: (phones: Phone[]) => void
}

export const useUserPhoneStore = create<PhoneStore>()((set) => ({
  userPhones: [],
  setUserPhones: (phones) => set({ userPhones: phones }),
}))