"use client";

import { useState } from "react";

interface PasswordProtectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  isAuthenticated: boolean;
}

export default function PasswordProtection({
  children,
  title = "Password Required",
  description = "Please enter the password to access this page.",
  isAuthenticated,
}: PasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        // Reload the page to trigger server-side auth check
        window.location.reload();
      } else {
        setError("Invalid password. Please try again.");
        setPassword("");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-stone-300">
          {/* Decorative header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="h-px bg-stone-400 w-16"></div>
              <div className="mx-4 text-stone-600">🔒</div>
              <div className="h-px bg-stone-400 w-16"></div>
            </div>
            <h1 className="text-2xl font-semibold text-stone-900 mb-2">
              {title}
            </h1>
            <p className="text-stone-700">{description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-stone-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter password"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rose-400 text-white py-3 px-4 rounded-lg hover:bg-rose-500 focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? "Authenticating..." : "Access Page"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center">
              <div className="h-px bg-stone-400 w-16"></div>
              <div className="mx-4 text-stone-600">❦</div>
              <div className="h-px bg-stone-400 w-16"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
