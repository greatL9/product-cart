import { ProductTitle } from "./ProductTitle";
import { ProductList } from "./ProductList";
import data from "../../data.json";

const products = data;

export const ProductDisplay = () => {
  return (
    <div className="flex flex-col gap-12 ">
      <ProductTitle />
      <ul className="flex flex-col md:grid grid-cols-3 gap-x-16 gap-y-24 justify-center gap-20">
        {products.map((product) => (
          <ProductList key={product.name} product={product} />
        ))}
      </ul>
    </div>
  );
};
