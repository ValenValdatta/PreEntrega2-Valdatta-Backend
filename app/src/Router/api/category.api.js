import { Router } from "express";
import categoryManager from "../../data/mongo/CategoriesManager.mongo.js";

const categoryRouter = Router();

categoryRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const one = await categoryManager.create(data);
    return res.json({
      statusCode: 201,
      message: "Category created",
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});
categoryRouter.get("/", async (req, res, next) => {
  try {
    const all = await categoryManager.read();
    return res.json({
      statusCode: 200,
      message: "READ",
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});
export default categoryRouter;