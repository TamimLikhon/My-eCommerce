import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !email.includes('@') || !password || password.length < 6) {
      return NextResponse.json(
        { message: 'Invalid input' },
        { status: 422 }
      );
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      client.close();
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 422 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
    });

    client.close();
    return NextResponse.json(
      { message: 'User created', userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}