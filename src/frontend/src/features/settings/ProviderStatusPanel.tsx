import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const PROVIDERS = [
  { name: 'Dexscreener API', status: 'available', requiresSecret: false },
  { name: 'CoinGecko DEX API', status: 'available', requiresSecret: false },
  { name: 'Alchemy Notify API', status: 'backend', requiresSecret: true },
  { name: 'Moralis Streams API', status: 'backend', requiresSecret: true },
  { name: 'QuickNode', status: 'backend', requiresSecret: true },
  { name: 'Bitquery API', status: 'backend', requiresSecret: true },
  { name: 'CoinMarketCap API', status: 'backend', requiresSecret: true },
];

export default function ProviderStatusPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Providers</CardTitle>
        <CardDescription>
          Status of integrated blockchain data sources
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            API keys are configured at deployment time and never stored in your browser.
            Secret-required providers are accessed through secure backend endpoints.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          {PROVIDERS.map((provider) => (
            <div
              key={provider.name}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                {provider.status === 'available' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                )}
                <div>
                  <p className="text-sm font-medium">{provider.name}</p>
                  {provider.requiresSecret && (
                    <p className="text-xs text-muted-foreground">
                      Requires backend configuration
                    </p>
                  )}
                </div>
              </div>
              <Badge variant={provider.status === 'available' ? 'default' : 'secondary'}>
                {provider.status === 'available' ? 'Active' : 'Backend'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
