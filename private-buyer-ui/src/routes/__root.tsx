import { createRootRoute, Outlet } from '@tanstack/react-router';
import { pino } from 'pino';
import { ThemeProvider } from '@/components/theme-provider';
import { MidnightMeshProvider } from '@/modules/midnight';
import { NFTAppProvider } from '@/modules/midnight/nft-sdk/contexts';
import { MainLayout } from '@/layouts/layout';

const logger = pino({ level: 'trace', browser: { asObject: true } });

export const Route = createRootRoute({
  component: () => {
    return (
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <MidnightMeshProvider>
          <NFTAppProvider logger={logger}>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </NFTAppProvider>
        </MidnightMeshProvider>
      </ThemeProvider>
    );
  },
});
