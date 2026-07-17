import { cn } from '@/Lib/utils';

interface SectionHeadingProps {
    /** Nhãn nhỏ (kicker) phía trên tiêu đề lớn — chỉ Our Philosophy / Our People dùng. */
    label?: string;
    heading: string;
    size?: 'md' | 'lg';
    align?: 'left' | 'center';
    className?: string;
}

/** Khối "nhãn nhỏ · tiêu đề" lặp lại ở đầu mỗi section trang Giới thiệu. */
export function SectionHeading({ label, heading, size = 'md', align = 'left', className }: SectionHeadingProps) {
    return (
        <div className={cn('space-y-2', align === 'center' && 'text-center', className)}>
            {label && <span className="block font-serif text-sm uppercase tracking-[0.2em] text-subheading">{label}</span>}
            <h2
                className={cn(
                    'rich-content font-serif leading-tight text-heading',
                    size === 'lg' ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-3xl sm:text-4xl',
                )}
                dangerouslySetInnerHTML={{ __html: heading }}
            />
        </div>
    );
}
