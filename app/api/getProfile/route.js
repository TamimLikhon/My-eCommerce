// app/api/auth/getProfile/route.js
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const email = request.nextUrl.searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { message: 'Email is required' },
      { status: 400 }
    );
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const user = await db.collection('users').findOne({ email });
    
    await client.close();

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      name: user.name || '',
      email: user.email
    }, { status: 200 });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching profile' },
      { status: 500 }
    );
  }
}