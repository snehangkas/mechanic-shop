'use client';

import { useState } from 'react';

interface LoginCredentials {
  email: string;
  password: string;
  accountId?: string;
}

export default function AutozoneCatalog() {
  const [showIframe, setShowIframe] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    accountId: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/cross-site-auth', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
          accountId: credentials.accountId // Optional
        })
      });
     const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      // If login successful, show the iframe
      setShowLogin(false);
      setShowIframe(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <>
      <button 
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        onClick={() => setShowLogin(true)}
      >
        Browse Autozone Catalog
      </button>
      
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Login to Autozone Catalog</h3>
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountId">
                      Account ID (Optional)
                    </label>
                    <input
                      id="accountId"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={credentials.accountId}
                      onChange={(e) => setCredentials({ ...credentials, accountId: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLogin(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showIframe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full h-full bg-white rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 bg-gray-100">
                <h3 className="text-lg font-semibold">Autozone Catalog</h3>
                <button 
                  onClick={() => setShowIframe(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <iframe
                src="http://localhost:3001/"
                className="w-full h-[calc(100%-4rem)] border-0"
                title="Autozone Catalog"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 