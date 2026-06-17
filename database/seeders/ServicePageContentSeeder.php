<?php

namespace Database\Seeders;

use App\Models\ServicePageContent;
use Illuminate\Database\Seeder;

class ServicePageContentSeeder extends Seeder
{
    public function run(): void
    {
        ServicePageContent::query()->updateOrCreate(['id' => 1], [
            'happy_hours_title' => 'Happy Hours - Ưu đãi đặc quyền',
            'happy_hours_desc' => 'Thư giãn thảnh thơi, giảm ngay ...% tổng hóa đơn cho mọi lịch hẹn hoàn tất trước 19:00.',
            'benefits' => [
                'Giải tỏa căng thẳng thần kinh, mang lại giấc ngủ sâu.',
                'Giảm đau mỏi vùng cổ vai gáy do ngồi sai tư thế.',
                'Làm sạch sâu da đầu, nuôi dưỡng nang tóc chắc khỏe.',
                'Kích thích tuần hoàn máu, tái tạo năng lượng tươi mới.',
            ],
            'ideal_for' => [
                'Nhân viên văn phòng ngồi máy tính liên tục.',
                'Người thường xuyên mất ngủ, stress kéo dài.',
                'Khách hàng gặp vấn đề về rụng tóc, gàu ngứa.',
                'Người cần một khoảng nghỉ ngắn để phục hồi tinh thần.',
            ],
            'faqs' => [
                [
                    'question' => 'Combo này có phù hợp cho phụ nữ mang thai không?',
                    'answer' => 'Dạ có, tuy nhiên kỹ thuật viên sẽ điều chỉnh lực ấn nhẹ nhàng và bỏ qua một số huyệt đạo nhạy cảm. Bạn vui lòng ghi chú tuổi thai khi đặt lịch để Mầm chuẩn bị gối ôm và thảo dược phù hợp nhất nhé.',
                ],
                [
                    'question' => 'Tôi có cần gội đầu trước khi đến Spa không?',
                    'answer' => 'Bạn không cần gội đầu trước. Liệu trình đã bao gồm bước làm sạch và chăm sóc phù hợp để bạn thư giãn trọn vẹn tại spa.',
                ],
                [
                    'question' => 'Mầm Spa có phòng không gian riêng tư (phòng VIP) không?',
                    'answer' => 'Mầm có khu vực riêng tư tùy theo chi nhánh và khung giờ. Bạn có thể ghi chú khi đặt lịch để đội ngũ hỗ trợ sắp xếp trước.',
                ],
            ],
        ]);
    }
}
