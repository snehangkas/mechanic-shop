'use client';

import { useState, useEffect } from 'react';

interface LoginCredentials {
  email: string;
  password: string;
  accountId?: string;
}

interface Product {
  imageUrl?: string;
  name?: string;
}

interface CartItem {
  product?: Product;
  quantity: number;
  fulfillmentMethod: string;
}

export default function AutozoneCatalog() {
  const [showIframe, setShowIframe] = useState(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    accountId: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    // Add message event listener
    const handleMessage = (event: MessageEvent) => {
         
      if (event.data.type === 'PUNCH_OUT' && event.data.cartItems) {
        console.log('Cart items:', event.data.cartItems);
        setCartItems(event.data.cartItems);
        setShowCart(true);
        setShowIframe(false);
      } else if (event.data.type === 'CLOSE_IFRAME') {
        setShowIframe(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`https://nextjs-builderio-starter-storefront-demos-flax.vercel.app/api/cross-site-auth`, {
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

      // If login successful, set logged in state
      setIsLoggedIn(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const handleShowIframe = () => {
    if (isLoggedIn) {
      setShowIframe(true);
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
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
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          {!showCart ? (
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              onClick={handleShowIframe}
            >
              Browse Autozone Catalog
            </button>
          ) : (
            <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Cart Items</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fulfillment Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 border-b border-gray-200">
                          {item.product?.imageUrl && (
                            <img 
                              src={`https:${item.product.imageUrl}`} 
                              alt={item.product.name || 'Product image'} 
                              className="h-16 w-16 object-contain"
                            />
                          )}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-900">
                          {item.product?.name}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-900">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-gray-900">
                          {item.fulfillmentMethod}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                src="https://nextjs-builderio-starter-storefront-demos-flax.vercel.app"
                    className="w-full h-[calc(100%-4rem)] border-0"
                    title="Autozone Catalog"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
} 