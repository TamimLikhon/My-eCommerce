'use client';
import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import {CartContext} from "../../../components/CartContext"
import { Plus } from "lucide-react";
import Image from "next/image";

export default function ProductDetailsPage() {
    const { model } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart} = useContext(CartContext);

    useEffect(() => {
        if (!model) return;
        async function fetchProduct() {
            try {
                const response = await fetch(`/api/AllData?model=${model}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details:", error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [model]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-gray-600">Product not found.</p>
            </div>
        );
    }
    const handleAddToCart = (item) => {
        addToCart(item);
      };  


    const specifications = [
        { label: "Bluetooth", value: product.bluetooth },
        { label: "Speaker Type", value: product.speaker_type },
        { label: "Calling Features", value: product.calling },
        { label: "Microphone", value: product.microphone },
        { label: "Controls", value: product.control },
        { label: "Talk Time", value: product.talk_time },
        { label: "Battery Capacity", value: product.battery_capacity },
        { label: "Charging Time", value: product.charging_time },
        { label: "Playtime", value: product.playtime },
        { label: "Standby Time", value: product.standby_time },
        { label: "Working Time", value: product.working_time },
        { label: "Material", value: product.material },
        { label: "Cable", value: product.cable },
        { label: "Driver Size", value: product.driver_size },
        { label: "Sensitivity", value: product.sensitivity },
        { label: "Connection Type", value: product.connection_type },
        { label: "Frequency Response", value: product.frequency_response },
        { label: "Other Features", value: product.other_features }
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="flex justify-center items-start">
                <Image
                    src={product.image_path}
                    alt={`${product.brand} ${product.model}`}
                    width={200}
                    height={100}
    
                    className="w-full h-full object-contain p-4 transform hover:scale-105 transition-transform"
                  />


                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">
                        {product.brand} {product.model}
                    </h1>
                    {product.price_bdt && (
                        <p className="text-2xl font-semibold text-blue-600 mb-6">
                            Price: {product.price_bdt}
                        </p>
                    )}
                                <button
                onClick={() => handleAddToCart(product)}
                className="flex items-center justify-center gap-2 p-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
                >
                Add to Cart <Plus />
                </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                    <h2 className="text-xl font-semibold">Specifications</h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {specifications.map((spec, index) => (
                        spec.value && (
                            <div key={index} className="grid grid-cols-3 px-6 py-4 hover:bg-gray-50">
                                <div className="col-span-1">
                                    <span className="font-semibold text-black">{spec.label}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-black font-semibold">{spec.value}</span>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}