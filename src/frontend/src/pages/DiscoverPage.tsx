import NewProjectsFeed from '../features/discover/NewProjectsFeed';

export default function DiscoverPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Discover New Projects</h1>
          <p className="mt-2 text-muted-foreground">
            Real-time feed of new token launches and projects on your selected blockchain
          </p>
        </div>
        <NewProjectsFeed />
      </div>
    </div>
  );
}
