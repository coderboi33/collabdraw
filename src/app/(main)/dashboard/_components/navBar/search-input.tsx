"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import qs from "query-string"
import debounce from "debounce";


export default function SearchInput() {

    const router = useRouter();
    const [value, setValue] = useState<string>("");

    type DebouncedFn = ((searchValue: string) => void) & { clear?: () => void };
    const debouncedSearch = useRef<DebouncedFn | null>(null);

    useEffect(() => {
        debouncedSearch.current = debounce((searchValue: string) => {
            const url = qs.stringifyUrl({
                url: "/dashboard",
                query: {
                    search: searchValue,
                },
            }, { skipNull: true, skipEmptyString: true });
            router.push(url);
        }, 2000) as DebouncedFn;
        return () => {
            if (debouncedSearch.current && debouncedSearch.current.clear) {
                debouncedSearch.current.clear();
            }
        };
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        e.preventDefault();
        e.stopPropagation();
        if (debouncedSearch.current) {
            debouncedSearch.current(e.target.value);
        }
    }

    return (
        <div className="flex-1 flex items-center justify-center pl-5 gap-x-4 w-full relative">
            <Search className="text-cyan-500 absolute top-1/2 left-10 transform -translate-y-1/2 h-5 w-5 pointer-events-none" />
            <Input
                className="w-full rounded-lg border border-cyan-200 bg-cyan-50 shadow-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all duration-200 pl-12 pr-4 py-2 text-gray-800 placeholder-cyan-400 hover:bg-cyan-100"
                placeholder="Search Boards"
                onChange={handleChange}
                value={value}
            />
        </div>
    );
}