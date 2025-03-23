"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className="w-full p-4 bg-gray-800 text-white flex justify-center space-x-4">
        <Link href="/" className="hover:underline">
          CRUD Page
        </Link>
        <Link href="/table" className="hover:underline">
          Table
        </Link>
      </nav>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold">
          QA Testing Backend - Interactive Demo
        </h1>

        <p className="text-lg mt-2">
          Explore CRUD operations and find the bugs!
        </p>
        <Link
          href="/crud"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go to CRUD Page
        </Link>
      </div>
    </div>
  );
}
