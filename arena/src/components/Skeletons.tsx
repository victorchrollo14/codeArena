import { Skeleton } from '@shadcn/skeleton';

export default function ProblemSkeleton() {
  return (
    <div className="max-h-fit space-y-6 overflow-scroll p-4">
      {/* Status and Runtime */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-6 w-24 bg-muted" />
        <Skeleton className="h-6 w-32 bg-muted" />
      </div>

      {/* Test Cases */}
      <div className="flex gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 bg-muted" />
        ))}
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-16 bg-muted" /> {/* "Input" label */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-full bg-muted" /> {/* nums array */}
          <Skeleton className="h-8 w-full bg-muted" /> {/* target value */}
        </div>
      </div>

      {/* Output Section */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-20 bg-muted" /> {/* "Output" label */}
        <Skeleton className="h-8 w-full bg-muted" />
      </div>
    </div>
  );
}
