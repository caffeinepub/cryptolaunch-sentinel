import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { useChain, SUPPORTED_CHAINS } from '../state/chain';
import { cn } from '@/lib/utils';
import { recordAnalyticsEvent } from '../features/analytics/analyticsEvents';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function ChainSelector() {
  const [open, setOpen] = useState(false);
  const { selectedChain, setSelectedChain } = useChain();

  const handleSelect = (chainId: string) => {
    const chain = SUPPORTED_CHAINS.find(c => c.id === chainId);
    if (chain) {
      setSelectedChain(chain);
      recordAnalyticsEvent('chainSelection');
    }
    setOpen(false);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[180px] justify-between"
            >
              <span className="truncate">{selectedChain.name}</span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search blockchain..." />
              <CommandList>
                <CommandEmpty>No blockchain found.</CommandEmpty>
                <CommandGroup>
                  {SUPPORTED_CHAINS.map((chain) => (
                    <CommandItem
                      key={chain.id}
                      value={chain.id}
                      onSelect={handleSelect}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedChain.id === chain.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {chain.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </TooltipTrigger>
      <TooltipContent>
        <p>Select which blockchain to monitor for new projects</p>
      </TooltipContent>
    </Tooltip>
  );
}
