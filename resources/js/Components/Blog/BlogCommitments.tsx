import { HeartHandshake, Leaf, Sprout, Sun, type LucideIcon } from 'lucide-react';

interface CommitmentItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

const ITEMS: CommitmentItem[] = [
    { icon: Leaf, title: 'Liệu pháp chuẩn Việt', description: 'Kết hợp tinh hoa trị liệu truyền thống và kiến thức hiện đại' },
    { icon: HeartHandshake, title: 'Chăm sóc từ trái tim', description: 'Tinh tế trong từng chi tiết, tận tâm trong từng liệu trình' },
    { icon: Sprout, title: 'Nguyên liệu thiên nhiên', description: 'Lựa chọn lành tính, an toàn và hiệu quả' },
    { icon: Sun, title: 'Không gian an yên', description: 'Nơi bạn được lắng nghe, thư giãn và tái tạo năng lượng' },
];

/** Dải icon cam kết cuối trang Blog — cùng phong cách với dải icon cuối các trang khác (Contact, Home). */
export function BlogCommitments() {
    return (
        <section className="bg-white px-5 py-10 sm:px-10 sm:py-12 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-2 divide-y divide-maha-200 sm:grid-cols-4 sm:divide-y-0">
                    {ITEMS.map((item) => (
                        <div
                            key={item.title}
                            className="flex flex-col items-center gap-2 border-maha-200 px-4 py-6 text-center sm:border-l sm:first:border-l-0"
                        >
                            <item.icon className="h-7 w-7 text-subheading" strokeWidth={1.25} />
                            <p className="mt-2 text-sm font-semibold text-heading">{item.title}</p>
                            <p className="text-xs leading-relaxed text-ink/70">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
