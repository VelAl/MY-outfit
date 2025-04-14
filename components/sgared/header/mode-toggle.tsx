"use client";

import { MoonIcon, SunIcon, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { appThemes } from "@/lib/constants";
import { useIsComponentMounted } from "@/lib/hooks";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsComponentMounted();

  if (!isMounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {theme === "system" ? (
            <SunMoon />
          ) : theme === "dark" ? (
            <MoonIcon />
          ) : (
            <SunIcon />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {appThemes.map((variant) => (
          <DropdownMenuCheckboxItem
            key={variant}
            className="capitalize"
            checked={theme === variant}
            onClick={() => {
              setTheme(variant);
            }}
          >
            {variant}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ModeToggle;
