import { ArrowRight, Binary, Book, Code2, Trophy, Users } from "lucide-react";
import { Card, CardContent } from "@shadcn/card";
import Link from "next/link";

export default function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            <span className="text-secondary">Everything</span> You Need
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            All In One Spot - CodeArena is trusted by thousands of developers to
            practice and improve their coding skills.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 mt-12">
          <Link href="#problems">
            <Card className="relative group h-56 overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg">
              <CardContent className="p-0 flex flex-col gap-2">
                <Book className="h-12 w-12 text-primary" />
                <h3 className="font-bold text-xl">Problem Bank</h3>
                <p className="text-sm text-muted-foreground">
                  Over 2000 coding challenges across different difficulty levels
                  and topics
                </p>
                <ArrowRight className="h-4 w-4 absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </Link>
          <Link href="#practice">
            <Card className="relative group overflow-hidden h-56  rounded-lg border bg-background p-6 transition-all hover:shadow-lg">
              <CardContent className="p-0 flex flex-col gap-2">
                <Code2 className="h-12 w-12 text-primary" />
                <h3 className="font-bold text-xl">Online IDE</h3>
                <p className="text-sm text-muted-foreground">
                  Write, run, and debug code in 20+ programming languages with
                  our powerful editor
                </p>
                <ArrowRight className="h-4 w-4 absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </Link>
          <Link href="#compete">
            <Card className="relative group overflow-hidden h-56 rounded-lg border bg-background p-6 transition-all hover:shadow-lg">
              <CardContent className="p-0 flex flex-col gap-2">
                <Trophy className="h-12 w-12 text-primary" />
                <h3 className="font-bold text-xl">Competitions</h3>
                <p className="text-sm text-muted-foreground">
                  Participate in weekly contests and climb the global
                  leaderboard
                </p>
                <ArrowRight className="h-4 w-4 absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </Link>
          <Link href="#learn">
            <Card className="relative group overflow-hidden h-56 rounded-lg border bg-background p-6 transition-all hover:shadow-lg">
              <CardContent className="p-0 flex flex-col gap-2">
                <Binary className="h-12 w-12 text-primary" />
                <h3 className="font-bold text-xl">Learning Paths</h3>
                <p className="text-sm text-muted-foreground">
                  Structured courses to master data structures, algorithms, and
                  system design
                </p>
                <ArrowRight className="h-4 w-4 absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </Link>
          <Link href="#community">
            <Card className="relative group overflow-hidden h-56 rounded-lg border bg-background p-6 transition-all hover:shadow-lg">
              <CardContent className="p-0 flex flex-col gap-2">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="font-bold text-xl">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with fellow coders, share solutions, and learn from
                  discussions
                </p>
                <ArrowRight className="h-4 w-4 absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}
