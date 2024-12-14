"use client";

import { useState } from "react";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shadcn/card";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "@hooks/use-toast";
import { Toaster } from "@shadcn/toaster";
import { cn } from "lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setPending(true);
      const res = await signIn("credentials", {
        username: email,
        password: password,
        redirect: false,
      });

      setPending(false);
      console.log(res);
      console.log(res?.status);
      if (res?.status === 401) {
        return toast({
          title: "wrong password or username! try again",
          variant: "destructive",
        });
      }
      toast({ title: "logged in successfully", variant: "default" });
      setTimeout(() => router.push("/"), 1000);
    } catch (error: any) {
      console.log(error);
      setPending(false);
      toast({ title: "internal server error", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login to your account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details below to login to your account and start coding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className={cn("w-full")}>
              {pending && <Loader2 className="animate-spin" />}
              login
            </Button>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => console.log("GitHub login")}
          >
            <FaGithub className="mr-2 h-4 w-4" />
            Github
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Dont have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              register
            </Link>
          </p>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
}
