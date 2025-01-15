import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const result = await db.collection('users').updateOne(
      { email },
      { $set: { name } }
    );

    await client.close();

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      name
    }, { status: 200 });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating profile' },
      { status: 500 }
    );
  }
}