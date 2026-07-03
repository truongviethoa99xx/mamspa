import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Minus, Plus, Search, X } from 'lucide-react';
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isBefore,
    isSameDay,
    isSameMonth,
    parseISO,
    startOfDay,
    startOfMonth,
    startOfWeek,
    subMonths,
} from 'date-fns';
import { useLocale } from '@/Hooks/useLocale';
import { cn, tr } from '@/Lib/utils';
import type { SharedProps } from '@/types';

interface BranchOption {
    id: number;
    slug: string;
    name: unknown;
}

interface ServiceOption {
    id: number;
    slug: string;
    name: unknown;
    duration: number;
    branch_ids: number[];
}

interface GuestService {
    gender: 'male' | 'female';
    serviceIds: string[];
}

/** Toàn bộ mã vùng điện thoại quốc tế (ITU-T E.164), Việt Nam đứng đầu vì là mặc định. */
const COUNTRY_CODES = [
    { code: '+84', flag: '🇻🇳', name: 'Việt Nam' },
    { code: '+93', flag: '🇦🇫', name: 'Afghanistan' },
    { code: '+355', flag: '🇦🇱', name: 'Albania' },
    { code: '+213', flag: '🇩🇿', name: 'Algeria' },
    { code: '+1684', flag: '🇦🇸', name: 'American Samoa' },
    { code: '+376', flag: '🇦🇩', name: 'Andorra' },
    { code: '+244', flag: '🇦🇴', name: 'Angola' },
    { code: '+1264', flag: '🇦🇮', name: 'Anguilla' },
    { code: '+1268', flag: '🇦🇬', name: 'Antigua and Barbuda' },
    { code: '+54', flag: '🇦🇷', name: 'Argentina' },
    { code: '+374', flag: '🇦🇲', name: 'Armenia' },
    { code: '+297', flag: '🇦🇼', name: 'Aruba' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+43', flag: '🇦🇹', name: 'Austria' },
    { code: '+994', flag: '🇦🇿', name: 'Azerbaijan' },
    { code: '+1242', flag: '🇧🇸', name: 'Bahamas' },
    { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
    { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
    { code: '+1246', flag: '🇧🇧', name: 'Barbados' },
    { code: '+375', flag: '🇧🇾', name: 'Belarus' },
    { code: '+32', flag: '🇧🇪', name: 'Belgium' },
    { code: '+501', flag: '🇧🇿', name: 'Belize' },
    { code: '+229', flag: '🇧🇯', name: 'Benin' },
    { code: '+1441', flag: '🇧🇲', name: 'Bermuda' },
    { code: '+975', flag: '🇧🇹', name: 'Bhutan' },
    { code: '+591', flag: '🇧🇴', name: 'Bolivia' },
    { code: '+387', flag: '🇧🇦', name: 'Bosnia and Herzegovina' },
    { code: '+267', flag: '🇧🇼', name: 'Botswana' },
    { code: '+55', flag: '🇧🇷', name: 'Brazil' },
    { code: '+246', flag: '🇮🇴', name: 'British Indian Ocean Territory' },
    { code: '+673', flag: '🇧🇳', name: 'Brunei' },
    { code: '+359', flag: '🇧🇬', name: 'Bulgaria' },
    { code: '+226', flag: '🇧🇫', name: 'Burkina Faso' },
    { code: '+257', flag: '🇧🇮', name: 'Burundi' },
    { code: '+238', flag: '🇨🇻', name: 'Cabo Verde' },
    { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
    { code: '+237', flag: '🇨🇲', name: 'Cameroon' },
    { code: '+1', flag: '🇨🇦', name: 'Canada' },
    { code: '+236', flag: '🇨🇫', name: 'Central African Republic' },
    { code: '+235', flag: '🇹🇩', name: 'Chad' },
    { code: '+56', flag: '🇨🇱', name: 'Chile' },
    { code: '+86', flag: '🇨🇳', name: 'China' },
    { code: '+57', flag: '🇨🇴', name: 'Colombia' },
    { code: '+269', flag: '🇰🇲', name: 'Comoros' },
    { code: '+243', flag: '🇨🇩', name: 'Congo (DRC)' },
    { code: '+242', flag: '🇨🇬', name: 'Congo (Republic)' },
    { code: '+682', flag: '🇨🇰', name: 'Cook Islands' },
    { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
    { code: '+225', flag: '🇨🇮', name: "Côte d'Ivoire" },
    { code: '+385', flag: '🇭🇷', name: 'Croatia' },
    { code: '+53', flag: '🇨🇺', name: 'Cuba' },
    { code: '+357', flag: '🇨🇾', name: 'Cyprus' },
    { code: '+420', flag: '🇨🇿', name: 'Czechia' },
    { code: '+45', flag: '🇩🇰', name: 'Denmark' },
    { code: '+253', flag: '🇩🇯', name: 'Djibouti' },
    { code: '+1767', flag: '🇩🇲', name: 'Dominica' },
    { code: '+1809', flag: '🇩🇴', name: 'Dominican Republic' },
    { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
    { code: '+20', flag: '🇪🇬', name: 'Egypt' },
    { code: '+503', flag: '🇸🇻', name: 'El Salvador' },
    { code: '+240', flag: '🇬🇶', name: 'Equatorial Guinea' },
    { code: '+291', flag: '🇪🇷', name: 'Eritrea' },
    { code: '+372', flag: '🇪🇪', name: 'Estonia' },
    { code: '+268', flag: '🇸🇿', name: 'Eswatini' },
    { code: '+251', flag: '🇪🇹', name: 'Ethiopia' },
    { code: '+679', flag: '🇫🇯', name: 'Fiji' },
    { code: '+358', flag: '🇫🇮', name: 'Finland' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+241', flag: '🇬🇦', name: 'Gabon' },
    { code: '+220', flag: '🇬🇲', name: 'Gambia' },
    { code: '+995', flag: '🇬🇪', name: 'Georgia' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+233', flag: '🇬🇭', name: 'Ghana' },
    { code: '+350', flag: '🇬🇮', name: 'Gibraltar' },
    { code: '+30', flag: '🇬🇷', name: 'Greece' },
    { code: '+299', flag: '🇬🇱', name: 'Greenland' },
    { code: '+1473', flag: '🇬🇩', name: 'Grenada' },
    { code: '+1671', flag: '🇬🇺', name: 'Guam' },
    { code: '+502', flag: '🇬🇹', name: 'Guatemala' },
    { code: '+224', flag: '🇬🇳', name: 'Guinea' },
    { code: '+245', flag: '🇬🇼', name: 'Guinea-Bissau' },
    { code: '+592', flag: '🇬🇾', name: 'Guyana' },
    { code: '+509', flag: '🇭🇹', name: 'Haiti' },
    { code: '+504', flag: '🇭🇳', name: 'Honduras' },
    { code: '+852', flag: '🇭🇰', name: 'Hong Kong' },
    { code: '+36', flag: '🇭🇺', name: 'Hungary' },
    { code: '+354', flag: '🇮🇸', name: 'Iceland' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
    { code: '+98', flag: '🇮🇷', name: 'Iran' },
    { code: '+964', flag: '🇮🇶', name: 'Iraq' },
    { code: '+353', flag: '🇮🇪', name: 'Ireland' },
    { code: '+972', flag: '🇮🇱', name: 'Israel' },
    { code: '+39', flag: '🇮🇹', name: 'Italy' },
    { code: '+1876', flag: '🇯🇲', name: 'Jamaica' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: '+962', flag: '🇯🇴', name: 'Jordan' },
    { code: '+7', flag: '🇰🇿', name: 'Kazakhstan' },
    { code: '+254', flag: '🇰🇪', name: 'Kenya' },
    { code: '+686', flag: '🇰🇮', name: 'Kiribati' },
    { code: '+850', flag: '🇰🇵', name: 'Korea (North)' },
    { code: '+82', flag: '🇰🇷', name: 'Korea (South)' },
    { code: '+383', flag: '🇽🇰', name: 'Kosovo' },
    { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
    { code: '+996', flag: '🇰🇬', name: 'Kyrgyzstan' },
    { code: '+856', flag: '🇱🇦', name: 'Laos' },
    { code: '+371', flag: '🇱🇻', name: 'Latvia' },
    { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
    { code: '+266', flag: '🇱🇸', name: 'Lesotho' },
    { code: '+231', flag: '🇱🇷', name: 'Liberia' },
    { code: '+218', flag: '🇱🇾', name: 'Libya' },
    { code: '+423', flag: '🇱🇮', name: 'Liechtenstein' },
    { code: '+370', flag: '🇱🇹', name: 'Lithuania' },
    { code: '+352', flag: '🇱🇺', name: 'Luxembourg' },
    { code: '+853', flag: '🇲🇴', name: 'Macao' },
    { code: '+261', flag: '🇲🇬', name: 'Madagascar' },
    { code: '+265', flag: '🇲🇼', name: 'Malawi' },
    { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
    { code: '+960', flag: '🇲🇻', name: 'Maldives' },
    { code: '+223', flag: '🇲🇱', name: 'Mali' },
    { code: '+356', flag: '🇲🇹', name: 'Malta' },
    { code: '+692', flag: '🇲🇭', name: 'Marshall Islands' },
    { code: '+222', flag: '🇲🇷', name: 'Mauritania' },
    { code: '+230', flag: '🇲🇺', name: 'Mauritius' },
    { code: '+52', flag: '🇲🇽', name: 'Mexico' },
    { code: '+691', flag: '🇫🇲', name: 'Micronesia' },
    { code: '+373', flag: '🇲🇩', name: 'Moldova' },
    { code: '+377', flag: '🇲🇨', name: 'Monaco' },
    { code: '+976', flag: '🇲🇳', name: 'Mongolia' },
    { code: '+382', flag: '🇲🇪', name: 'Montenegro' },
    { code: '+212', flag: '🇲🇦', name: 'Morocco' },
    { code: '+258', flag: '🇲🇿', name: 'Mozambique' },
    { code: '+95', flag: '🇲🇲', name: 'Myanmar' },
    { code: '+264', flag: '🇳🇦', name: 'Namibia' },
    { code: '+674', flag: '🇳🇷', name: 'Nauru' },
    { code: '+977', flag: '🇳🇵', name: 'Nepal' },
    { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
    { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
    { code: '+505', flag: '🇳🇮', name: 'Nicaragua' },
    { code: '+227', flag: '🇳🇪', name: 'Niger' },
    { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
    { code: '+389', flag: '🇲🇰', name: 'North Macedonia' },
    { code: '+47', flag: '🇳🇴', name: 'Norway' },
    { code: '+968', flag: '🇴🇲', name: 'Oman' },
    { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
    { code: '+680', flag: '🇵🇼', name: 'Palau' },
    { code: '+970', flag: '🇵🇸', name: 'Palestine' },
    { code: '+507', flag: '🇵🇦', name: 'Panama' },
    { code: '+675', flag: '🇵🇬', name: 'Papua New Guinea' },
    { code: '+595', flag: '🇵🇾', name: 'Paraguay' },
    { code: '+51', flag: '🇵🇪', name: 'Peru' },
    { code: '+63', flag: '🇵🇭', name: 'Philippines' },
    { code: '+48', flag: '🇵🇱', name: 'Poland' },
    { code: '+351', flag: '🇵🇹', name: 'Portugal' },
    { code: '+1787', flag: '🇵🇷', name: 'Puerto Rico' },
    { code: '+974', flag: '🇶🇦', name: 'Qatar' },
    { code: '+40', flag: '🇷🇴', name: 'Romania' },
    { code: '+7', flag: '🇷🇺', name: 'Russia' },
    { code: '+250', flag: '🇷🇼', name: 'Rwanda' },
    { code: '+1869', flag: '🇰🇳', name: 'Saint Kitts and Nevis' },
    { code: '+1758', flag: '🇱🇨', name: 'Saint Lucia' },
    { code: '+1784', flag: '🇻🇨', name: 'Saint Vincent and the Grenadines' },
    { code: '+685', flag: '🇼🇸', name: 'Samoa' },
    { code: '+378', flag: '🇸🇲', name: 'San Marino' },
    { code: '+239', flag: '🇸🇹', name: 'São Tomé and Príncipe' },
    { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+221', flag: '🇸🇳', name: 'Senegal' },
    { code: '+381', flag: '🇷🇸', name: 'Serbia' },
    { code: '+248', flag: '🇸🇨', name: 'Seychelles' },
    { code: '+232', flag: '🇸🇱', name: 'Sierra Leone' },
    { code: '+65', flag: '🇸🇬', name: 'Singapore' },
    { code: '+421', flag: '🇸🇰', name: 'Slovakia' },
    { code: '+386', flag: '🇸🇮', name: 'Slovenia' },
    { code: '+677', flag: '🇸🇧', name: 'Solomon Islands' },
    { code: '+252', flag: '🇸🇴', name: 'Somalia' },
    { code: '+27', flag: '🇿🇦', name: 'South Africa' },
    { code: '+211', flag: '🇸🇸', name: 'South Sudan' },
    { code: '+34', flag: '🇪🇸', name: 'Spain' },
    { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
    { code: '+249', flag: '🇸🇩', name: 'Sudan' },
    { code: '+597', flag: '🇸🇷', name: 'Suriname' },
    { code: '+46', flag: '🇸🇪', name: 'Sweden' },
    { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
    { code: '+963', flag: '🇸🇾', name: 'Syria' },
    { code: '+886', flag: '🇹🇼', name: 'Taiwan' },
    { code: '+992', flag: '🇹🇯', name: 'Tajikistan' },
    { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
    { code: '+66', flag: '🇹🇭', name: 'Thailand' },
    { code: '+670', flag: '🇹🇱', name: 'Timor-Leste' },
    { code: '+228', flag: '🇹🇬', name: 'Togo' },
    { code: '+676', flag: '🇹🇴', name: 'Tonga' },
    { code: '+1868', flag: '🇹🇹', name: 'Trinidad and Tobago' },
    { code: '+216', flag: '🇹🇳', name: 'Tunisia' },
    { code: '+90', flag: '🇹🇷', name: 'Turkey' },
    { code: '+993', flag: '🇹🇲', name: 'Turkmenistan' },
    { code: '+688', flag: '🇹🇻', name: 'Tuvalu' },
    { code: '+256', flag: '🇺🇬', name: 'Uganda' },
    { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
    { code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: '+598', flag: '🇺🇾', name: 'Uruguay' },
    { code: '+998', flag: '🇺🇿', name: 'Uzbekistan' },
    { code: '+678', flag: '🇻🇺', name: 'Vanuatu' },
    { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
    { code: '+967', flag: '🇾🇪', name: 'Yemen' },
    { code: '+260', flag: '🇿🇲', name: 'Zambia' },
    { code: '+263', flag: '🇿🇼', name: 'Zimbabwe' },
];
const CHANNELS = ['Zalo', 'WhatsApp', 'Messenger', 'Telegram'];

const labelCls = 'mb-2 block text-sm font-bold text-subheading';
const fieldCls =
    'w-full rounded-lg border border-maha-200 bg-white px-3 py-3 text-sm text-ink placeholder-maha-400 transition-colors focus:border-maha-500 focus:outline-none sm:px-4 sm:py-3.5 sm:text-base';

interface SelectOption {
    value: string;
    label: string;
    /** Nhãn rút gọn hiển thị trên nút đóng (vd. cờ + mã vùng); mặc định dùng `label`. */
    shortLabel?: string;
}

/** Dropdown tùy biến (kiểu Select2) — thay cho <select> native. Có ô tìm kiếm khi danh sách dài. */
function FancySelect({
    value,
    onChange,
    options,
    placeholder,
    hasError,
    className,
    searchable,
    searchPlaceholder,
    emptyText,
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
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const close = (event: MouseEvent) => {
            if (ref.current && ! ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, []);

    useEffect(() => {
        if (! open) setQuery('');
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
                onClick={() => setOpen((c) => ! c)}
                className={cn(
                    'flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 py-3 text-left text-sm text-ink transition-colors sm:px-4 sm:py-3.5 sm:text-base',
                    open ? 'border-maha-500 ring-2 ring-maha-500/10' : 'border-maha-200',
                    hasError && ! value && 'border-red-400 ring-2 ring-red-100',
                )}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className={cn('truncate', ! selected && 'text-maha-400')}>
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

/** Khung giờ 09:00–21:00, bước 30 phút. */
const TIME_SLOTS: SelectOption[] = (() => {
    const slots: SelectOption[] = [];
    for (let h = 9; h <= 21; h++) {
        for (const m of [0, 30]) {
            if (h === 21 && m === 30) break;
            const v = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
            slots.push({ value: v, label: v });
        }
    }
    return slots;
})();

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

/** Lịch chọn ngày tùy biến — không cho chọn ngày quá khứ. */
function DatePicker({
    value,
    onChange,
    placeholder,
    hasError,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    hasError?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const today = startOfDay(new Date());
    const selected = value ? parseISO(value) : null;
    const [viewMonth, setViewMonth] = useState<Date>(selected ?? today);

    useEffect(() => {
        const close = (event: MouseEvent) => {
            if (ref.current && ! ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, []);

    const days = eachDayOfInterval({
        start: startOfWeek(startOfMonth(viewMonth), { weekStartsOn: 1 }),
        end: endOfWeek(endOfMonth(viewMonth), { weekStartsOn: 1 }),
    });

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((c) => ! c)}
                className={cn(
                    'flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 py-3 text-left text-sm text-ink transition-colors sm:px-4 sm:py-3.5 sm:text-base',
                    open ? 'border-maha-500 ring-2 ring-maha-500/10' : 'border-maha-200',
                    hasError && ! value && 'border-red-400 ring-2 ring-red-100',
                )}
            >
                <span className={cn(! selected && 'text-maha-400')}>
                    {selected ? format(selected, 'dd/MM/yyyy') : placeholder}
                </span>
                <CalendarDays className="h-5 w-5 shrink-0 text-maha-500" />
            </button>

            {open && (
                <div className="absolute left-0 z-30 mt-2 w-[19rem] rounded-2xl border border-maha-200 bg-white p-4 shadow-2xl shadow-maha-900/10">
                    {/* Tháng */}
                    <div className="mb-3 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setViewMonth((m) => subMonths(m, 1))}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-maha-50"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <span className="font-serif text-base font-bold text-ink">
                            Tháng {format(viewMonth, 'M/yyyy')}
                        </span>
                        <button
                            type="button"
                            onClick={() => setViewMonth((m) => addMonths(m, 1))}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-maha-50"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Thứ */}
                    <div className="mb-1 grid grid-cols-7 text-center text-xs font-semibold text-maha-500">
                        {WEEKDAYS.map((d) => (
                            <span key={d} className="py-1">{d}</span>
                        ))}
                    </div>

                    {/* Ngày */}
                    <div className="grid grid-cols-7 gap-0.5">
                        {days.map((d) => {
                            const disabled = isBefore(d, today);
                            const inMonth = isSameMonth(d, viewMonth);
                            const isSel = selected ? isSameDay(d, selected) : false;
                            const isToday = isSameDay(d, today);
                            return (
                                <button
                                    key={d.toISOString()}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => {
                                        onChange(format(d, 'yyyy-MM-dd'));
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        'flex h-9 items-center justify-center rounded-lg text-sm transition-colors',
                                        ! inMonth && 'text-maha-300',
                                        disabled && 'cursor-not-allowed text-maha-300 line-through',
                                        ! disabled && ! isSel && 'text-ink hover:bg-maha-50',
                                        isSel && 'bg-ink font-bold text-maha-50',
                                        ! isSel && isToday && ! disabled && 'ring-1 ring-inset ring-maha-400',
                                    )}
                                >
                                    {format(d, 'd')}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

function SearchableServiceSelect({
    value,
    onChange,
    services,
    locale,
    placeholder,
    minuteLabel,
    searchPlaceholder,
    emptyText,
    hasError,
}: {
    value: string[];
    onChange: (value: string[]) => void;
    services: ServiceOption[];
    locale: string;
    placeholder: string;
    minuteLabel: string;
    searchPlaceholder: string;
    emptyText: string;
    hasError?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const close = (event: MouseEvent) => {
            if (ref.current && ! ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', close);

        return () => document.removeEventListener('mousedown', close);
    }, []);

    const selectedServices = services.filter((service) => value.includes(String(service.id)));
    const normalizedQuery = query.trim().toLowerCase();
    const filteredServices = services.filter((service) =>
        tr(service.name, locale).toLowerCase().includes(normalizedQuery),
    );

    const toggle = (serviceValue: string) => {
        onChange(
            value.includes(serviceValue)
                ? value.filter((v) => v !== serviceValue)
                : [...value, serviceValue],
        );
    };

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((current) => ! current)}
                className={cn(
                    'flex min-h-[3.25rem] w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-left text-base text-ink transition-colors sm:min-h-[3.75rem] sm:px-5 sm:text-lg',
                    open ? 'border-[#556B3F] ring-2 ring-[#556B3F]/10' : 'border-[#CDBCA3]',
                    hasError && value.length === 0 && 'border-red-400 ring-2 ring-red-100',
                )}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className={cn('flex items-center gap-2 truncate', value.length === 0 && 'text-ink/70')}>
                    {value.length > 0 && (
                        <span className="shrink-0 rounded-full bg-[#556B3F] px-2 py-0.5 text-xs font-semibold text-white">
                            {value.length}
                        </span>
                    )}
                    <span className="truncate">
                        {value.length > 0 ? `Đã chọn ${value.length} dịch vụ` : placeholder}
                    </span>
                </span>
                <ChevronDown className={cn('h-5 w-5 shrink-0 text-ink transition-transform', open && 'rotate-180')} />
            </button>

            {/* Chip các dịch vụ đã chọn — xem tổng quát + xoá nhanh */}
            {selectedServices.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedServices.map((service) => (
                        <span
                            key={service.id}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#E9E2D5] py-1 pl-3 pr-2 text-xs font-medium text-ink"
                        >
                            {tr(service.name, locale)}
                            <button
                                type="button"
                                onClick={() => toggle(String(service.id))}
                                className="flex h-4 w-4 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/10 hover:text-ink"
                                aria-label="Xoá"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {open && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-2xl border border-[#CDBCA3] bg-white shadow-2xl shadow-maha-900/10">
                    <div className="relative border-b border-maha-100">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-maha-500" />
                        <input
                            autoFocus
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none placeholder:text-maha-400 sm:text-base"
                        />
                    </div>

                    <div className="max-h-64 overflow-y-auto py-2" role="listbox" aria-multiselectable="true">
                        {filteredServices.length === 0 ? (
                            <p className="px-4 py-3 text-sm text-maha-500">{emptyText}</p>
                        ) : (
                            filteredServices.map((service) => {
                                const serviceValue = String(service.id);
                                const active = value.includes(serviceValue);

                                return (
                                    <button
                                        key={service.id}
                                        type="button"
                                        role="option"
                                        aria-selected={active}
                                        onClick={() => toggle(serviceValue)}
                                        className={cn(
                                            'flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-maha-50',
                                            active && 'bg-[#E9E2D5] text-ink',
                                        )}
                                    >
                                        <span className="flex items-center gap-3">
                                            <span
                                                className={cn(
                                                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors',
                                                    active ? 'border-[#556B3F] bg-[#556B3F] text-white' : 'border-maha-300',
                                                )}
                                            >
                                                {active && <Check className="h-3.5 w-3.5" />}
                                            </span>
                                            <span>
                                                <span className="block font-semibold">{tr(service.name, locale)}</span>
                                                <span className="mt-0.5 block text-xs text-maha-600">
                                                    {service.duration} {minuteLabel}
                                                </span>
                                            </span>
                                        </span>
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

export function BookingFormBlock({
    data,
}: {
    data: { branches?: BranchOption[]; services?: ServiceOption[] };
}) {
    const locale = useLocale();
    const { t } = useTranslation();
    const { props } = usePage<SharedProps>();
    const branches = useMemo(() => data.branches ?? [], [data.branches]);
    const services = useMemo(() => data.services ?? [], [data.services]);

    // After an inline submit the server flashes the booking code → open the modal.
    const flashedCode = props.flash?.booking_code;
    const [successCode, setSuccessCode] = useState<string | null>(null);
    useEffect(() => {
        if (flashedCode) setSuccessCode(flashedCode);
    }, [flashedCode]);

    const [branchId, setBranchId] = useState('');
    const [name, setName] = useState('');
    const [countryName, setCountryName] = useState('Việt Nam');
    const countryCode = COUNTRY_CODES.find((c) => c.name === countryName)?.code ?? '+84';
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [channel, setChannel] = useState('Zalo');
    const [channelId, setChannelId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [male, setMale] = useState(1);
    const [female, setFemale] = useState(1);
    const [guestServices, setGuestServices] = useState<GuestService[]>([]);
    const [serviceError, setServiceError] = useState(false);
    const [note, setNote] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const availableServices = useMemo(
        () =>
            branchId
                ? services.filter((s) => s.branch_ids.includes(Number(branchId)))
                : services,
        [services, branchId],
    );

    // Keep the per-guest service rows in sync with the male/female counts.
    useEffect(() => {
        setGuestServices((prev) => {
            const prevMales = prev.filter((g) => g.gender === 'male');
            const prevFemales = prev.filter((g) => g.gender === 'female');
            const males: GuestService[] = [];
            for (let i = 0; i < male; i++) {
                males.push(prevMales[i] ?? { gender: 'male', serviceIds: [] });
            }
            const females: GuestService[] = [];
            for (let i = 0; i < female; i++) {
                females.push(prevFemales[i] ?? { gender: 'female', serviceIds: [] });
            }
            return [...males, ...females];
        });
    }, [male, female]);

    const total = male + female;

    const setGuestService = (index: number, serviceIds: string[]) => {
        setServiceError(false);
        setGuestServices((prev) => prev.map((g, i) => (i === index ? { ...g, serviceIds } : g)));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (guestServices.some((guest) => guest.serviceIds.length === 0)) {
            setServiceError(true);

            return;
        }

        const serviceName = (id: string) =>
            tr(services.find((s) => String(s.id) === id)?.name, locale) || '—';

        const bookingItems = guestServices.flatMap((guest) =>
            guest.serviceIds.map((serviceId) => ({
                service_id: Number(serviceId),
                gender: guest.gender,
            })),
        );

        const firstServiceId = bookingItems[0]?.service_id || Number(availableServices[0]?.id ?? 0);

        const guestLines = guestServices
            .map((g, i) => {
                const label = g.gender === 'male' ? t('blocks.bookingForm.guestMale') : t('blocks.bookingForm.guestFemale');
                const names = g.serviceIds.map((id) => serviceName(id)).join(', ');
                return `${i + 1}. ${label}: ${names}`;
            })
            .join('\n');

        const composedNote = [
            `${t('blocks.bookingForm.channel')}: ${channel} ${channelId}`.trim(),
            `${t('blocks.bookingForm.guests')}: ${total} (${t('blocks.bookingForm.male')} ${male}, ${t('blocks.bookingForm.female')} ${female})`,
            guestLines,
            note ? `---\n${note}` : '',
        ]
            .filter(Boolean)
            .join('\n');

        setSubmitting(true);
        router.post(
            '/dat-lich',
            {
                branch_id: Number(branchId),
                service_id: firstServiceId,
                items: bookingItems,
                date,
                time_slot: time,
                guest_name: name,
                guest_phone: `${countryCode} ${phone}`.trim(),
                guest_email: email || null,
                note: composedNote,
                inline: 1,
            },
            { preserveScroll: true, onFinish: () => setSubmitting(false) },
        );
    };

    return (
        <>
        <section className="bg-maha-50 py-10 sm:py-14 md:py-20 lg:py-24">
            <div className="mx-auto max-w-3xl px-5 sm:px-6">
                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl bg-white p-4 shadow-xl shadow-maha-900/5 sm:p-6 md:rounded-3xl md:p-12"
                >
                    {/* Title */}
                    <div className="mb-6 rounded-xl border border-maha-100 bg-[#E9E2D5] px-4 py-4 text-center md:mb-10 md:rounded-2xl md:px-6 md:py-8">
                        <h2 className="font-serif text-xl uppercase tracking-wide text-ink sm:text-3xl md:text-4xl">
                            {t('blocks.bookingForm.title')}
                        </h2>
                    </div>

                    {/* Branch */}
                    <div className="mb-6">
                        <label className={labelCls}>
                            {t('blocks.bookingForm.branch')} <span className="text-red-600">*</span>
                        </label>
                        <FancySelect
                            value={branchId}
                            onChange={setBranchId}
                            placeholder={t('blocks.bookingForm.branchPlaceholder')}
                            options={branches.map((b) => ({ value: String(b.id), label: tr(b.name, locale) }))}
                        />
                    </div>

                    {/* Name + Phone */}
                    <div className="mb-5 grid gap-5 md:mb-6 md:grid-cols-2 md:gap-6">
                        <div>
                            <label className={labelCls}>
                                {t('blocks.bookingForm.name')} <span className="text-red-600">*</span>
                            </label>
                            <input
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t('blocks.bookingForm.namePlaceholder')}
                                className={fieldCls}
                            />
                        </div>
                        <div>
                            <label className={labelCls}>
                                {t('blocks.bookingForm.phone')} <span className="text-red-600">*</span>
                            </label>
                            <div className="flex gap-2">
                                <FancySelect
                                    value={countryName}
                                    onChange={setCountryName}
                                    className="w-[7.25rem] shrink-0"
                                    searchable
                                    searchPlaceholder={t('blocks.bookingForm.phoneCountrySearchPlaceholder')}
                                    emptyText={t('blocks.bookingForm.phoneCountryEmpty')}
                                    options={COUNTRY_CODES.map((c) => ({
                                        value: c.name,
                                        label: `${c.flag} ${c.name} (${c.code})`,
                                        shortLabel: `${c.flag} ${c.code}`,
                                    }))}
                                />
                                <input
                                    required
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder={t('blocks.bookingForm.phonePlaceholder')}
                                    className={fieldCls}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email + Channel */}
                    <div className="mb-5 grid gap-5 md:mb-6 md:grid-cols-2 md:gap-6">
                        <div>
                            <label className={labelCls}>
                                {t('blocks.bookingForm.email')} <span className="text-red-600">*</span>
                            </label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('blocks.bookingForm.emailPlaceholder')}
                                className={fieldCls}
                            />
                        </div>
                        <div>
                            <label className={labelCls}>{t('blocks.bookingForm.channel')}</label>
                            <div className="flex gap-2">
                                <FancySelect
                                    value={channel}
                                    onChange={setChannel}
                                    className="w-[8.5rem] shrink-0"
                                    options={CHANNELS.map((c) => ({ value: c, label: c }))}
                                />
                                <input
                                    value={channelId}
                                    onChange={(e) => setChannelId(e.target.value)}
                                    placeholder={t('blocks.bookingForm.channelPlaceholder')}
                                    className={fieldCls}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Date + Time */}
                    <div className="mb-5 grid gap-5 md:mb-6 md:grid-cols-2 md:gap-6">
                        <div>
                            <label className={labelCls}>
                                {t('blocks.bookingForm.date')} <span className="text-red-600">*</span>
                            </label>
                            <DatePicker
                                value={date}
                                onChange={setDate}
                                placeholder="dd/mm/yyyy"
                            />
                        </div>
                        <div>
                            <label className={labelCls}>
                                {t('blocks.bookingForm.time')} <span className="text-red-600">*</span>
                            </label>
                            <FancySelect
                                value={time}
                                onChange={setTime}
                                placeholder="--:--"
                                options={TIME_SLOTS}
                            />
                        </div>
                    </div>

                    {/* Guest counts */}
                    <div className="mb-6">
                        <label className={labelCls}>
                            {t('blocks.bookingForm.guests')} <span className="text-red-600">*</span>
                        </label>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex items-center gap-3 rounded-lg border border-maha-200 bg-white px-4 py-3">
                                <span className="text-sm font-medium text-maha-600">{t('blocks.bookingForm.total')}:</span>
                                <span className="font-semibold text-ink">
                                    {total} {t('blocks.bookingForm.people')}
                                </span>
                            </div>
                            <Stepper label={t('blocks.bookingForm.male')} value={male} min={0} onChange={setMale} />
                            <Stepper label={t('blocks.bookingForm.female')} value={female} min={0} onChange={setFemale} />
                        </div>
                    </div>

                    {/* Per-guest services */}
                    <div className="mb-6">
                        <label className={labelCls}>
                            {t('blocks.bookingForm.chooseService')} <span className="text-red-600">*</span>
                        </label>
                        <div className="space-y-3 rounded-xl bg-maha-50 p-3 sm:space-y-4 sm:rounded-2xl sm:p-5">
                            {guestServices.map((g, i) => (
                                <div key={i} className="grid items-start gap-2 md:grid-cols-[140px_1fr] md:gap-4">
                                    <span className="flex items-center gap-2 pt-3 text-sm font-bold text-ink">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#475934]" />
                                        {i + 1}.{' '}
                                        {g.gender === 'male'
                                            ? t('blocks.bookingForm.guestMale')
                                            : t('blocks.bookingForm.guestFemale')}
                                    </span>
                                    <SearchableServiceSelect
                                        value={g.serviceIds}
                                        onChange={(serviceIds) => setGuestService(i, serviceIds)}
                                        services={availableServices}
                                        locale={locale}
                                        placeholder={t('blocks.bookingForm.servicePlaceholder')}
                                        minuteLabel={t('common.minute')}
                                        searchPlaceholder={t('blocks.bookingForm.serviceSearchPlaceholder')}
                                        emptyText={t('blocks.bookingForm.serviceEmpty')}
                                        hasError={serviceError}
                                    />
                                </div>
                            ))}
                        </div>
                        {serviceError && (
                            <p className="mt-2 text-sm font-semibold text-red-600">
                                {t('blocks.bookingForm.serviceRequired')}
                            </p>
                        )}
                    </div>

                    {/* Note */}
                    <div className="mb-6 md:mb-8">
                        <label className={labelCls}>{t('blocks.bookingForm.note')}</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={4}
                            placeholder={t('blocks.bookingForm.notePlaceholder')}
                            className={`${fieldCls} resize-none`}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-lg bg-ink py-3.5 font-serif text-sm font-semibold uppercase tracking-wide text-maha-50 transition-colors hover:bg-[#243023] disabled:opacity-60 sm:py-4 sm:text-base"
                    >
                        {submitting ? t('common.processing') : t('blocks.bookingForm.submit')}
                    </button>
                </form>
            </div>
        </section>

        {/* Success modal */}
        {successCode && (
            <div
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
                role="dialog"
                aria-modal="true"
                onClick={() => setSuccessCode(null)}
            >
                <div
                    className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-2xl md:p-12"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Check icon */}
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E9E2D5]">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#718255] text-white">
                            <Check className="h-7 w-7" strokeWidth={3} />
                        </span>
                    </div>

                    <h3 className="mt-6 font-serif text-2xl uppercase tracking-wide text-ink sm:text-3xl">
                        {t('blocks.bookingForm.success.title')}
                    </h3>

                    <div className="mt-6 rounded-2xl border border-maha-100 bg-maha-50/60 px-5 py-6 md:px-8">
                        <p className="font-serif text-sm italic leading-relaxed text-[#556B3F] md:text-base">
                            {t('blocks.bookingForm.success.message')}
                        </p>
                    </div>

                    <p className="mt-6 text-sm text-maha-500">{t('blocks.bookingForm.success.codeLabel')}</p>
                    <p className="mt-1 font-serif text-2xl font-bold text-ink">
                        <span className="text-maha-400">#</span>
                        {successCode}
                    </p>

                    <Link
                        href="/"
                        className="mt-7 inline-block rounded-full bg-ink px-10 py-3.5 font-serif text-base font-semibold tracking-wide text-maha-50 transition-colors hover:bg-[#243023]"
                    >
                        {t('blocks.bookingForm.success.home')}
                    </Link>
                </div>
            </div>
        )}
        </>
    );
}

function Stepper({
    label,
    value,
    min,
    onChange,
}: {
    label: string;
    value: number;
    min: number;
    onChange: (v: number) => void;
}) {
    return (
        <div className="flex items-center justify-between rounded-lg border border-maha-200 bg-white px-4 py-3">
            <span className="text-sm font-medium text-maha-600">{label}:</span>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => onChange(Math.max(min, value - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-maha-200 text-ink hover:bg-maha-50"
                    aria-label={`${label} -`}
                >
                    <Minus className="h-4 w-4" />
                </button>
                <span className="w-5 text-center font-semibold text-ink">{value}</span>
                <button
                    type="button"
                    onClick={() => onChange(value + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-maha-200 text-ink hover:bg-maha-50"
                    aria-label={`${label} +`}
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
