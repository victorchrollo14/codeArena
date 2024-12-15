"use client";

import { useState } from "react";
import Link from "next/link";
import { Code2, Menu, X } from "lucide-react";
import { Button } from "@shadcn/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@shadcn/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const navItems = [
  { href: "#problems", label: "Problems" },
  { href: "#contests", label: "Contests" },
  { href: "#leaderboard", label: "Leaderboard" },
  { href: "#premium", label: "Premium" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const session = useSession();

  return (
    <header className="px-5 sticky top-0 z-50  border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">
            <span className="text-foreground">code</span>
            <span className="text-primary">Arena</span>
          </h1>
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  href={item.href}
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        {session.status === "authenticated" ? (
          <div className="flex items-center gap-4">
            <Button
              className=""
              variant={"destructive"}
              onClick={() => signOut()}
            >
              Logout
            </Button>
            <Avatar className="h-7 w-7 ">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="rounded-full"
              />
              <AvatarFallback>
                {session.data.user?.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button className="hidden md:inline-flex" asChild>
              <Link href="/auth/register">Sign up</Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {session.status === "authenticated" ? (
              <div className="rounded-full bg-primary text-primary-foreground">
                {session.data.user?.name?.charAt(0)}
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Sign up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
