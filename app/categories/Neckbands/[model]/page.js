"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function NeckbandDetailsPage() {
    const { model } = useParams(); 

    const [neckband, setNeckband] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!model) return; // Wait for the `model` parameter to be available

        async function fetchProduct() {
            try {
                const response = await fetch(`/api/NeckbanData?model=${model}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }
                const data = await response.json();
                setNeckband(data);
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

    if (!neckband) {
        return <p>Neckband not found.</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <Image
            src={neckband.image_path}
            alt={`${neckband.brand} ${neckband.model}`}
            className="w-50 h-50 object-cover rounded-md"
        />
        <h1 className="text-3xl font-bold mt-6 mb-6">
            {neckband.brand} {neckband.model}
        </h1>
        <p className="text-lg font-bold mb-2">Price: {neckband.price_bdt}</p>
        <p className="text-black">{neckband.charging_time}</p>
        <p className="text-black">{neckband.bluetooth}</p>
        <p className="text-black">{neckband.speaker_type}</p>
        <p className="text-black">{neckband.calling}</p>
        <p className="text-black">{neckband.microphone}</p>
        <p className="text-black">{neckband.control}</p>
        <p className="text-black">{neckband.talk_time}</p>
        <p className="text-black">{neckband.capacity}</p>
        <p className="text-black">{neckband.charging_time}</p>
        <p className="text-black">{neckband.battery_capacity}</p>
        <p className="text-black">{neckband.material}</p>
        <p className="text-black">{neckband.weight}</p>
        <p className="text-black">{neckband.cable}</p>
        <p className="text-black">{neckband.sensitivity}</p>
        <p className="text-black">{neckband.driver_size}</p>
        <p className="text-black">{neckband.playtime}</p>
        <p className="text-black">{neckband.connection_type}</p>
        <p className="text-black">{neckband.working_time}</p>
        <p className="text-black">{neckband.standby_time}</p>
        <p className="text-black">{neckband.sound}</p>
        <p className="text-black">{neckband.frequency_response}</p>
        <p className="text-black">{neckband.other_features}</p>
    </div>
    
    );
}
