import LessonList from '../features/learn/LessonList';

export default function LearnPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learn Web3</h1>
          <p className="mt-2 text-muted-foreground">
            Daily lessons covering blockchain fundamentals, DeFi, NFTs, and security best practices
          </p>
        </div>
        <LessonList />
      </div>
    </div>
  );
}
