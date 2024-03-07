export interface phoneVariations {
  color: string;
  price: number;
  img: string;
}

export interface Phone {
  id: number;
  brand: string;
  model: string;
  name: string;
  data: phoneVariations[];
}