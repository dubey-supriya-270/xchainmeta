import { Types } from "mongoose";

export interface IProduct {
  productName: string;
  productPrice: number;
  productDescription: string;
  productColor: string;
  productCount: number;
}
