import { useLocation, Link } from '@tanstack/react-router';
import { Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MidnightWallet } from '@/modules/midnight';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/50 backdrop-blur-sm bg-background/95">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-lg">Private Buyer</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant={isActive('/') ? 'default' : 'ghost'}
              size="sm"
              asChild
              className="gap-2"
            >
              <Link to="/">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>

            <Button
              variant={isActive('/marketplace') ? 'default' : 'ghost'}
              size="sm"
              asChild
              className="gap-2"
            >
              <Link to="/marketplace">
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">Marketplace</span>
              </Link>
            </Button>

            <div className="ml-2">
              <MidnightWallet />
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      <footer className="border-t border-border/50 py-6 mt-auto">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Built on Midnight Network</p>
          <p className="text-sm text-muted-foreground">Edda Labs</p>
        </div>
      </footer>
    </div>
  );
}
