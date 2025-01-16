"use client";
import Image from "next/image";

export default function MobileDetails({ mobileData }) {
    if (!mobileData) {
        return <p>Mobile data not found!</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
            <Image
                src={mobileData.image_path}
                alt={`${mobileData.brand} ${mobileData.model}`}
                className="w-50 h-50 object-cover rounded-md"
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
            <p className="text-black text-ms font-bold">{mobileData.main_camera}</p>
            <p className="text-black text-ms font-bold">{mobileData.selfie_camera}</p>
            <p className="text-black text-ms font-bold">{mobileData.sound}</p>
            <p className="text-black text-ms font-bold">{mobileData.battery_life}</p>
            <p className="text-black text-ms font-bold">{mobileData.sensors}</p>
            <p className="text-black text-ms font-bold">{mobileData.description}</p>
        </div>
    );
}
