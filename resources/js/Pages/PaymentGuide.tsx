import PublicLayout from '@/Layouts/PublicLayout';
import { Seo } from '@/Components/Seo';
import { useTranslation } from 'react-i18next';

interface GuideSection {
    key: string;
    title: string;
    body: string[];
}

/**
 * Nội dung mặc định (Tiếng Việt). Mỗi chuỗi gắn với một i18n key
 * `serviceGuidelines.*` nên admin có thể sửa/dịch trong "Chuỗi giao diện".
 */
const SECTIONS: GuideSection[] = [
    {
        key: 'booking',
        title: 'Đặt lịch',
        body: [
            'Để Mầm có thể đón tiếp bạn một cách chu đáo, rất mong bạn đặt hẹn trước. Lịch hẹn được giữ trong 15 phút.',
            'Trường hợp đến muộn, lịch có thể được điều chỉnh để đảm bảo sự liền mạch chung.',
            'Mọi thay đổi, Mầm rất mong quý khách vui lòng thông báo sớm để Mầm có thể hỗ trợ tốt nhất.',
        ],
    },
    {
        key: 'belongings',
        title: 'Tài sản cá nhân',
        body: [
            'Tủ khóa được bố trí tại phòng thay đồ để quý khách sử dụng.',
            'Vì là không gian chung, xin vui lòng lưu tâm đến tư trang cá nhân và kiểm tra lại trước khi rời đi.',
            'Đối với tài sản có giá trị, quý khách có thể gửi tại quầy lễ tân.',
        ],
    },
    {
        key: 'health',
        title: 'Sức khỏe & An toàn',
        body: [
            'Sự an tâm của quý khách luôn là ưu tiên trong mọi liệu trình.',
            'Trong một số trường hợp, Mầm có thể chưa thể thực hiện dịch vụ — khi cơ thể hoặc tình trạng hiện tại của quý khách chưa phù hợp.',
            'Nếu có thông tin cần lưu ý, xin vui lòng chia sẻ trước để Mầm có thể chăm sóc một cách chu đáo nhất.',
        ],
    },
    {
        key: 'space',
        title: 'Không gian chung',
        body: [
            'Mầm là một không gian tĩnh, được gìn giữ chung.',
            'Xin vui lòng giữ âm lượng nhẹ, thiết bị ở chế độ im lặng, và trang phục phù hợp tại các khu vực chung.',
            'Trong những trường hợp hiếm, khi trải nghiệm chung có thể bị ảnh hưởng — bao gồm hành vi hoặc ngôn ngữ chưa phù hợp — Mầm xin phép từ chối hoặc ngừng phục vụ.',
            'Các khoản phí trong trường hợp này sẽ không được hoàn lại.',
        ],
    },
    {
        key: 'payment',
        title: 'Thanh toán',
        body: [
            'Chúng tôi chấp nhận chuyển khoản ngân hàng, tiền mặt.',
            'Visa, Mastercard, JCB, American Express, UnionPay, Apple Pay.',
            'Không phát sinh phụ phí. Phụ thu có thể áp dụng vào các dịp Quốc lễ tại Việt Nam.',
        ],
    },
];

export default function PaymentGuide() {
    const { t } = useTranslation();

    return (
        <PublicLayout>
            <Seo
                title={t('serviceGuidelines.metaTitle', 'Lưu ý dịch vụ')}
                description={t(
                    'serviceGuidelines.metaDescription',
                    'Những lưu ý nhỏ để trải nghiệm tại Mầm Spa luôn trọn vẹn và an yên: đặt lịch, tài sản cá nhân, sức khỏe & an toàn, không gian chung và thanh toán.',
                )}
            />

            <section className="bg-[#E9E2D5] py-16 md:py-24">
                <div className="mx-auto max-w-3xl px-5 sm:px-6">
                    {/* Header */}
                    <p className="text-center font-serif text-xs font-semibold uppercase tracking-[0.3em] text-[#556B3F] md:text-sm">
                        {t('serviceGuidelines.eyebrow', 'Mầm Spa')}
                    </p>
                    <h1 className="mt-3 text-center font-serif text-3xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
                        {t('serviceGuidelines.heading', 'Service Guidelines')}
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-center font-serif text-base italic text-ink/55 md:text-lg">
                        {t('serviceGuidelines.subtitle', 'Những lưu ý nhỏ để trải nghiệm tại Mầm luôn trọn vẹn và an yên.')}
                    </p>

                    {/* Timeline card */}
                    <div className="mt-12 rounded-[2rem] border border-maha-100 bg-white/55 p-6 shadow-sm shadow-maha-900/5 sm:p-10 md:mt-16">
                        <ol className="relative ml-2 space-y-11 border-l border-maha-300/60 pl-8 md:space-y-14 md:pl-10">
                            {SECTIONS.map((section, i) => (
                                <li key={section.key} className="relative">
                                    {/* Dot marker on the line (filled for first & last) */}
                                    <span
                                        className={[
                                            'absolute top-1.5 flex h-3.5 w-3.5 -translate-x-[2.4rem] items-center justify-center rounded-full border-2 border-[#556B3F] md:-translate-x-[2.9rem]',
                                            i === 0 || i === SECTIONS.length - 1 ? 'bg-[#556B3F]' : 'bg-[#E9E2D5]',
                                        ].join(' ')}
                                    >
                                        {(i === 0 || i === SECTIONS.length - 1) && (
                                            <span className="h-1 w-1 rounded-full bg-white" />
                                        )}
                                    </span>

                                    <h2 className="font-serif text-xl font-bold text-ink md:text-2xl">
                                        {t(`serviceGuidelines.sections.${section.key}.title`, section.title)}
                                    </h2>
                                    <div className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-ink/75 md:text-base">
                                        {section.body.map((para, j) => (
                                            <p key={j}>
                                                {t(`serviceGuidelines.sections.${section.key}.p${j + 1}`, para)}
                                            </p>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
