import { OrganizationSwitcher, useOrganization, UserButton } from "@clerk/clerk-react";
import SearchInput from "./search-input";
import InviteButton from "../invite-button";

export default function NavBar() {

    const { organization } = useOrganization();

    return (
        <div className="flex justify-between items-center h-16 gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1 ">
                <SearchInput />
            </div>
            <div className="block lg:hidden flex-1">
                <OrganizationSwitcher
                    hidePersonal
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%", // Corrected typo and ensured full width
                                maxWidth: "none", // Removed maxWidth to allow full width
                            },
                            organizationSwitcherTrigger: {
                                padding: "6px 12px",
                                borderRadius: "8px",
                                width: "100%",
                                border: "1px solid #000000",
                                backgroundColor: "#F9FAFB",
                                color: "#1E1E2F",
                                justifyContent: "space-between"
                            }
                        }
                    }
                    } />
            </div>
            {organization && <InviteButton />}
            <UserButton />
        </div>
    )
}