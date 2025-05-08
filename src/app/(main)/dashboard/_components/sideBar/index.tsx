import List from "./list"
import NewButton from "./newButton"

export const Sidebar = () => {
    return (
        <aside className="fixed z-[1] left-0 bg-orange-800 h-full w-[60px] flex p-3 flex-col items-center justify-start gap-y-4">
            <List />
            <NewButton />
        </aside>
    )
}