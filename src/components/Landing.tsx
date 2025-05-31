"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export function LandingPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-2 sm:px-4 py-0 sm:py-8">
            {/* Video background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 brightness-90"
            >
                <source src="/landingvid.mp4" type="video/mp4" />
            </video>
            {/* Overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-blue-100/20 z-0" />
            {/* Main content (z-10 to be above bg) */}
            <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center justify-center flex-1 min-h-[80vh]">
                <header className="w-full flex items-center justify-between py-6 px-2 sm:px-6">
                    <div className="flex items-center gap-4">
                        <Image src="/logo.svg" alt="CollabDraw Logo" width={80} height={80} className="w-14 h-14 sm:w-20 sm:h-20" />
                        <span className="text-5xl font-black text-blue-900 tracking-tight drop-shadow-lg">CollabDraw</span>
                    </div>
                    <button
                        onClick={() => router.push('/auth/sign-in')}
                        className="px-7 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg text-lg transition border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Sign In
                    </button>
                </header>
                <main className="flex flex-col items-center justify-center flex-1 w-full gap-8 mt-8">
                    <h1 className="text-4xl sm:text-6xl font-extrabold text-blue-900 text-center leading-tight drop-shadow-xl">
                        Visual Collaboration<br className="hidden sm:block" />Made Effortless
                    </h1>
                    <p className="text-lg sm:text-xl text-blue-800 text-center mb-4 max-w-xl font-medium drop-shadow-sm">
                        Instantly brainstorm, plan, and create together on a real-time whiteboard.<br className="hidden sm:block" />
                        CollabDraw brings your ideas to life—wherever you are.
                    </p>
                    <button
                        onClick={() => router.push('/auth/sign-up')}
                        className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl text-xl transition mb-2"
                    >
                        Get Started Free
                    </button>
                    <span className="text-xs text-blue-400">No credit card required</span>
                </main>
                <footer className="w-full mx-auto mt-10 text-center text-blue-400 text-xs opacity-90 py-6 border-t border-blue-100 flex flex-col items-center gap-3">
                    <div className="font-semibold text-blue-700 text-base flex flex-col items-center gap-1">
                        <span className="text-lg">Soumya Pratim Kundu</span>
                        <span className="text-xs text-blue-500">Jadavpur University &bull; Electrical Engineering</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-2">
                        <a href="mailto:soumyapratimkundu@gmail.com" className="flex items-center gap-2 underline hover:text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="3" fill="#3B82F6" /><path d="M22 6.5l-9.293 7.293a1 1 0 01-1.414 0L2 6.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <span className="text-base">soumyapratimkundu@gmail.com</span>
                        </a>
                        <a href="https://github.com/coderboi33" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 underline hover:text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="#3B82F6" /><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.111-4.555-4.944 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.566 4.936.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.579.688.481C19.135 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="#fff" /></svg>
                            <span className="text-base">github.com/coderboi33</span>
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}
