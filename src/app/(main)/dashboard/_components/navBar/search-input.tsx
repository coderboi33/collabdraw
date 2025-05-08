"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string"
import { useDebounceValue } from "usehooks-ts";

export default function SearchInput() {

    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounceValue(value, 500);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    useEffect(() => {
        const url = qs.stringifyUrl({
            url: "/dashboard",
            query: {
                search: debouncedValue[0],
            },
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    }, [debouncedValue, router]);

    return (
        <div className="flex-1 flex items-center justify-center gap-x-4 w-full relative">
            <Search className="text-gray-600 absolute top-1/2 left-3 transform -translate-y-1/2 h-4 w-4" />
            <Input className="w-full border-black bg-[#a1f9fc] hover:bg-[#76dde0] pl-9" placeholder="Search Boards"
                onChange={handleChange}
                value={value} />
        </div>
    );
}