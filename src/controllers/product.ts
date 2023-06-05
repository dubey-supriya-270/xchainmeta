import * as repository from "../repositories/product";
import { Result } from "../interfaces/result";
import { IProduct } from "../interfaces/product";

// add module codeBlock controller
const createProduct = async (product: IProduct): Promise<Result> => {
  try {
    //add codeBlock to db
    const result = await repository.addProduct(product);

    //If there is any error throw error
    if (result.isError()) {
      throw result.error;
    }

    return Result.ok();
  } catch (error) {
    return Result.error(error);
  }
};

const retrieveById = async (projectId: string): Promise<Result<IProduct>> => {
  try {
    const result = await repository.retrieveProductById(projectId);

    if (result.isError()) {
      throw result.error;
    }

    return Result.ok(result.data);
  } catch (error) {
    return Result.error(error);
  }
};

const retrieveProduct = async (): Promise<Result<IProduct[]>> => {
  try {
    const result = await repository.retrieveProducts();

    if (result.isError()) {
      throw result.error;
    }

    return Result.ok(result.data);
  } catch (error) {
    return Result.error(error);
  }
};

//exporting defined configurations controller
export default {
  createProduct,
  retrieveById,
  retrieveProduct,
};
