import { PrismaClient, User, Item } from '@prisma/client'
import express, { json } from 'express';
import cors from 'cors';
import { prisma } from './prismaConfig';
import jwt from 'jsonwebtoken';

require('dotenv').config()
const securityKey: string = process.env.ENCRYPTION_KEY || ''

const app = express();
app.use(cors())
app.use(json())


app.get('/', (req, res) => {
  res.send({ message: "SERVER'S UP YO!" })
})

app.get('/items', async (req, res) => {
  const items = await prisma.item.findMany({})
  res.send({ data: items })
})


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userWithCorrectDetails = await prisma.user.findFirst({
    where: {
      email, password
    }
  })
  if (!userWithCorrectDetails) return res.status(403).send({ error: "BEEP WRONG DETAILS" })

  const token = jwt.sign({ id: userWithCorrectDetails.id }, securityKey)

  //@ts-ignore
  delete userWithCorrectDetails.password

  res.send({ token, data: userWithCorrectDetails })
})

// TODO: login route, issues JWT for user

app.patch('/items/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name, imageUrl, price } = req.body;

  const userData: any = jwt.verify(req.headers.authorization || '', securityKey);

  if (!userData?.id) return res.status(403).send({ error: "Stop trying to break the token it didnt do nothing wrong. bruh" })

  const user = await prisma.user.findFirst({
    where: {
      id: userData.id
    }
  });
  if (!user) return res.status(403).send({ error: "Something wrong with user!" })
  if (user.privileges !== 'admin') return res.status(403).send({ error: "You're not allowed to be here boi" })

  const updatedItem = await prisma.item.update({
    where: { id },
    data: {
      name
    }
  })
  res.send({ data: updatedItem })
})


app.listen(4000, () => { console.log("Have a good one on port 4000") })