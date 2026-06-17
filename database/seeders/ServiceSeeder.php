<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'slug' => 'aroma-oil-massage',
                'name' => ['vi' => 'Massage dầu thơm', 'en' => 'Aroma Oil Massage'],
                'description' => ['vi' => 'Thư giãn với tinh dầu thiên nhiên.', 'en' => 'Relax with natural essential oils.'],
                'category' => 'massage', 'duration' => 90, 'price' => 690000, 'is_featured' => true,
                'ingredients' => ['Lavender', 'Sweet almond oil'],
            ],
            [
                'slug' => 'hot-stone-massage',
                'name' => ['vi' => 'Massage đá nóng', 'en' => 'Hot Stone Massage'],
                'description' => ['vi' => 'Đá basalt nóng giúp giải toả căng cơ.', 'en' => 'Heated basalt stones release muscle tension.'],
                'category' => 'massage', 'duration' => 90, 'price' => 790000,
                'ingredients' => ['Basalt stone'],
            ],
            [
                'slug' => 'thai-massage',
                'name' => ['vi' => 'Thai massage', 'en' => 'Thai Massage'],
                'description' => ['vi' => 'Bấm huyệt + kéo giãn theo phong cách Thái.', 'en' => 'Thai-style acupressure and stretching.'],
                'category' => 'massage', 'duration' => 90, 'price' => 690000,
            ],
            [
                'slug' => 'gua-sha-facial',
                'name' => ['vi' => 'Facial Gua Sha', 'en' => 'Gua Sha Facial'],
                'description' => ['vi' => 'Cạo gió đá ngọc lưu thông khí huyết da mặt.', 'en' => 'Jade gua sha facial for circulation.'],
                'category' => 'facial', 'duration' => 60, 'price' => 590000, 'is_featured' => true,
                'ingredients' => ['Jade stone', 'Hyaluronic serum'],
            ],
            [
                'slug' => 'head-spa-21-steps',
                'name' => ['vi' => 'Head Spa 21 bước', 'en' => 'Head Spa 21 Steps'],
                'description' => ['vi' => 'Gội đầu dưỡng sinh 21 bước, kết hợp bấm huyệt.', 'en' => '21-step nourishing head spa with acupressure.'],
                'category' => 'head-spa', 'duration' => 75, 'price' => 590000, 'is_featured' => true,
            ],
            [
                'slug' => 'foot-spa-reflexology',
                'name' => ['vi' => 'Foot Spa phản xạ', 'en' => 'Foot Reflexology'],
                'description' => ['vi' => 'Ngâm thảo dược + bấm huyệt bàn chân.', 'en' => 'Herbal foot soak + reflexology massage.'],
                'category' => 'foot-spa', 'duration' => 60, 'price' => 390000,
            ],
            [
                'slug' => 'combo-shampoo-massage',
                'name' => ['vi' => 'Combo Gội + Massage', 'en' => 'Shampoo + Massage Combo'],
                'description' => ['vi' => 'Head Spa + body massage 60 phút.', 'en' => 'Head Spa + 60-min body massage.'],
                'category' => 'combo', 'duration' => 120, 'price' => 990000, 'is_featured' => true,
            ],
            [
                'slug' => 'mahabalance-signature',
                'name' => ['vi' => 'Mahabalance Signature', 'en' => 'Mahabalance Signature'],
                'description' => ['vi' => 'Liệu trình ký tên: cân bằng Thân – Tâm – Trí 120 phút.', 'en' => 'Signature 120-min Body–Mind–Spirit balance.'],
                'category' => 'combo', 'duration' => 120, 'price' => 1290000, 'is_featured' => true,
            ],
            [
                'slug' => 'serenity-retreat-combo',
                'name' => ['vi' => 'Serenity Retreat', 'en' => 'Serenity Retreat'],
                'description' => ['vi' => 'Massage toàn thân, chăm sóc da mặt và gội dưỡng sinh 150 phút.', 'en' => 'Full-body massage, facial care and herbal head spa, 150 min.'],
                'category' => 'combo', 'duration' => 150, 'price' => 1490000, 'is_featured' => false,
            ],
        ];

        $branches = Branch::pluck('id')->all();

        foreach ($items as $i) {
            $service = Service::updateOrCreate(['slug' => $i['slug']], $i);
            $service->branches()->sync($branches);
        }
    }
}
