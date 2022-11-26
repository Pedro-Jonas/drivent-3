import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getHotel(_req: AuthenticatedRequest, res: Response) {
  const userId = _req.userId;
  try {
    const hotel = await hotelsService.getManyHotels(userId);
    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    if (error.name === "Payment Required") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
