<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->json('branch_intro_title')->nullable()->after('service_list_title');
            $table->json('branch_intro_eyebrow')->nullable()->after('branch_intro_title');
            $table->json('branch_intro_subheading')->nullable()->after('branch_intro_eyebrow');
            $table->json('branch_intro_heading')->nullable()->after('branch_intro_subheading');
            $table->json('branch_intro_body_1')->nullable()->after('branch_intro_heading');
            $table->json('branch_intro_body_2')->nullable()->after('branch_intro_body_1');
            $table->json('branch_intro_cta')->nullable()->after('branch_intro_body_2');
            $table->json('branch_intro_caption')->nullable()->after('branch_intro_cta');
        });

        DB::table('home_page_contents')->update([
            'branch_intro_title' => json_encode([
                'vi' => 'Khám phá các không gian Mầm Spa',
                'en' => 'Explore the Mầm Spa spaces',
                'ja' => 'Mầm Spa の空間を巡る',
                'ko' => 'Mầm Spa 공간 둘러보기',
                'zh' => '探索 Mầm Spa 空间',
            ], JSON_UNESCAPED_UNICODE),
            'branch_intro_eyebrow' => json_encode([
                'vi' => 'A retreat for body, mind & soul',
                'en' => 'A retreat for body, mind & soul',
                'ja' => 'A retreat for body, mind & soul',
                'ko' => 'A retreat for body, mind & soul',
                'zh' => 'A retreat for body, mind & soul',
            ], JSON_UNESCAPED_UNICODE),
            'branch_intro_subheading' => json_encode([
                'vi' => 'Không gian chữa lành',
                'en' => 'A healing space',
                'ja' => '癒やしの空間',
                'ko' => '치유의 공간',
                'zh' => '疗愈空间',
            ], JSON_UNESCAPED_UNICODE),
            'branch_intro_heading' => json_encode([
                'vi' => 'Nét đẹp của Sài Gòn xưa.',
                'en' => 'The beauty of old Saigon.',
                'ja' => '古きサイゴンの趣。',
                'ko' => '옛 사이공의 아름다움.',
                'zh' => '旧西贡之美。',
            ], JSON_UNESCAPED_UNICODE),
            'branch_intro_body_1' => json_encode([
                'vi' => 'Lạc bước vào không gian Lê Văn Sỹ như trở về một khoảng trời yên tĩnh hiếm hoi. Nơi đây giữ trọn nét mộc mạc của kiến trúc truyền thống với gỗ ấm, ánh sáng tự nhiên và hương thảo mộc phảng phất.',
                'en' => 'Step into the Lê Văn Sỹ space and return to a rare moment of stillness. Here, the rustic charm of traditional architecture is preserved with warm wood, natural light and the faint scent of herbs.',
                'ja' => 'レ・ヴァン・シー店に足を踏み入れると、希少な静寂のひとときへ。温かみのある木材、自然光、ほのかなハーブの香りが、伝統建築の素朴な趣をそのままに残しています。',
                'ko' => '레 반 시 지점에 들어서면 보기 드문 고요한 순간으로 돌아갑니다. 따뜻한 원목, 자연 채광, 은은한 허브 향이 전통 건축의 소박한 멋을 고스란히 간직하고 있습니다.',
                'zh' => '步入黎文士门店，仿佛回到难得的宁静天地。这里完整保留了传统建筑的质朴韵味，温润木材、自然光线与淡淡草本清香交织其间。',
            ], JSON_UNESCAPED_UNICODE),
            'branch_intro_body_2' => json_encode([
                'vi' => 'Một điểm đến lý tưởng để tạm gác lại nhịp sống hối hả, thư giãn sâu và kết nối lại với chính mình.',
                'en' => 'An ideal destination to set aside the rush of life, relax deeply and reconnect with yourself.',
                'ja' => '慌ただしい日常を離れ、深くリラックスし、自分自身とつながり直すための理想的な場所です。',
                'ko' => '분주한 삶을 잠시 내려놓고 깊이 휴식하며 자신과 다시 연결되기에 이상적인 곳입니다.',
                'zh' => '是暂别忙碌生活、深度放松、重新与自我连接的理想之地。',
            ], JSON_UNESCAPED_UNICODE),
            'branch_intro_cta' => json_encode([
                'vi' => 'Khám phá chi tiết',
                'en' => 'Explore in detail',
                'ja' => '詳しく見る',
                'ko' => '자세히 보기',
                'zh' => '查看详情',
            ], JSON_UNESCAPED_UNICODE),
            'branch_intro_caption' => json_encode([
                'vi' => 'Góc nhỏ bình yên tại {{name}}',
                'en' => 'A peaceful corner at {{name}}',
                'ja' => '{{name}} の静かな一角',
                'ko' => '{{name}}의 평온한 한 켠',
                'zh' => '{{name}} 的宁静一隅',
            ], JSON_UNESCAPED_UNICODE),
        ]);
    }

    public function down(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'branch_intro_title',
                'branch_intro_eyebrow',
                'branch_intro_subheading',
                'branch_intro_heading',
                'branch_intro_body_1',
                'branch_intro_body_2',
                'branch_intro_cta',
                'branch_intro_caption',
            ]);
        });
    }
};
