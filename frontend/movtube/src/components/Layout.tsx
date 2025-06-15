import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />

      {/* Main Content - with padding to account for fixed header */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
