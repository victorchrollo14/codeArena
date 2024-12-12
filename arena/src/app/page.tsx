import Link from "next/link";
import { Code2 } from "lucide-react";
import CodeEditor from "@components/CodeEditorDemo";
import Features from "@components/Features";
import { Header } from "@components/Header";
import { Hero } from "@components/Hero";

export default function LandingPage() {
  return (
    <div className=" flex min-h-screen  flex-col bg-background  text-white">
      <Header />
      <Hero />
      <CodeEditor />
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
