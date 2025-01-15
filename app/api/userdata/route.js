import { hash, compare } from "bcrypt";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

const uri = "mongodb+srv://Tamim:12345678F@cluster0.gc4gz.mongodb.net/";
const client = new MongoClient(uri);
const JWT_SECRET = "a814f767dd7bcb27b00ed165977fba65be9c2843f1fe04be9263081e1610f95c36dab179e9a1f3745c6a4c4d0be5e682a6e17096ac197f1c51f295dc90be6a2a"; // Replace with a strong secret key

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password, action } = body;

        if (!email || !password || !action) {
            return new Response(
                JSON.stringify({ error: "Email, password, and action are required" }),
                { status: 400 }
            );
        }

        await client.connect();
        const database = client.db("CustomEmail");
        const collection = database.collection("d");

        if (action === "register") {
            const existingUser = await collection.findOne({ email });
            if (existingUser) {
                return new Response(
                    JSON.stringify({ error: "User already exists" }),
                    { status: 400 }
                );
            }

            const hashedPassword = await hash(password, 10);
            const result = await collection.insertOne({ email, password: hashedPassword });

            return new Response(
                JSON.stringify({ success: true, message: "User registered successfully", insertedId: result.insertedId }),
                { status: 201 }
            );
        } else if (action === "login") {
            const user = await collection.findOne({ email });
            if (!user) {
                return new Response(
                    JSON.stringify({ error: "User not found" }),
                    { status: 401 }
                );
            }

            const isPasswordCorrect = await compare(password, user.password);
            if (!isPasswordCorrect) {
                return new Response(
                    JSON.stringify({ error: "Incorrect password" }),
                    { status: 401 }
                );
            }

            // Generate a JWT token
            const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

            return new Response(
                JSON.stringify({ success: true, message: "Login successful", token }),
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

export async function GET(req) {
    try {
        const authHeader = req.headers.get("Authorization");
        console.log(
            "Authorization Header: ", authHeader
        )
        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: "Authorization header missing" }),
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];
        console.log("Extracted Token: ", token);
        if (!token) {
            return new Response(
                JSON.stringify({ error: "Token missing" }),
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded Token: ", decoded);
        const email = decoded.email;

        await client.connect();
        const database = client.db("CustomEmail");
        const collection = database.collection("d");

        const user = await collection.findOne({ email }, { projection: { password: 0 } });
        if (!user) {
            return new Response(
                JSON.stringify({ error: "User not found" }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify({ success: true, user }), { status: 200 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}
