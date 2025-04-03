import Image from "next/image";
import AutozoneCatalog from "./components/AutozoneCatalog";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Expert Auto Repair Services</h1>
              <p className="text-xl mb-6">Your trusted partner for all automotive needs</p>
              <AutozoneCatalog />
            </div>
            <div className="md:w-1/2">
              <div className="relative w-full h-[400px] bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <Image
                  src="/images/mechanic-shop.jpg"
                  alt="Professional Auto Repair Shop"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Engine Repair</h3>
              <p className="text-gray-600">Expert diagnostics and repairs for all engine types</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Brake Service</h3>
              <p className="text-gray-600">Complete brake system inspection and maintenance</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Oil Change</h3>
              <p className="text-gray-600">Quick and professional oil change services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Mechanic Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
