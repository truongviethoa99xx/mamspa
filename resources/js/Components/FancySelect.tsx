import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/Lib/utils';

export interface SelectOption {
    value: string;
    label: string;
    /** Nhãn rút gọn hiển thị trên nút đóng (vd. cờ + mã vùng); mặc định dùng `label`. */
    shortLabel?: string;
}

/** Dropdown tùy biến (kiểu Select2) — thay cho <select> native. Có ô tìm kiếm khi danh sách dài. */
export function FancySelect({
    value,
    onChange,
    options,
    placeholder,
    hasError,
    className,
    searchable,
    searchPlaceholder,
    emptyText,
    disabled,
}: {
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    hasError?: boolean;
    className?: string;
    searchable?: boolean;
    searchPlaceholder?: string;
    emptyText?: string;
    disabled?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const close = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, []);

    useEffect(() => {
        if (!open) setQuery('');
    }, [open]);

    const selected = options.find((o) => o.value === value);
    const normalizedQuery = query.trim().toLowerCase();
    const filteredOptions = searchable && normalizedQuery
        ? options.filter((o) => o.label.toLowerCase().includes(normalizedQuery))
        : options;

    return (
        <div ref={ref} className={cn('relative', className)}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((c) => !c)}
                className={cn(
                    'flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 py-3 text-left text-sm text-ink transition-colors sm:px-4 sm:py-3.5 sm:text-base',
                    open ? 'border-maha-500 ring-2 ring-maha-500/10' : 'border-maha-200',
                    hasError && !value && 'border-red-400 ring-2 ring-red-100',
                    disabled && 'cursor-not-allowed opacity-60',
                )}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className={cn('truncate', !selected && 'text-maha-400')}>
                    {(selected?.shortLabel ?? selected?.label) ?? placeholder}
                </span>
                <ChevronDown className={cn('h-4 w-4 shrink-0 text-ink/60 transition-transform', open && 'rotate-180')} />
            </button>

            {open && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.4rem)] z-30 min-w-max overflow-hidden rounded-xl border border-maha-200 bg-white shadow-2xl shadow-maha-900/10">
                    {searchable && (
                        <div className="relative border-b border-maha-100">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-maha-500" />
                            <input
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="w-full bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none placeholder:text-maha-400"
                            />
                        </div>
                    )}
                    <div role="listbox" className="max-h-64 overflow-y-auto py-1.5">
                        {filteredOptions.length === 0 ? (
                            <p className="px-4 py-2.5 text-sm text-maha-500">{emptyText}</p>
                        ) : (
                            filteredOptions.map((o) => {
                                const active = o.value === value;
                                return (
                                    <button
                                        key={o.value}
                                        type="button"
                                        role="option"
                                        aria-selected={active}
                                        onClick={() => {
                                            onChange(o.value);
                                            setOpen(false);
                                        }}
                                        className={cn(
                                            'flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-maha-50 sm:text-base',
                                            active && 'bg-[#E9E2D5] font-semibold text-ink',
                                        )}
                                    >
                                        <span className="truncate">{o.label}</span>
                                        {active && <Check className="h-4 w-4 shrink-0 text-[#556B3F]" />}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
