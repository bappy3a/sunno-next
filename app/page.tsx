import Product from "@/components/product/Product";
import { PRODUCTS } from "@/utils/product";
export default function Home() {


  return (
    <div className="container mx-auto">
      <div className='grid grid-cols-4 gap-6 w-full'>
        { PRODUCTS.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
  