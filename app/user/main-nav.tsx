"use client";

import { HTMLAttributes } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { title: "Profile", href: "/user/profile" },
  { title: "Orders", href: "/user/orders" },
] as const;

function MainNav({ className, ...rest }: HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...rest}
    >
      {links.map(({ href, title }) => (
        <Link
          key={title}
          href={href}
          className={cn(
            "text-sm font-medium transition-colors underline pointer-events-none",
            !pathName.includes(href) &&
              "text-muted-foreground hover:text-primary no-underline pointer-events-auto"
          )}
        >
          {title}
        </Link>
      ))}
    </nav>
  );
}
export default MainNav;
