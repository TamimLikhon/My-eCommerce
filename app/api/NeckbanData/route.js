

import { MongoClient } from "mongodb";

const uri = "mongodb+srv://Tamim:12345678F@cluster0.gc4gz.mongodb.net/";
const client = new MongoClient(uri);

export async function GET(req) {
    try {
        // Connect to MongoDB
        await client.connect();
        const database = client.db("jsondata");
        const collection = database.collection("jsondata1");

        const { searchParams } = new URL(req.url);
        const model = searchParams.get("model");

        if (model) {
            // Fetch a specific product by model
            const product = await collection.findOne({ model });

            if (!product) {
                return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
            }

            return new Response(JSON.stringify(product), { status: 200 });
        }

        // If no model is specified, return all products
        const data = await collection.find({}).toArray();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
    } finally {
        await client.close();
    }
}
