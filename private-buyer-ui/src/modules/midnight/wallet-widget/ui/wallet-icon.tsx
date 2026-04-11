import { Tooltip, TooltipContent, TooltipTrigger } from './common/tooltip';

interface WalletIconProps {
  iconReactNode?: React.ReactNode;
  name: string;
  action: () => void;
}

export default function WalletIcon({ iconReactNode, name, action }: WalletIconProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={action}
          className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-all cursor-pointer"
        >
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-muted">
            {iconReactNode}
          </div>
          <span className="text-xs font-medium">{name}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Connect {name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
