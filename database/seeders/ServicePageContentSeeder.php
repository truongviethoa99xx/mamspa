<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Snapshot nội dung tĩnh bảng `service_page_contents` (đa ngôn ngữ vi/en/ja/ko/zh).
 * Tự sinh từ dữ liệu thật — chạy lại sẽ phục hồi nguyên trạng nội dung trang.
 */
class ServicePageContentSeeder extends Seeder
{
    public function run(): void
    {
        $data = array (
          'benefits' => '["Giải tỏa căng thẳng thần kinh, mang lại giấc ngủ sâu.", "Giảm đau mỏi vùng cổ vai gáy do ngồi sai tư thế.", "Làm sạch sâu da đầu, nuôi dưỡng nang tóc chắc khỏe.", "Kích thích tuần hoàn máu, tái tạo năng lượng tươi mới."]',
          'ideal_for' => '["Nhân viên văn phòng ngồi máy tính liên tục.", "Người thường xuyên mất ngủ, stress kéo dài.", "Khách hàng gặp vấn đề về rụng tóc, gàu ngứa.", "Người cần một khoảng nghỉ ngắn để phục hồi tinh thần."]',
          'faqs' => '[{"answer": "Dạ có, tuy nhiên kỹ thuật viên sẽ điều chỉnh lực ấn nhẹ nhàng và bỏ qua một số huyệt đạo nhạy cảm. Bạn vui lòng ghi chú tuổi thai khi đặt lịch để Mầm chuẩn bị gối ôm và thảo dược phù hợp nhất nhé.", "question": "Combo này có phù hợp cho phụ nữ mang thai không?"}, {"answer": "Bạn không cần gội đầu trước. Liệu trình đã bao gồm bước làm sạch và chăm sóc phù hợp để bạn thư giãn trọn vẹn tại spa.", "question": "Tôi có cần gội đầu trước khi đến Spa không?"}, {"answer": "Mầm có khu vực riêng tư tùy theo chi nhánh và khung giờ. Bạn có thể ghi chú khi đặt lịch để đội ngũ hỗ trợ sắp xếp trước.", "question": "Mầm Spa có phòng không gian riêng tư (phòng VIP) không?"}]',
          'hero_visible' => 1,
          'hero_title' => json_encode(['vi' => 'Dịch vụ tại Mầm', 'en' => 'Services at Mầm'], JSON_UNESCAPED_UNICODE),
          'hero_subtitle' => json_encode([
              'vi' => 'Bốn hành trình trị liệu được thiết kế để chăm sóc cơ thể, nuôi dưỡng tâm trí và khơi dậy nguồn năng lượng tích cực từ bên trong.',
              'en' => 'Four therapeutic journeys designed to care for the body, nourish the mind and awaken positive energy from within.',
          ], JSON_UNESCAPED_UNICODE),
          // Nội dung 4 khối dịch vụ nổi bật lấy trực tiếp từ danh mục dịch vụ cấp 1 (App\Models\ServiceCategory),
          // quản lý ở /admin/service-categories — không seed ở đây.
          'showcase_visible' => 1,
          'closing_visible' => 1,
          'closing_heading' => json_encode(['vi' => 'Mỗi liệu trình là một hành trình trở về bên trong.', 'en' => 'Every treatment is a journey back within.'], JSON_UNESCAPED_UNICODE),
          'closing_body' => json_encode([
              'vi' => 'Hãy để Mầm đồng hành cùng bạn trên hành trình chăm sóc sức khỏe và nuôi dưỡng sự an lành mỗi ngày.',
              'en' => 'Let Mầm walk alongside you on the journey of health and everyday wellbeing.',
          ], JSON_UNESCAPED_UNICODE),
          'closing_cta_text' => json_encode(['vi' => 'Đặt lịch ngay', 'en' => 'Book now'], JSON_UNESCAPED_UNICODE),
          'closing_cta_link' => '/dat-lich/',
        );

        $data['created_at'] = $data['created_at'] ?? now();
        $data['updated_at'] = now();

        DB::table('service_page_contents')->updateOrInsert(['id' => 1], $data);
    }
}
