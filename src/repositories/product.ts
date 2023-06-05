
import STATUS from "../constants/statusCode";
import { Products } from "../db-init/models/product";
import { IProduct } from "../interfaces/product";
import { Result } from "../interfaces/result";
import { CustomError } from "../middlewares/error";

export const addProduct = async (data: IProduct): Promise<Result> => {
  try {
    // creating new user details data in database.
    const result = await Products.create({
      userId: data.userId,
      productName: data.productName,
      productPrice: data.productPrice,
      productDescription: data.productDescription,
      productColor: data.productColor,
      productCount: data.productCount,
    });

    // if user details stored than return success as true
    return Result.ok(result);
  } catch (error) {
    return Result.error({
      statusCode: STATUS.BAD_REQUEST,
      customMessage: `Unable to add product details`,
    });
  }
};

export const retrieveProducts = async (): Promise<Result<IProduct[]>> => {
  try {
    const result = await Products.find().exec();
    if (!result.length) {
      const err: CustomError = {
        statusCode: STATUS.NOT_FOUND,
        customMessage: `No product available`,
      };
      throw err;
    }
    return Result.ok(result);
  } catch (error) {
    return Result.error(error);
  }
};

export const retrieveProductById = async (
  id: string
): Promise<Result<IProduct>> => {
  try {
    const result = await Products.findOne({ id: id }).exec();
    if (!result) {
      const err: CustomError = {
        statusCode: STATUS.NOT_FOUND,
        customMessage: `No product available with the specified id`,
      };
      throw err;
    }
    return Result.ok(result);
  } catch (error) {
    return Result.error(error);
  }
};
