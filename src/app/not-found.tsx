import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-2 sm:px-4 py-0 sm:py-8">
            <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center justify-center flex-1 min-h-[40vh]">
                <header className="w-full flex items-center justify-center py-6 px-2 sm:px-8 mb-6">
                    <div className="flex items-center gap-6">
                        <Image src="/logo.svg" alt="CollabDraw Logo" width={70} height={70} className="w-20 h-20 sm:w-24 sm:h-24" />
                        <span className="text-5xl font-black text-blue-900 tracking-tight drop-shadow-lg">CollabDraw</span>
                    </div>
                </header>
                <main className="flex flex-col items-center justify-center flex-1 w-full gap-4 mt-2 bg-white/90 rounded-xl shadow-lg p-4">
                    <Image src="/404notfound.png" alt="404 Not Found" width={140} height={110} className="mb-2" />
                    <h2 className="text-xl font-extrabold text-blue-900 text-center mb-1">Page Not Found</h2>
                    <p className="text-sm text-blue-800 text-center mb-2 max-w-xl font-medium">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for.<br />
                        It might have been removed, renamed, or did not exist in the first place.
                    </p>
                    <Link href="/" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow text-base transition border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
                        Return Home
                    </Link>
                </main>
            </div>
        </div>
    )
}