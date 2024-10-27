import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nombre, descripcion, precio, stock, categoria } = req.body;

    try {
      const newProduct = await prisma.productos.create({
        data: { nombre, descripcion, precio, stock, categoria }
      });
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}