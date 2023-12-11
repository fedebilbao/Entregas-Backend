import {Router} from "express"
import { findProduct, findById, createProduct, deleteProduct, updateProduct } from "../controllers/Products.controller.js";


const router = Router();

router.get("/", findProduct);

router.get("/:id", findById);

router.post("/", createProduct);

router.delete ("/:id", deleteProduct);

router.put("/:id", updateProduct);


export default router