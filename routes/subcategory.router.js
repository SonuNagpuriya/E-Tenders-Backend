import express from 'express';
const router = express.Router();

//to link controller
import * as SubCategoryController from '../controller/subcategory.controller.js'; 

router.post("/save",SubCategoryController.save);

router.get("/fetch",SubCategoryController.fetch);

//router.delete("/delete",CategoryController.deleteUser);

//router.patch("/update",CategoryController.update);

export default router;