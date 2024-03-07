import { Phone } from '@/@types/Phone'
import { create } from 'zustand'

type PhoneStore = {
  phones: Phone[]
  setPhones: (phones: Phone[]) => void
}

export const usePhoneStore = create<PhoneStore>()((set) => ({
  phones: [],
  setPhones: (phones) => set({ phones }),
}))