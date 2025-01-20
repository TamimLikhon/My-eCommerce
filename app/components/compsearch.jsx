"use client";
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const ProductCard = ({ product, onRemove, columnIndex }) => {
  if (!product) return null;
  
  return (
    <div className="flex flex-col items-center p-4">
      <img 
        src={product.image_path || '/api/placeholder/200/200'} 
        alt={product.model}
        className="w-32 h-32 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.model}</h3>
      <div className="flex gap-2">
        <button
          onClick={() => onRemove(columnIndex)}
          className="px-4 py-1 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
        >
          Remove
        </button>
        <button className="px-4 py-1 text-white bg-orange-500 rounded hover:bg-orange-600">
          Buy Now
        </button>
      </div>
    </div>
  );
};

const SearchBox = ({ onSelect, placeholder, columnIndex }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/AllData')
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : [data]))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const filteredProducts = products.filter(product =>
    product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (product) => {
    onSelect(product, columnIndex);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setIsOpen(true)}
          className="w-full px-10 py-2 border border-gray-300 rounded"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>
      
      {isOpen && searchTerm && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(product)}
            >
              <div className="font-medium">{product.brand} {product.model}</div>
              <div className="text-sm text-gray-600">{product.price_bdt} BDT</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ComparisonTable = ({ products }) => {
  const specifications = [
    { label: "Brand", key: "brand" },
    { label: "Model", key: "model" },
    { label: "Price", key: "price_bdt", format: (value) => `${value} BDT` },
    { label: "Network", key: "network" },
    { label: "Dimensions", key: "dimensions" },
    { label: "Weight", key: "weight" },
    { label: "SIM", key: "sim" },
    { label: "Display Type", key: "display_type" },
    { label: "Display Size", key: "display_size" },
    { label: "Display Resolution", key: "display_resolution" },
    { label: "OS", key: "os" },
    { label: "Chipset", key: "chipset" },
    { label: "CPU", key: "cpu" },
    { label: "Memory", key: "memory", format: (value) => Array.isArray(value) ? value.join(", ") : value },
    { label: "Main Camera", key: "main_camera" },
    { label: "Selfie Camera", key: "selfie_camera" },
    { label: "Sound", key: "sound" },
    { label: "Battery Info", key: "battery_info" },
    { label: "Sensors", key: "sensors" }
  ];

  return (
    <table className="w-full border-collapse">
      <tbody>
        {specifications.map(({ label, key, format }) => (
          <tr key={key} className="border-b">
            {/* Label column */}
            <td className="p-3 font-medium bg-gray-50 w-1/6 border-r">{label}</td>
            
            {/* Data columns */}
            {[0, 1, 2].map((index) => (
              <td key={index} className="p-3 w-1/4">
                {products[index] ? 
                  (format ? format(products[index][key]) : products[index][key]) 
                  : '-'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ProductComparison = () => {
  const [selectedProducts, setSelectedProducts] = useState([null, null, null]);

  const handleProductSelect = (product, columnIndex) => {
    setSelectedProducts(prevProducts => {
      const newProducts = [...prevProducts];
      newProducts[columnIndex] = product;
      return newProducts;
    });
  };

  const handleRemove = (columnIndex) => {
    setSelectedProducts(prevProducts => {
      const newProducts = [...prevProducts];
      newProducts[columnIndex] = null;
      return newProducts;
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Product Comparison</h1>
        <p className="text-gray-600">
          Find and select products to see the differences and similarities between them
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[0, 1, 2].map((index) => (
          <div key={index} className="space-y-4">
            <SearchBox
              placeholder="Search and Select Product"
              onSelect={handleProductSelect}
              columnIndex={index}
            />
            <ProductCard
              product={selectedProducts[index]}
              onRemove={handleRemove}
              columnIndex={index}
            />
          </div>
        ))}
      </div>

      <ComparisonTable products={selectedProducts} />
    </div>
  );
};

export default ProductComparison;