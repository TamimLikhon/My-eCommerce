"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
        <img
            src={product.image_path}
            alt={`${product.brand} ${product.model}`}
            className="w-50 h-50 object-cover rounded-md"
        />
        <h1 className="text-3xl font-bold mt-6 mb-6">
            {product.brand} {product.model}
        </h1>
         
        <p className="text-lg font-bold mb-2">Price: {product.price_bdt}</p>
        <p className="text-black">{product.charging_time}</p>
        <p className="text-black">{product.bluetooth}</p>
        <p className="text-black">{product.speaker_type}</p>
        <p className="text-black">{product.calling}</p>
        <p className="text-black">{product.microphone}</p>
        <p className="text-black">{product.control}</p>
        <p className="text-black">{product.talk_time}</p>
        <p className="text-black">{product.capacity}</p>
        <p className="text-black">{product.charging_time}</p>
        <p className="text-black">{product.battery_capacity}</p>
        <p className="text-black">{product.material}</p>
        <p className="text-black">{product.weight}</p>
        <p className="text-black">{product.cable}</p>
        <p className="text-black">{product.sensitivity}</p>
        <p className="text-black">{product.driver_size}</p>
        <p className="text-black">{product.playtime}</p>
        <p className="text-black">{product.connection_type}</p>
        <p className="text-black">{product.working_time}</p>
        <p className="text-black">{product.standby_time}</p>
        <p className="text-black">{product.sound}</p>
        <p className="text-black">{product.frequency_response}</p>
        <p className="text-black">{product.other_features}</p>

            <p className="text-black">{product.charging_time}</p>
            <p className="text-black">{product.bluetooth}</p>
            <p className="text-black">{product.speaker_type}</p>
            <p className="text-black">{product.calling}</p>
            <p className="text-black">{product.microphone}</p>
            <p className="text-black">{product.control}</p>
            <p className="text-black">{product.talk_time}</p>
            <p className="text-black">{product.capacity}</p>
            <p className="text-black">{product.sensitivity}</p>
            <p className="text-black">{product.driver_size}</p>
            <p className="text-black">{product.playtime}</p>
            <p className="text-black">{product.connection_type}</p>
    </div>
    
    );
}
