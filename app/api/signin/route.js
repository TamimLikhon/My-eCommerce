import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      await client.close();
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    
    await client.close();

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: 'Logged in successfully',
      userId: user._id.toString(),
      email: user.email  // Include email in response
    }, { status: 200 });
  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { message: 'An error occurred during sign in' },
      { status: 500 }
    );
  }
}