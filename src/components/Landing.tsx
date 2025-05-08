"use client";

import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

export function LandingPage() {
    const router = useRouter();

    const { isSignedIn } = useUser();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-blue-900 text-white">
            <h1 className="text-4xl font-bold mb-6">{isSignedIn ? "Welcome to CollabDraw" : "Welcome Back"}</h1>
            <p className="text-lg mb-8 text-center max-w-md">
                Collaborate and draw with your team in real-time. Get started now to unleash your creativity!
            </p>
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => console.log('Get Started!')}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
                >
                    Get Started
                </button>
                <button
                    onClick={() => {
                        console.log('Sign In');
                        router.push('/auth/sign-in');
                    }}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
                >
                    Sign In
                </button>
                <button
                    onClick={() => {
                        console.log('Sign Up');
                        router.push('/auth/sign-up');
                    }}
                    className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};
