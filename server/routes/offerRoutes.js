import { Router } from "express";
import { getAllOffers } from "../controllers/offerController.js";

const offerRouter = new Router();

offerRouter.get('/', getAllOffers);

export default offerRouter;