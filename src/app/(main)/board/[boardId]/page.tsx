import Room from "@/components/room";
import Canvas from "./_components/canvas";
import { Loading } from "./_components/loading";

export const dynamic = "force-dynamic";

interface BoardIdPageProps {
    params: {
        boardId: string;
    };
};



export default async function BoardIdPage({ params }: BoardIdPageProps) {

    // return <Loading />;

    const { boardId } = await params;

    return (
        <Room roomId={boardId} fallback={<Loading />}>
            <main className="h-full w-full relative touch-none">
                <Canvas boardId={boardId} />
            </main>
        </Room>
    );
}