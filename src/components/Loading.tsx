import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Image src="/logo.svg" alt="Logo" width={120} height={120} className="animate-bounce duration-700" />
        </div>
    )
}