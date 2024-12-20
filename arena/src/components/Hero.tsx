import Link from 'next/link';
import { Button } from '@shadcn/button';
import { GradientText } from './GradientText';

export function Hero() {
  return (
    <section className="flex h-[91vh] w-full items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-8xl">
              Solve Problems. <GradientText>Master Code.</GradientText>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
              Join thousands of developers competing, learning, and climbing the
              ranks in the ultimate coding arena.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/problems">Start Solving Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <Link href="#learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
