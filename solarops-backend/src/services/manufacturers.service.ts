import { prisma } from '../db/prisma.js'

export async function getManufacturersService() {
  return prisma.inverterManufacturer.findMany({
    orderBy: {
      name: 'asc'
    }
  })
}