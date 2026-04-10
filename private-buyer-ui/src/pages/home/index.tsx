import { Link } from '@tanstack/react-router';
import { ShoppingBag, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Private Buyer NFT Marketplace</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A privacy-preserving NFT marketplace built on Midnight Network with zero-knowledge proof ownership.
        </p>
        <div className="pt-4">
          <Button size="lg" asChild>
            <Link to="/marketplace">Go to Marketplace</Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="text-center space-y-2 border border-border rounded-lg p-6">
          <div className="flex justify-center">
            <ShoppingBag className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold">Mint & Trade NFTs</h3>
          <p className="text-sm text-muted-foreground">
            Create NFT certificates with metadata, list them for sale, and set prices.
          </p>
        </div>
        <div className="text-center space-y-2 border border-border rounded-lg p-6">
          <div className="flex justify-center">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold">Private Ownership</h3>
          <p className="text-sm text-muted-foreground">
            Buyers receive ZK commitment-based ownership that preserves privacy on-chain.
          </p>
        </div>
        <div className="text-center space-y-2 border border-border rounded-lg p-6">
          <div className="flex justify-center">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold">On Midnight Network</h3>
          <p className="text-sm text-muted-foreground">
            Built with Compact smart contracts and zero-knowledge proofs.
          </p>
        </div>
      </section>
    </div>
  );
}
