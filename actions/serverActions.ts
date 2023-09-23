// esta é a função que adiciona os produtos ao banco de dados
'use server';

import { Product } from "@/typings";
import { revalidateTag } from "next/cache";

export const addProductToDatabase = async (e: FormData) => {
  // pegamos os valores product and price pelo name que estão sendo inclusos no formulario na outra pagina
    const product = e.get('product')?.toString();
    const price = e.get('price')?.toString();


    // se eles não existirem não fazemos nada
    if (!product || !price) return;


    // se existirem, criamos um objeto com os dois valores
    const newProduct: Product = {
      product,
      price,
    };

    // enviamos este objeto para nossa API através do metodo POST
    await fetch("https://650efbfd54d18aabfe99b3e8.mockapi.io/products", {
      method: 'POST',
      body: JSON.stringify(newProduct),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // recarregamos a pagina (apenas a api) para exibirmos os dados atualizados com a nova inclusão
    revalidateTag('products')
  }