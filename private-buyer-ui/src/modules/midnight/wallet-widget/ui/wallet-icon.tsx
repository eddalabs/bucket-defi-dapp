interface WalletIconProps {
  iconReactNode?: React.ReactNode;
  name: string;
  action: () => void;
}

export default function WalletIcon({ iconReactNode, name, action }: WalletIconProps) {
  return (
    <button
      onClick={action}
      className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
    >
      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-muted">
        {iconReactNode}
      </div>
      <span className="text-xs font-medium">{name}</span>
    </button>
  );
}
