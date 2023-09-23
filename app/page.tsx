import { addProductToDatabase } from "@/actions/serverActions";
import { Product } from "@/typings";


// função unica e principal da pagina
export default async function Home() {

  // conecção com a API
  // marcamos com uma tag para podermos recarregar a lista sempre que necessario, exemplo quando adicionamos mais produtos.
  const res = await fetch('https://650efbfd54d18aabfe99b3e8.mockapi.io/products', {
    cache: 'no-cache',
    next: {
      tags: ['products']
    }
  })
 
  // transformamos em json
  const products: Product[] = await res.json();


  // basicamente temos um formulario para inclusão de produtos e uma lista sendo exibida abaixo, com todos os produtos

  // ao clicar no botao add chamamos a função addProductToDatabase que esta sendo importada acima.
  return (
    <main>
      <h1 className="text-3xl font-bold text-center">Products Warehouse</h1>
      <form action={addProductToDatabase} className="flex flex-col gap-5 max-w-xl mx-auto p-5">
        <input 
          name="product"
          className="border border-gray-300 p-2 rounded-md" 
          type="text"
          placeholder="Enter Product name..."  
        />
        <input 
          name="price"
          className="border border-gray-300 p-2 rounded-md" 
          type="text" 
          placeholder="Enter Price name..."  
        />
        <button className="border bg-blue-500 text-white p-2 rounded-md">Add Product</button>
      </form>

      <h2 className="flex justify-center font-bold p-5">List of Products</h2>

      <div className="flex flex-wrap justify-center gap-5">
        {products.map((product) => (
          <div key={product.id} className="p-5 shadow w-60">
            <p>{product.product}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
