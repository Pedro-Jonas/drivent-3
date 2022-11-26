import { prisma } from "@/config";

async function findMany() {
  return prisma.hotel.findMany();
}

const hotelsRepository = {
  findMany,
};

export default hotelsRepository;
