import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ScodeType = "warning" | "info" | "success" | "destructive";
type ScodeSize = "sm" | "md" | "lg";

interface ScodeProps {
    type: ScodeType;
    size?: ScodeSize;
    children: React.ReactNode;
    className?: string;
}

const icons = {
    warning: AlertCircle,
    info: Info,
    success: CheckCircle2,
    destructive: XCircle,
};

const styles = {
    warning: "bg-ak-yellow/10 text-ak-yellow border-ak-yellow/30 hover:border-ak-yellow/60",
    info: "bg-ak-cyan/10 text-ak-cyan border-ak-cyan/30 hover:border-ak-cyan/60",
    success: "bg-green-500/10 text-green-500 border-green-500/30 hover:border-green-500/60",
    destructive: "bg-red-500/10 text-red-500 border-red-500/30 hover:border-red-500/60",
};

const sizeClasses = {
    sm: "text-xs p-3",
    md: "text-sm p-4",
    lg: "text-base p-5"
};

export default function Scode({ type = "info", size = "md", children, className }: ScodeProps) {
    const Icon = icons[type];

    return (
        <div className={cn(
            "relative flex items-start gap-3 border my-6 font-mono leading-relaxed transition-colors group",
            // Arknights style clip path
            "ak-clip-corner",
            styles[type],
            sizeClasses[size],
            className
        )}>
             {/* Decorative Corner Marker */}
             <div className="absolute top-0 right-0 p-1 opacity-50">
                <div className={cn("w-2 h-2 border-t border-r", 
                    type === 'warning' ? 'border-ak-yellow' :
                    type === 'info' ? 'border-ak-cyan' :
                    type === 'success' ? 'border-green-500' : 'border-red-500'
                )} />
             </div>

            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
                {children}
            </div>
        </div>
    );
}
