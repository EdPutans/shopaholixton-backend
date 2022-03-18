import { PrismaClient, User, Item } from '@prisma/client'
import express, { json } from 'express';
import cors from 'cors';
import { prisma } from './prismaConfig';

require('dotenv').config()
const securityKey = process.env.ENCRYPTION_KEY;

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

app.patch('/items/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name, imageUrl, price } = req.body;

  const updatedItem = await prisma.item.update({
    where: { id },
    data: {
      name
    }
  })
  res.send({ data: updatedItem })
})


app.listen(4000, () => { console.log("Have a good one on port 4000") })