// pages/api/productos/update/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    res.status(400).json({ error: 'ID de producto inválido' });
    return;
  }

  if (req.method === 'PUT') {
    const { nombre, descripcion, precio, stock, categoria } = req.body;

    try {
      const updatedProduct = await prisma.productos.update({
        where: { id_producto: parseInt(id) },
        data: { nombre, descripcion, precio, stock, categoria }
      });
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
