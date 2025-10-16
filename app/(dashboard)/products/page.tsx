import ProductList from "@/components/products/product-list";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <ProductList />
      </div>
    </div>
  );
}
