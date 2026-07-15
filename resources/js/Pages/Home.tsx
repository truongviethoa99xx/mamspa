import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Home() {
    return (
        <PublicLayout>
            <Head title="Trang chủ" />
            <div className="mx-auto max-w-7xl px-5 py-24 text-center text-maha-500 sm:px-6">
                Nội dung trang chủ đang được xây dựng.
            </div>
        </PublicLayout>
    );
}
