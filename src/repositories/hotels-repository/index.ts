import { prisma } from "@/config";

async function findMany() {
  return prisma.hotel.findMany();
}

async function findManyRooms(hotelId: number) {
  return prisma.hotel.findMany({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    }
  });
}

const hotelsRepository = {
  findMany,
  findManyRooms
};

export default hotelsRepository;
