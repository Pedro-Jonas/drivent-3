import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotel, getRooms } from "@/controllers/hotels-controller";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotel)
  .get("/:hotelId", getRooms);
  
export { hotelsRouter };
