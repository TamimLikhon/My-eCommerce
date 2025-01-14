"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupUser() {
  const [error, setError] = useState(null); // For error handling
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const router = useRouter(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setIsLoading(true); // Start loading

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/userdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, action: "register" }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("User registered successfully:", data);
        router.push("/"); // Redirect to the homepage after success
      } else {
        setError(data.error || "An error occurred during signup");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <form
      className="flex flex-col w-full space-y-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold">Sign Up</h1>
      {error && (
        <div className="text-red-500 p-2 border border-red-500 rounded">
          {error}
        </div>
      )}
      <input
        type="email"
        name="email"
        placeholder="example@mail.com"
        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-blue-500"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className={`bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
}
