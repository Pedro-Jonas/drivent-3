import { notFoundError, unauthorizedError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { } from "@prisma/client";
import { paymentRequiredError } from "@/errors/payment-error";

async function getManyHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.TicketType.includesHotel !== true  || ticket.TicketType.isRemote !== false) {
    throw notFoundError();
  }
  if (ticket.status !== "PAID" ) {
    throw paymentRequiredError();
  }
  const hotels = await hotelsRepository.findMany();
  if ( hotels.length === 0) {
    return [];
  }
  if (!hotels) {
    throw notFoundError();
  }
  return hotels;
}

const hotelsService = {
  getManyHotels,
};

export default hotelsService;
