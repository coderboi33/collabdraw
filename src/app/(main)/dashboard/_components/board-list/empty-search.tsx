import Image from "next/image";

export default function EmptySearch(query: { search: string }) {

    return (
        <div className="flex-1 flex flex-col items-center justify-center h-full">
            <Image
                src={"/notfound.png"}
                alt={"No Boards"}
                width={200}
                height={200}
                priority
                className="pr-5 pb-5 hidden md:block"
            />
            <h1 className="text-2xl text-gray-500">No boards found named {query.search}</h1>
        </div>
    )
}