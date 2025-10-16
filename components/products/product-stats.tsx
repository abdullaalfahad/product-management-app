import { Package } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductStatsProps {
  products: Product[];
}

export function ProductStats({ products }: ProductStatsProps) {
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const totalCategories = new Set(products.map((p) => p.category?.name)).size;

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: <Package className="w-6 h-6 text-blue-600" />,
      bgColor: "bg-blue-100",
    },
    {
      label: "Total Value",
      value: `$${totalValue.toFixed(2)}`,
      icon: <span className="text-2xl">💰</span>,
      bgColor: "bg-green-100",
    },
    {
      label: "Categories",
      value: totalCategories,
      icon: <span className="text-2xl">📦</span>,
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
            <div
              className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
