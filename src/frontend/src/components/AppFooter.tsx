import { Heart } from 'lucide-react';

export default function AppFooter() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            © 2026. Built with{' '}
            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />{' '}
            using{' '}
            <a 
              href="https://caffeine.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
