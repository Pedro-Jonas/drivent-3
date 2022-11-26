import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotel } from "@/controllers/hotels-controller";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotel);
  
export { hotelsRouter };
