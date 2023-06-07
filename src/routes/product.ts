import express, { NextFunction, Request, Response } from "express";
import STATUS from "../constants/statusCode";
import controller from "../controllers/product";
import { Result } from "../interfaces/result";
import { CustomError } from "../middlewares/error";

const router = express.Router();


router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Passing project id as params
    const {
    
      productName,
      productPrice,
      productDescription,
      productColor,
      productCount,
    } = req.body;

    // Verify product
    if (
      !productName ||
      !productPrice ||
      !productDescription ||
      !productColor ||
      !productCount
    ) {
      // Throw an error if any parameter is not provided
      const err: CustomError = {
        statusCode: STATUS.BAD_REQUEST,
        customMessage: `All parameters for product are required`,
      };

      throw err;
    }

    // If request body verified then add configuration
    const createProductResult: Result = await controller.createProduct({
    
      productName,
      productPrice,
      productDescription,
      productColor,
      productCount,
    });

    // If there is any error throw the error
    if (createProductResult.isError()) {
      throw createProductResult.error;
    }

    res.status(200).json({
      status: STATUS.OK,
      message: `Saved product successfully`,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route to get product for a id
 * @description
 * - @accept id
 * - @returns product details
 * @params
 * - @requires Id: Id of the product
 */
router.get(
  "/view-product/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Passing project id as params
      const { id } = req.params;

      const retrieveByIdResult: Result =
        await controller.retrieveById(id);

      if (retrieveByIdResult.isError()) {
        throw retrieveByIdResult.error;
      }

      res.status(200).json({
        status: 200,
        data: retrieveByIdResult.data,
        message: `Retrieved product by id successfully`,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route to get code block for a projectId
 * @description
 * - @accept package Name
 * - @returns List of code block files
 * @params
 * - @requires : Id of the project
 */
router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        const retrieveResult: Result =
          await controller.retrieveProduct();
  
        if (retrieveResult.isError()) {
          throw retrieveResult.error;
        }
  
        res.status(200).json({
          status: 200,
          data: retrieveResult.data,
          message: `Retrieved product details successfully`,
        });
      } catch (error) {
        next(error);
      }
    }   
);



export default router;
