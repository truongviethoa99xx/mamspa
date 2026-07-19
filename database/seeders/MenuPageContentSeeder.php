<?php

namespace Database\Seeders;

use App\Models\MenuPageContent;
use Illuminate\Database\Seeder;

/**
 * Dữ liệu demo cho trang Menu (menu_page_contents) — chỉ dùng để xem thử local,
 * không chạy trong DatabaseSeeder chính (dữ liệu chi nhánh do admin tự nhập).
 * Ảnh/PDF tham chiếu ở storage/app/public/menu/ — chạy MenuPageContentSeeder
 * sẽ tự copy chúng nếu chưa có (xem run()).
 *
 * Ghi đè thẳng vào bản ghi singleton hiện có (MenuPageContent::current(), bất kể
 * id là bao nhiêu) thay vì upsert theo id cố định — tránh lệch id nếu bản ghi đã
 * được tạo trước đó qua Filament (vd. do form admin auto-tạo khi mount() lần đầu).
 */
class MenuPageContentSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            'slug' => 'menu',
            'is_published' => true,

            'hero_kicker' => ['vi' => 'SERVICE MENU', 'en' => 'SERVICE MENU'],
            'hero_title' => ['vi' => 'MẦM SPA', 'en' => 'MẦM SPA'],
            'hero_subtitle' => [
                'vi' => 'Rooted in Vietnamese Healing Traditions',
                'en' => 'Rooted in Vietnamese Healing Traditions',
            ],
            'hero_image' => 'menu/hero.png',
            'hero_image_alt' => ['vi' => 'Nến thơm và thảo mộc tại Mầm', 'en' => 'Candles and herbs at Mầm'],
            'hero_visible' => true,

            'intro_title' => [
                'vi' => 'Hai không gian. Một triết lý chăm sóc.<br>Những trải nghiệm được thiết kế riêng cho từng chi nhánh.',
                'en' => 'Two spaces. One philosophy of care.<br>Experiences designed for each branch.',
            ],
            'intro_note' => [
                'vi' => 'Vui lòng liên hệ hoặc chọn chi nhánh khi đặt lịch<br>để được tư vấn dịch vụ và mức giá áp dụng<br>và đặc quyền ưu đãi riêng dành cho quý khách.',
                'en' => 'Please contact us or choose a branch when booking<br>for advice on services, pricing, and exclusive privileges.',
            ],
            'intro_visible' => true,

            'branches' => [
                [
                    'image' => 'menu/branches/phu-nhuan.png',
                    'image_alt' => ['vi' => 'Không gian chi nhánh Phú Nhuận', 'en' => 'Phú Nhuận branch space'],
                    'name' => ['vi' => 'PHÚ NHUẬN', 'en' => 'PHÚ NHUẬN'],
                    'street' => ['vi' => 'LÊ VĂN SỸ', 'en' => 'LÊ VĂN SỸ'],
                    'desc' => [
                        'vi' => '<p>Một khoảng lặng yên tĩnh, gần sân bay Tân Sơn Nhất.</p>',
                        'en' => '<p>A quiet pause, near Tân Sơn Nhất airport.</p>',
                    ],
                    'pdf_vi' => 'menu/pdf/phu-nhuan-vi.pdf',
                    'pdf_en' => 'menu/pdf/phu-nhuan-en.pdf',
                    'pdf_zh' => 'menu/pdf/phu-nhuan-zh.pdf',
                    'pdf_ko' => 'menu/pdf/phu-nhuan-ko.pdf',
                    'pdf_ja' => 'menu/pdf/phu-nhuan-ja.pdf',
                ],
                [
                    'image' => 'menu/branches/ben-thanh.png',
                    'image_alt' => ['vi' => 'Không gian chi nhánh Bến Thành', 'en' => 'Bến Thành branch space'],
                    'name' => ['vi' => 'BẾN THÀNH', 'en' => 'BẾN THÀNH'],
                    'street' => ['vi' => 'LÊ THỊ RIÊNG', 'en' => 'LÊ THỊ RIÊNG'],
                    'desc' => [
                        'vi' => '<p>Không gian wellness giữa trung tâm thành phố.</p>',
                        'en' => '<p>A wellness space in the heart of downtown.</p>',
                    ],
                    'pdf_vi' => 'menu/pdf/ben-thanh-vi.pdf',
                    'pdf_en' => 'menu/pdf/ben-thanh-en.pdf',
                    'pdf_zh' => 'menu/pdf/ben-thanh-zh.pdf',
                    'pdf_ko' => 'menu/pdf/ben-thanh-ko.pdf',
                    'pdf_ja' => 'menu/pdf/ben-thanh-ja.pdf',
                ],
            ],
            'branches_visible' => true,

            'contact_title' => ['vi' => 'Mầm luôn sẵn sàng đồng hành cùng bạn', 'en' => 'Mầm is always ready to accompany you'],
            'contact_text' => [
                'vi' => 'Để được tư vấn chi tiết, vui lòng liên hệ với Mầm<br>hoặc chọn chi nhánh khi đặt lịch.',
                'en' => 'For detailed advice, please contact Mầm<br>or choose a branch when booking.',
            ],
            'contact_image' => 'menu/contact.png',
            'contact_image_alt' => ['vi' => 'Khay gỗ với nến và thảo mộc', 'en' => 'Wooden tray with candles and herbs'],
            'contact_visible' => true,
        ];

        MenuPageContent::current()->update($data);
    }
}
