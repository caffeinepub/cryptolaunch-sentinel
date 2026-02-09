import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { GLOSSARY_TERMS, type GlossaryTerm } from './glossaryData';

interface GlossaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GlossaryDialog({ open, onOpenChange }: GlossaryDialogProps) {
  const [search, setSearch] = useState('');

  const filteredTerms = GLOSSARY_TERMS.filter(
    (term) =>
      term.term.toLowerCase().includes(search.toLowerCase()) ||
      term.definition.toLowerCase().includes(search.toLowerCase())
  );

  const categoryColors: Record<GlossaryTerm['category'], string> = {
    blockchain: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    defi: 'bg-green-500/10 text-green-700 dark:text-green-400',
    nft: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
    security: 'bg-red-500/10 text-red-700 dark:text-red-400',
    general: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Web3 Glossary</DialogTitle>
          <DialogDescription>
            Learn key terms and concepts in blockchain and cryptocurrency
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {filteredTerms.map((term, index) => (
              <div key={index} className="space-y-2 rounded-lg border p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{term.term}</h3>
                  <Badge variant="outline" className={categoryColors[term.category]}>
                    {term.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{term.definition}</p>
              </div>
            ))}
            {filteredTerms.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">
                No terms found matching "{search}"
              </p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
