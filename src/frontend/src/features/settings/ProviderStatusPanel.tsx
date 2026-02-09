import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, XCircle, Info, AlertCircle } from 'lucide-react';
import { useGetAvailableDataProviders } from '../../hooks/useQueries';

// Known provider names for display
const PROVIDER_DISPLAY_NAMES: Record<string, string> = {
  'alchemy': 'Alchemy Notify API',
  'moralis': 'Moralis Streams API',
  'quicknode': 'QuickNode',
  'bitquery': 'Bitquery API',
  'coinmarketcap': 'CoinMarketCap API',
  'dexscreener': 'Dexscreener API',
  'coingecko': 'CoinGecko DEX API',
};

export default function ProviderStatusPanel() {
  const { data: configuredProviders = [], isLoading, error } = useGetAvailableDataProviders();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Data Providers</CardTitle>
          <CardDescription>
            Status of integrated blockchain data sources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Data Providers</CardTitle>
          <CardDescription>
            Status of integrated blockchain data sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Unable to load provider status. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const hasConfiguredProviders = configuredProviders.length > 0;

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

        {!hasConfiguredProviders && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              No data providers are currently configured. Live project data is unavailable.
              Contact your administrator to configure data providers.
            </AlertDescription>
          </Alert>
        )}

        {hasConfiguredProviders && (
          <div className="space-y-2">
            {configuredProviders.map((providerId) => {
              const displayName = PROVIDER_DISPLAY_NAMES[providerId] || providerId;
              
              return (
                <div
                  key={providerId}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">{displayName}</p>
                      <p className="text-xs text-muted-foreground">
                        Configured and ready
                      </p>
                    </div>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
              );
            })}
          </div>
        )}

        {/* Show common providers that need configuration */}
        {hasConfiguredProviders && (
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">
              Additional providers available for configuration:
            </p>
            <div className="space-y-2">
              {Object.entries(PROVIDER_DISPLAY_NAMES)
                .filter(([id]) => !configuredProviders.includes(id))
                .slice(0, 3)
                .map(([id, name]) => (
                  <div
                    key={id}
                    className="flex items-center justify-between rounded-lg border border-dashed p-3 opacity-60"
                  >
                    <div className="flex items-center gap-3">
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">
                          Needs configuration
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">Not configured</Badge>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
