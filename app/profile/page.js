'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Loader2 } from 'lucide-react';

export default function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      router.push('/signin');
      return;
    }
    setEmail(userEmail);
    fetchUserProfile(userEmail);
  }, [router]);

  async function fetchUserProfile(userEmail) {
    try {
      const response = await fetch(`/api/getProfile?email=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setName(data.name || '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', content: '' });

    try {
      const response = await fetch('/api/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', content: 'Profile updated successfully!' });
      } else {
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      setMessage({ type: 'error', content: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {message.content && (
            <div className={`p-3 rounded ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.content}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Update Profile'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
