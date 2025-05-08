'use client'

import { ConvexClientProvider } from "@/app/ConvexClientProvider";
import { Toaster } from "../src/components/ui/sonner";
import ModelProvider from "./modelProvider";
// import { AuthLoading } from "convex/react";
// import Loading from "./Loading";
// import { UserButton, useUser } from "@clerk/clerk-react";
// import { Authenticated } from "convex/react";
// import { useRouter } from "next/navigation";


export default function Providers({ children }: { children: React.ReactNode }) {
    // const { isSignedIn } = useUser();

    // const router = useRouter();

    // const handleHeaderClick = () => {
    //     if (isSignedIn) {
    //         router.push('/dashboard');
    //     }
    //     else {
    //         router.push('/');
    //     }
    // }

    return (
        <ConvexClientProvider>
            <Toaster />
            <ModelProvider />
            {/* <header className="flex  items-center p-4 bg-blue-950 text-white">
                <h1 className="cursor-pointer justify-start" onClick={handleHeaderClick}>COLLABDRAW</h1>
                <div className="ml-auto flex justify-end p-4">
                    <Authenticated>
                        <UserButton />
                    </Authenticated>
                </div>
            </header> */}
            {children}

        </ConvexClientProvider>
    )
}
