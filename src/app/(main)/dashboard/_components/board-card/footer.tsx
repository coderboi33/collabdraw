import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { api } from "../../../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


interface FooterProps {
    id: Id<"boards">;
    orgId: string;
    title: string;
    authorName: string;
    createdAt: string;
    isFavourite?: boolean;
}

export function Footer({
    id,
    orgId,
    isFavourite,
    title,
    authorName,
    createdAt,
}: FooterProps) {

    const favourite = useMutation(api.board.favourite);
    const unfavourite = useMutation(api.board.unfavourite);

    const handleToggleFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Prevent the click from propagating to the parent Link component
        event.preventDefault(); // Prevent the default action of the button
        if (isFavourite) {
            unfavourite({ id, orgId })
                .then(() => {
                    toast.success("Board unfavourited!");
                    console.log("Board unfavourited with ID:", id);
                })
                .catch((error) => {
                    toast.error("Error unfavouriting board.");
                    console.error("Error unfavouriting board:", error);
                });
        }
        else {
            favourite({ id, orgId })
                .then(() => {
                    toast.success("Board favourited!");
                    console.log("Board favourited with ID:", id);
                })
                .catch((error) => {
                    toast.error("Error favouriting board.");
                    console.error("Error favouriting board:", error);
                });
        }
    }

    return (
        <div className="footer-container flex items-center justify-between p-4 border-t relative">
            <div className="info">
                <h3 className="title font-bold text-lg">{title}</h3>
                <p className="author text-sm text-gray-500">
                    {authorName} • {createdAt}
                </p>
            </div>
            <Button
                type="button"
                onClick={handleToggleFavourite}
                className="absolute text-muted-foreground bg-transparent hover:bg-transparent hover:scale-125 transition-colors duration-600 "
                style={{ right: "100px" }}
                aria-label="Toggle Favourite"
            >
                <Star className={cn(
                    "h-7 w-7",
                    isFavourite ? "text-yellow-500 fill-yellow-500" : "text-gray-400",
                )} />
            </Button>
        </div>
    );
}