// app/page.tsx
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import prisma from '../lib/prisma';

interface Producto {
  id_producto: number;
  nombre: string;
  precio: number;
}

export default function Home({ productos }: { productos: Producto[] }) {
  return (
    <div>
      <h1>Bienvenido al sistema de gestión de productos</h1>
      <Link href="/productos/crear">Crear Producto</Link>
      <h2>Listado de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id_producto}>
            {producto.nombre} - {producto.precio} USD
            <Link href={`/productos/actualizar/${producto.id_producto}`}> (Actualizar)</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const productos = await prisma.productos.findMany();
  return {
    props: { productos },
  };
};
