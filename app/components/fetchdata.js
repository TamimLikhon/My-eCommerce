import { useEffect, useState } from "react";

const ProductData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/AllData");
        const result = await response.json();
        const transformedData = result.map(product => ({
        id: product._id,
        brand: product.brand || "",
        model: product.model || "",

        }));

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, []);

  return data;
};

export default ProductData;
