import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    res.status(400).json({ error: 'ID de producto inválido' });
    return;
  }

  try {
    const producto = await prisma.productos.findUnique({
      where: { id_producto: parseInt(id) }
    });

    if (!producto) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.status(200).json(producto);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
}