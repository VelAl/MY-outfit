import Link from "next/link";
import { EllipsisVertical, ShoppingCartIcon, UserIcon } from "lucide-react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ModeToggle from "./mode-toggle";
import UserButton from "./user-button";

const NavContent = async () => {
  const session = await auth();

  return (
    <>
      <ModeToggle />
      <Button asChild variant="ghost" className="ml-4">
        <Link href={"/cart"}>
          <ShoppingCartIcon /> Cart
        </Link>
      </Button>

      {!session ? (
        <Button asChild>
          <Link href={"/sign-in"}>
            <UserIcon /> Sign In
          </Link>
        </Button>
      ) : (
        <UserButton />
      )}
    </>
  );
};

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap1">
        <NavContent />
      </nav>

      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle cursor-pointer">
            <EllipsisVertical />
          </SheetTrigger>

          <SheetContent className="flex flex-col items-start p-8">
            <SheetTitle>Menu</SheetTitle>

            <NavContent />

            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};
export default Menu;
