"use client";

import { RenameModel } from "@/components/models/renameModel";
import { useEffect, useState } from "react";

export default function ModelProvider() {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [setIsMounted]);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <RenameModel></RenameModel >
        </>
    )
}