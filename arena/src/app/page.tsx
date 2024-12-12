import Link from "next/link";
import { Button } from "@shadcn/button";
import { Code2 } from "lucide-react";
import CodeEditor from "@components/CodeEditorDemo";
import Features from "@components/Features";

export default function LandingPage() {
  return (
    <div className="mx-5 flex min-h-screen  flex-col bg-background  text-white">
      {/* Header */}
      <header className=" flex items-center justify-between p-4 bg-background text-white">
        {/* Logo Section */}
        <div className="flex items-center">
          <Code2 className="mr-2" />
          <h1 className="text-2xl font-bold">
            <span className="text-white">code</span>
            <span className="text-primary">Arena</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link
            href="#problems"
            className="hover:text-primary transition-colors"
          >
            Problems
          </Link>
          <Link
            href="#contests"
            className="hover:text-primary transition-colors"
          >
            Contests
          </Link>
          <Link
            href="#leaderboard"
            className="hover:text-primary transition-colors"
          >
            Leaderboard
          </Link>
          <Link
            href="#premium"
            className="hover:text-primary transition-colors"
          >
            Premium
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-transparent hover:text-primary"
          >
            Sign in
          </Button>
          <Button className="bg-primary text-primary-foreground rounded-full hover:bg-primary/80">
            Sign up
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 ">
        <div className="min-h-[90vh] grid gap-8 ">
          <div className="mt-24 mb-8 flex flex-col items-center justify-center text-center px-4 bg-background]">
            <div className="">
              <p className="text-lg md:text-xl text-gray-400 mb-6">
                Join thousands of developers competing, learning, and climbing
                the ranks in the ultimate coding arena.
              </p>

              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-8">
                Master Code.
                <span
                  className="bg-gradient-to-r from-pink-500 to-blue-500 
            text-transparent bg-clip-text"
                >
                  Win Battles.
                </span>
              </h1>

              <Button
                className="bg-primary text-primary-foreground px-8 py-6 text-lg rounded-full 
          hover:bg-primary/80 transition-colors duration-300 "
              >
                Start Solving Now
              </Button>
            </div>
          </div>{" "}
          <CodeEditor />
        </div>
      </main>
      <section>
        <Features />
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-900/50">
        <div className="container px-4 py-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link className="flex items-center gap-2 font-semibold" href="#">
                <Code2 className="h-6 w-6" />
                <span className="text-xl">CodeArena</span>
              </Link>
              <p className="mt-4 text-sm text-gray-400">
                The ultimate platform for competitive programming and coding
                challenges.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Product</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#">Problems</Link>
                </li>
                <li>
                  <Link href="#">Contests</Link>
                </li>
                <li>
                  <Link href="#">Leaderboard</Link>
                </li>
                <li>
                  <Link href="#">Premium</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Company</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#">About</Link>
                </li>
                <li>
                  <Link href="#">Careers</Link>
                </li>
                <li>
                  <Link href="#">Blog</Link>
                </li>
                <li>
                  <Link href="#">Legal</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Connect</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#">GitHub</Link>
                </li>
                <li>
                  <Link href="#">Discord</Link>
                </li>
                <li>
                  <Link href="#">Twitter</Link>
                </li>
                <li>
                  <Link href="#">LinkedIn</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-purple-900/50 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} CodeArena. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
