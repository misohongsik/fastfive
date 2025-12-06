export default function GlassCard({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`glass-panel rounded-2xl p-8 border border-white/10 backdrop-blur-md bg-white/5 shadow-2xl ${className}`}
        >
            {children}
        </div>
    );
}
