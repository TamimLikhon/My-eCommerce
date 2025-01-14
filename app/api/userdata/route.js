import { hash, compare } from "bcrypt";
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://Tamim:12345678F@cluster0.gc4gz.mongodb.net/";
const client = new MongoClient(uri);

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password, action } = body; // `action` determines register or login

        if (!email || !password || !action) {
            return new Response(
                JSON.stringify({ error: "Email, password, and action are required" }),
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await client.connect();
        const database = client.db("CustomEmail"); // Replace with your database name
        const collection = database.collection("d"); // Replace with your collection name

        if (action === "register") {
            // Check if user already exists
            const existingUser = await collection.findOne({ email });
            if (existingUser) {
                return new Response(
                    JSON.stringify({ error: "User already exists" }),
                    { status: 400 }
                );
            }

            // Hash password and save user
            const hashedPassword = await hash(password, 10);
            const result = await collection.insertOne({ email, password: hashedPassword });

            return new Response(
                JSON.stringify({ success: true, message: "User registered successfully", insertedId: result.insertedId }),
                { status: 201 }
            );
        } else if (action === "login") {
            // Find the user
            const user = await collection.findOne({ email });
            if (!user) {
                return new Response(
                    JSON.stringify({ error: "User not found" }),
                    { status: 401 }
                );
            }

            // Compare passwords
            const isPasswordCorrect = await compare(password, user.password);
            if (!isPasswordCorrect) {
                return new Response(
                    JSON.stringify({ error: "Incorrect password" }),
                    { status: 401 }
                );
            }

            // Authentication successful
            return new Response(
                JSON.stringify({ success: true, message: "Login successful" }),
                { status: 200 }
            );
        } else {
            return new Response(
                JSON.stringify({ error: "Invalid action" }),
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error in user management:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}
