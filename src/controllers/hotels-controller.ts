import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
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

export async function getRooms(_req: AuthenticatedRequest, res: Response) {
  const userId = _req.userId;
  const hotel = _req.params.hotelId;
  const hotelId = Number(hotel);

  if (isNaN(hotelId)) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const rooms = await hotelsService.getManyRooms(userId, hotelId);
    if (rooms.length === 0) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    return res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
