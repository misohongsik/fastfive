interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    padding?: 'small' | 'medium' | 'large' | 'none';
}

export default function Section({
    children,
    className = '',
    id,
    padding = 'medium',
}: SectionProps) {
    const paddingClass = {
        small: 'py-20 md:py-32',
        medium: 'py-32 md:py-48',
        large: 'py-40 md:py-64',
        none: '',
    }[padding];

    return (
        <section id={id} className={`relative w-full px-4 md:px-8 ${paddingClass} ${className}`}>
            {children}
        </section>
    );
}
