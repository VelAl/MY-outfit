"use client";
import Link from "next/link";
import { Eye } from "lucide-react";

export const ViewItemLink = ({ href }: { href: string }) => (
  <Link href={href}>
    <div className="p-2 rounded hover:bg-muted transition">
      <Eye className="text-primary transition-transform duration-200 hover:scale-120" />
    </div>
  </Link>
);
