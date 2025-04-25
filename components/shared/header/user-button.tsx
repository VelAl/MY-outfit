import Link from "next/link";
import { type Session } from "next-auth";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.actions";

const UserButton = async () => {
  const session = (await auth()) as Session; // component won`t be rendered if !session

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-secondary"
            >
              {session.user?.name?.charAt(0).toUpperCase() || "U"}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal border-b">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-md leading-none">
                {session.user?.name}
              </div>

              <div className="text-sm text-muted-foreground leading-none">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem className="p-0">
            <Link href={"/user/profile"} className="w-full p-2 hover:bg-muted">
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0">
            <Link href={"/user/orders"} className="w-full p-2 hover:bg-muted">
              Orders history
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0 my-2">
            <form action={signOutUser} className="w-full">
              <Button
                type="submit"
                variant="ghost"
                className="w-full py-4 px-2 h-4 justify-start"
              >
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default UserButton;
