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
          'happy_hours_title' => 'Happy Hours - Ưu đãi đặc quyền',
          'happy_hours_desc' => 'Thư giãn thảnh thơi, giảm ngay ...% tổng hóa đơn cho mọi lịch hẹn hoàn tất trước 19:00.',
          'benefits' => '["Giải tỏa căng thẳng thần kinh, mang lại giấc ngủ sâu.", "Giảm đau mỏi vùng cổ vai gáy do ngồi sai tư thế.", "Làm sạch sâu da đầu, nuôi dưỡng nang tóc chắc khỏe.", "Kích thích tuần hoàn máu, tái tạo năng lượng tươi mới."]',
          'ideal_for' => '["Nhân viên văn phòng ngồi máy tính liên tục.", "Người thường xuyên mất ngủ, stress kéo dài.", "Khách hàng gặp vấn đề về rụng tóc, gàu ngứa.", "Người cần một khoảng nghỉ ngắn để phục hồi tinh thần."]',
          'faqs' => '[{"answer": "Dạ có, tuy nhiên kỹ thuật viên sẽ điều chỉnh lực ấn nhẹ nhàng và bỏ qua một số huyệt đạo nhạy cảm. Bạn vui lòng ghi chú tuổi thai khi đặt lịch để Mầm chuẩn bị gối ôm và thảo dược phù hợp nhất nhé.", "question": "Combo này có phù hợp cho phụ nữ mang thai không?"}, {"answer": "Bạn không cần gội đầu trước. Liệu trình đã bao gồm bước làm sạch và chăm sóc phù hợp để bạn thư giãn trọn vẹn tại spa.", "question": "Tôi có cần gội đầu trước khi đến Spa không?"}, {"answer": "Mầm có khu vực riêng tư tùy theo chi nhánh và khung giờ. Bạn có thể ghi chú khi đặt lịch để đội ngũ hỗ trợ sắp xếp trước.", "question": "Mầm Spa có phòng không gian riêng tư (phòng VIP) không?"}]',
          'listing_categories' => '["Body Massage", "Head Spa", "Facial Care", "Mother Care"]',
          'massage_cards' => '[{"title": "Head - Neck - Shoulder", "description": null}, {"title": "Foot Work", "description": null}, {"title": "Body Work", "description": null}]',
          'head_spa_cards' => '[{"title": "HEAD SPA THƯ GIÃN", "services": [{"name": "Gội Thư Giãn", "duration": "45 Phút", "description": "Làm sạch nhẹ nhàng, kết hợp massage đầu và cổ vai gáy. Giúp xua tan áp lực, mang lại sự nhẹ nhõm tức thì."}, {"name": "Đặc Trưng Mầm", "duration": "60 Phút", "description": "Gội dưỡng sinh chuyên sâu, ấn huyệt cổ vai gáy, kết hợp chườm mắt thảo dược giúp đả thông kinh lạc."}, {"name": "Chuyên Sâu", "duration": "60 Phút", "description": "Liệu pháp đặc trị cho vùng đầu, kết hợp chườm đá nóng và massage ấn huyệt gáy giúp giấc ngủ sâu hơn."}]}, {"title": "SCALP CARE PHỤC HỒI", "services": [{"name": "Phục Hồi Da Đầu", "duration": "45 Phút", "description": "Làm sạch sâu bã nhờn, tẩy tế bào chết và phục hồi nang tóc. Kích thích mọc tóc tự nhiên và giảm gãy rụng."}, {"name": "Tái Tạo Da Đầu & Làn Da", "duration": "75 Phút", "description": "Cân bằng độ ẩm da đầu, cải thiện nang tóc kết hợp đắp mặt nạ thư giãn và massage nâng cơ mặt."}, {"name": "Soi Da Đầu (Tặng kèm)", "duration": "Before / After", "description": "Kiểm tra tình trạng nang tóc trước và sau liệu trình bằng máy soi chuyên dụng để thấy rõ sự thay đổi."}]}]',
          'other_care_items' => '[{"title": "Mother Care", "eyebrow": "Nâng niu hành trình thiêng liêng", "paragraphs": ["Giai đoạn thai kỳ mang đến nhiều thay đổi khiến cơ thể mẹ dễ mệt mỏi. Liệu trình Mother Care tại Mầm Spa sử dụng dầu massage 100% hữu cơ, kết hợp kỹ thuật ấn huyệt nhẹ nhàng, an toàn tuyệt đối cho cả mẹ và bé.", "Giúp giảm đau nhức cơ xương khớp, hạn chế tình trạng chuột rút và mang lại giấc ngủ sâu, an lành cho mẹ bầu."]}, {"title": "Facial Care", "eyebrow": "Đánh thức vẻ rạng rỡ tự nhiên", "paragraphs": ["Chăm sóc chuyên sâu với các dòng sản phẩm chiết xuất từ thảo mộc thiên nhiên, an toàn và lành tính.", "Kết hợp liệu pháp massage nâng cơ bằng đá nóng giúp trẻ hoá làn da và xoá mờ dấu vết thời gian."]}]',
          'massage_eyebrow' => 'Vietnamese Healing Therapy',
          'head_spa_eyebrow' => 'Nourish your roots, calm your mind',
          'head_spa_title' => 'Head Spa & Scalp Care',
          'other_care_eyebrow' => 'Beauty from within',
          'other_care_title' => 'Các dịch vụ chăm sóc khác',
        );

        $data['created_at'] = $data['created_at'] ?? now();
        $data['updated_at'] = now();

        DB::table('service_page_contents')->updateOrInsert(['id' => 1], $data);
    }
}
