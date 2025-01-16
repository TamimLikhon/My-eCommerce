"use client";
import { useParams } from "next/navigation"; 
import { useEffect, useState } from "react";

export default function ProductDetail() {
    const { model } = useParams(); 
    const [mobileData, setMobileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!model) return; 
        async function fetchProduct() {
            try {
                const response = await fetch(`/api/MobileData?model=${model}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }
                const data = await response.json();
                setMobileData(data);
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

    if (!mobileData) {
        return <p>Result not found!</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <img
            src={mobileData.image_path}
            alt={`${mobileData.brand} ${mobileData.model}`}
            className="w-16object-cover rounded-md"
        />
        <h1 className="text-3xl font-bold mb-6">
            {mobileData.brand} {mobileData.model}
        </h1>
        
        <p className="text-lg font-bold mb-2">Price: {mobileData.price_bdt}</p>
        <p className="text-black text-ms font-bold">{mobileData.network}</p>
        <p className="text-black text-ms font-bold">{mobileData.dimensions}</p>
        <p className="text-black text-ms font-bold">{mobileData.weight}</p>
        <p className="text-black text-ms font-bold">{mobileData.sim}</p>
        <p className="text-black text-ms font-bold">{mobileData.display_type}</p>
        <p className="text-black text-ms font-bold">{mobileData.display_size}</p>
        <p className="text-black text-ms font-bold">{mobileData.display_resolution}</p>
        <p className="text-black text-ms font-bold">{mobileData.os}</p>
        <p className="text-black text-ms font-bold">{mobileData.chipset}</p>
        <p className="text-black text-ms font-bold">{mobileData.cpu}</p>
        <p className="text-black text-ms font-bold">{mobileData.material}</p>
        <p className="text-black text-ms font-bold">{mobileData.main_camera}</p>
        <p className="text-black text-ms font-bold">{mobileData.selfie_camera}</p>
        <p className="text-black text-ms font-bold">{mobileData.sound}</p>
        <p className="text-black text-ms font-bold">{mobileData.battery_life}</p>
        <p className="text-black text-ms font-bold">{mobileData.playtime}</p>
        <p className="text-black text-ms font-bold">{mobileData.sensors}</p>
        <p className="text-black text-ms font-bold">{mobileData.description}</p>

    </div>
    
    );
}
