import { prisma } from "./prismaConfig";

export const ADMIN = 'admin';
export const USER = 'user';


async function seedMyStuff() {
  const item1 = await prisma.item.create({
    data: {
      imageUrl: 'https://timeandtidewatches.com/wp-content/uploads/2022/01/Photo-Jan-18-1-35-11-PM-scaled-e1643160889265.jpg',
      name: 'Some weird watch i would wear only occasionally',
      price: 69
    }
  })
  const item2 = await prisma.item.create({
    data: {
      imageUrl: 'https://www.ikea.com/ph/en/images/products/vretstorp-sleeper-sofa-hallarp-beige__0818764_pe774597_s5.jpg?f=s',
      name: 'Sofa le sit',
      price: 690
    }
  })
  const item3 = await prisma.item.create({
    data: {
      imageUrl: 'https://m.media-amazon.com/images/I/6196LprJhaL._SX522_.jpg',
      name: 'Cat food feed me that ',
      price: 1900
    }
  })

  const user1 = await prisma.user.create({
    data: {
      email: 'ed@email.com',
      name: "Ed lord of the cat food",
      password: "bla",
      privileges: ADMIN,
    }
  })
  const user2 = await prisma.user.create({
    data: {
      email: 'jurgen@email.com',
      name: "Jurgenski",
      password: "CAN YOU HEAR ME",
      privileges: USER,
    }
  })
  const user3 = await prisma.user.create({
    data: {
      email: 'marsel@email.com',
      name: "Marsel",
      password: "DO YOU KNOW THE MUFFIN MAN",
      privileges: USER,
    }
  })
}

seedMyStuff()