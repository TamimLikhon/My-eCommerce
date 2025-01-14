// BrandFilter component
export default function BrandFilter({ data, onFilter }) {
    const uniqueBrands = [...new Set(data.map(item => item.brand))];

    return (
        <div className="flex flex-wrap gap-4 mb-8">
            {uniqueBrands.map((brand) => (
                <button
                    key={brand}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => onFilter(brand)}
                >
                    {brand}
                </button>
            ))}
            <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => onFilter(null)}
            >
                Show All
            </button>
        </div>
    );
}