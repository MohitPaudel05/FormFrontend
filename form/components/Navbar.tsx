"use client";
import Link from "next/link";

import Button from "./ui/Button";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-lg font-bold">E-Commerce</div>
      <div className="flex gap-4">
        <Link href="/" className="hover:text-gray-200">Home</Link>
        <Link href="/products" className="hover:text-gray-200">Products</Link>
        <Link href="/login" className="hover:text-gray-200">Login</Link>

        
        <Link href="/signup" className="hover:text-gray-200">Signup</Link>
       
      </div>
    </nav>
  );
}
