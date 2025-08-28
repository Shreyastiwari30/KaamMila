import express from "express";
import isAuthenticated from "../middlewares/authenticated.js";
import { getcompany, getcompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getcompany);
router.route("/update/:id").put(isAuthenticated, updateCompany);
router.route("/get/:id").get(isAuthenticated, getcompanyById);

export default router;
