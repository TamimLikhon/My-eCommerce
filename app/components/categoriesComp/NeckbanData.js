"use client";

export default function NeckbandDetails({ neckbandData }) {
    if (!neckbandData) {
        return <p>Neckband data not found!</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
            <img
                src={neckbandData.image_path}
                alt={`${neckbandData.brand} ${neckbandData.model}`}
                className="w-50 h-50 object-cover rounded-md"
            />
            <h1 className="text-3xl font-bold mt-6 mb-6">
                {neckbandData.brand} {neckbandData.model}
            </h1>
            <p className="text-lg font-bold mb-2">Price: {neckbandData.price_bdt}</p>
            <p className="text-black">{neckbandData.charging_time}</p>
            <p className="text-black">{neckbandData.bluetooth}</p>
            <p className="text-black">{neckbandData.speaker_type}</p>
            <p className="text-black">{neckbandData.calling}</p>
            <p className="text-black">{neckbandData.microphone}</p>
            <p className="text-black">{neckbandData.control}</p>
            <p className="text-black">{neckbandData.talk_time}</p>
            <p className="text-black">{neckbandData.capacity}</p>
            <p className="text-black">{neckbandData.sensitivity}</p>
            <p className="text-black">{neckbandData.driver_size}</p>
            <p className="text-black">{neckbandData.playtime}</p>
            <p className="text-black">{neckbandData.connection_type}</p>
        </div>
    );
}
