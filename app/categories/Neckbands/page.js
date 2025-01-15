"use client";
import { useEffect, useState } from "react";
import BrandFilter from "../../components/filter";
import Link from "next/link";
export default function NeckbandPage() {
  const [neckbandata, setbandata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNeckbandata = async () => {
      try {
        const response = await fetch("/api/NeckbanData"); // Ensure the correct URL
        const data = await response.json();
        setbandata(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching Neckband data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNeckbandata();
  }, []);

  const handleFilter = (brand) => {
    if (brand) {
      setFilteredData(neckbandata.filter((item) => item.brand === brand));
    } else {
      setFilteredData(neckbandata);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Neckband Page</h1>
    <p className="text-gray-600 mb-8">Welcome to the Neckband Page.</p>

    {loading ? (
        <div className="flex justify-center">
            <p className="text-lg">Loading...</p>
        </div>
    ) : (
        <>
            <BrandFilter data={neckbandata} onFilter={handleFilter} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((item) => (
                    <Link href={`/categories/Neckbands/${item.model}`} key={item.id}
                        className="border rounded-lg p-4 shadow-md"
                    >
                        <div className="relative w-full h-70 mb-4">
                            <img
                                src={item.image_path}
                                alt={`${item.brand} ${item.model}`}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                        <h2 className="text-xl text-mm mb-2">
                            {item.brand} {item.model}
                        </h2>
                        <p className="text-1.5rem font-bold mb-2 text-black">{item.price_bdt}</p>
                        
                    </Link>
                ))}
            </div>
        </>
    )}
</div>
  );
}
