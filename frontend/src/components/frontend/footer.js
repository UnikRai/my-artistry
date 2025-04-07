import React from 'react';

export default function Footer() {
  return (
    <div>
      <footer className="flex flex-wrap justify-between items-center py-6 bg-gray-900 mt-8">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <a href="/">
            <img
              src="https://via.placeholder.com/150x60.png?text=MyLogo" // Replace this with your actual logo URL
              alt="Logo"
              className="h-16"
            />
          </a>
          {/* Copyright text */}
          <span className="text-white text-sm">© 2023 Company, Inc</span>
        </div>
      </footer>
    </div>
  );
}
