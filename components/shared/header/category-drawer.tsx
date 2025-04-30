import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button"; 
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getAllCategories } from "@/lib/actions/product.actions";

const CategoryDrawer = async () => {
  const categories = await getAllCategories();

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <MenuIcon />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="max-w-sm">
        <DrawerHeader>
          <DrawerTitle className="border-b">Select a category</DrawerTitle>
        </DrawerHeader>

        <div>
          {categories.map(({ category, _count }) => (
            <Button
              variant="ghost"
              key={category}
              className="w-full justify-start pl-8"
              asChild
            >
              <DrawerClose asChild >
                <Link href={`/search?category=${category}`}>
                  {category}
                  <b>( {_count} )</b>
                </Link>
              </DrawerClose>
            </Button>
          ))}
        </div>
      </DrawerContent>

      <DrawerDescription></DrawerDescription>
    </Drawer>
  );
};
export default CategoryDrawer;
