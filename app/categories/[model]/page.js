"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
export default function productDetailsPage() {
    const { model } = useParams(); 

    const [product, setproduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!model) return; 
        async function fetchProduct() {
            try {
                const response = await fetch(`/api/AllData?model=${model}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }
                const data = await response.json();
                setproduct(data);
            } catch (error) {
                console.error("Error fetching product details:", error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [model]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>product not found.</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <Image
            src={product.image_path}
            alt={`${product.brand} ${product.model}`}
            className="w-50 h-50 object-cover rounded-md"
        />
        <h1 className="text-3xl font-bold mt-6 mb-6">
            {product.brand} {product.model}
        </h1>
         <div className="mobile"> 

        <p className="text-lg font-bold mb-2">Price: {product.price_bdt}</p>
        <p className="text-black text-ms font-bold">{product.network}</p>
        <p className="text-black text-ms font-bold">{product.dimensions}</p>
        <p className="text-black text-ms font-bold">{product.weight}</p>
        <p className="text-black text-ms font-bold">{product.sim}</p>
        <p className="text-black text-ms font-bold">{product.display_type}</p>
        <p className="text-black text-ms font-bold">{product.display_size}</p>
        <p className="text-black text-ms font-bold">{product.display_resolution}</p>
        <p className="text-black text-ms font-bold">{product.os}</p>
        <p className="text-black text-ms font-bold">{product.chipset}</p>
        <p className="text-black text-ms font-bold">{product.cpu}</p>
        <p className="text-black text-ms font-bold">{product.material}</p>
        <p className="text-black text-ms font-bold">{product.main_camera}</p>
        <p className="text-black text-ms font-bold">{product.selfie_camera}</p>
        <p className="text-black text-ms font-bold">{product.sound}</p>
        <p className="text-black text-ms font-bold">{product.battery_life}</p>
        <p className="text-black text-ms font-bold">{product.playtime}</p>
        <p className="text-black text-ms font-bold">{product.sensors}</p>
        <p className="text-black text-ms font-bold">{product.description}</p>
         </div>
    </div>
    
    );
}
