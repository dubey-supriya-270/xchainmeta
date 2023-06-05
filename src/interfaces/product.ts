import { Types } from "mongoose";

export interface IProduct {
  userId: Types.ObjectId;
  productName: string;
  productPrice: number;
  productDescription: string;
  productColor: string;
  productCount: number;
}
