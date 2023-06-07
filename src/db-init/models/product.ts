import mongoose from "mongoose";
import { IUser } from "../../interfaces/user";
import { IProduct } from "../../interfaces/product";

//Defining user model
let product = new mongoose.Schema<IProduct>(
  {
  
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productDescription: { type: String, required: true },
    productColor: { type: String, required: true },
    productCount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

//exporting User schema
export const Products = mongoose.model("products", product);
