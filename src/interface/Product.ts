export interface IProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
}
export type formType = Pick<IProduct, "title" | "price" | "image" | "category">;
