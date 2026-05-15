<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Branch;
use App\Models\Page;
use App\Models\Service;
use App\Models\TranslationString;
use Illuminate\Database\Seeder;

/**
 * Import bản dịch ja / ko / zh cho tất cả content trong DB.
 * Chạy: php artisan db:seed --class=TranslationImportSeeder
 */
class TranslationImportSeeder extends Seeder
{
    public function run(): void
    {
        $this->services();
        $this->blogPosts();
        $this->pages();
        $this->uiStrings();

        $this->command->info('✓ Import bản dịch ja/ko/zh hoàn tất.');
    }

    // ─────────────────────────────────────────────
    // SERVICES
    // ─────────────────────────────────────────────
    private function services(): void
    {
        $data = [
            'aroma-oil-massage' => [
                'name' => [
                    'ja' => 'アロマオイルマッサージ',
                    'ko' => '아로마 오일 마사지',
                    'zh' => '香薰精油按摩',
                ],
                'description' => [
                    'ja' => '天然精油でリラックス。',
                    'ko' => '천연 에센셜 오일로 편안한 휴식.',
                    'zh' => '天然精油助您放松身心。',
                ],
            ],
            'hot-stone-massage' => [
                'name' => [
                    'ja' => 'ホットストーンマッサージ',
                    'ko' => '핫스톤 마사지',
                    'zh' => '热石按摩',
                ],
                'description' => [
                    'ja' => '温かいバサルトストーンで筋肉の緊張をほぐします。',
                    'ko' => '뜨거운 현무암으로 근육 긴장을 해소합니다.',
                    'zh' => '热玄武岩石舒缓肌肉紧张。',
                ],
            ],
            'thai-massage' => [
                'name' => [
                    'ja' => 'タイ古式マッサージ',
                    'ko' => '태국식 마사지',
                    'zh' => '泰式古法按摩',
                ],
                'description' => [
                    'ja' => 'タイ式ツボ押しとストレッチ。',
                    'ko' => '태국식 지압과 스트레칭.',
                    'zh' => '泰式穴位按压与伸展。',
                ],
            ],
            'gua-sha-facial' => [
                'name' => [
                    'ja' => 'グアシャフェイシャル',
                    'ko' => '괄사 페이셜',
                    'zh' => '刮痧面部护理',
                ],
                'description' => [
                    'ja' => 'ジェイドグアシャで顔の血行を促進します。',
                    'ko' => '옥 괄사로 얼굴 혈액순환을 촉진합니다.',
                    'zh' => '玉石刮痧促进面部气血循环。',
                ],
            ],
            'head-spa-21-steps' => [
                'name' => [
                    'ja' => 'ヘッドスパ 21ステップ',
                    'ko' => '헤드스파 21단계',
                    'zh' => '21步头皮水疗',
                ],
                'description' => [
                    'ja' => '指圧と組み合わせた養生ヘッドスパ21ステップ。',
                    'ko' => '지압을 결합한 21단계 두피 양생 케어.',
                    'zh' => '结合穴位按压的21步养生洗发护理。',
                ],
            ],
            'foot-spa-reflexology' => [
                'name' => [
                    'ja' => 'フットリフレクソロジー',
                    'ko' => '발 반사 요법',
                    'zh' => '足部反射疗法',
                ],
                'description' => [
                    'ja' => 'ハーブフットバス＋足つぼマッサージ。',
                    'ko' => '한방 족욕 + 발 지압 마사지.',
                    'zh' => '草药泡脚 + 足部穴位按摩。',
                ],
            ],
            'combo-shampoo-massage' => [
                'name' => [
                    'ja' => 'シャンプー＋マッサージコンボ',
                    'ko' => '샴푸 + 마사지 콤보',
                    'zh' => '洗头 + 按摩套餐',
                ],
                'description' => [
                    'ja' => 'ヘッドスパ＋ボディマッサージ60分。',
                    'ko' => '헤드스파 + 전신 마사지 60분.',
                    'zh' => '头皮水疗 + 全身按摩60分钟。',
                ],
            ],
            'mahabalance-signature' => [
                'name' => [
                    'ja' => 'マハバランス シグネチャー',
                    'ko' => '마하밸런스 시그니처',
                    'zh' => 'Mahabalance 招牌疗程',
                ],
                'description' => [
                    'ja' => 'シグネチャー120分：身体・心・精神のバランス。',
                    'ko' => '시그니처 120분: 몸·마음·정신의 균형.',
                    'zh' => '招牌疗程：120分钟身心灵平衡。',
                ],
            ],
        ];

        foreach ($data as $slug => $fields) {
            $service = Service::where('slug', $slug)->first();
            if (! $service) continue;
            foreach ($fields as $field => $translations) {
                foreach ($translations as $locale => $value) {
                    $service->setTranslation($field, $locale, $value);
                }
            }
            $service->saveQuietly();
            $this->command->line("  Service: {$slug}");
        }
    }

    // ─────────────────────────────────────────────
    // BLOG POSTS
    // ─────────────────────────────────────────────
    private function blogPosts(): void
    {
        $data = [
            'head-spa-21-steps' => [
                'title' => [
                    'ja' => '21ステップヘッドスパ — 髪と頭皮のウェルネス',
                    'ko' => '21단계 헤드스파 — 모발과 두피 웰니스',
                    'zh' => '21步头皮水疗 — 头发与头皮健康',
                ],
                'excerpt' => [
                    'ja' => '伝統的な指圧を組み合わせたヘッドスパルーティン。',
                    'ko' => '전통 지압을 결합한 헤드스파 루틴.',
                    'zh' => '结合传统穴位按压的头皮水疗方案。',
                ],
            ],
        ];

        foreach ($data as $slug => $fields) {
            $post = BlogPost::where('slug', $slug)->first();
            if (! $post) continue;
            foreach ($fields as $field => $translations) {
                foreach ($translations as $locale => $value) {
                    $post->setTranslation($field, $locale, $value);
                }
            }
            $post->saveQuietly();
            $this->command->line("  BlogPost: {$slug}");
        }
    }

    // ─────────────────────────────────────────────
    // PAGES
    // ─────────────────────────────────────────────
    private function pages(): void
    {
        $data = [
            'home' => [
                'title' => [
                    'ja' => 'ホーム',
                    'ko' => '홈',
                    'zh' => '首页',
                ],
            ],
        ];

        foreach ($data as $slug => $fields) {
            $page = Page::where('slug', $slug)->first();
            if (! $page) continue;
            foreach ($fields as $field => $translations) {
                foreach ($translations as $locale => $value) {
                    $page->setTranslation($field, $locale, $value);
                }
            }
            $page->saveQuietly();
            $this->command->line("  Page: {$slug}");
        }
    }

    // ─────────────────────────────────────────────
    // UI STRINGS (translation_strings table)
    // ─────────────────────────────────────────────
    private function uiStrings(): void
    {
        $strings = [
            'nav.home'        => ['ja' => 'ホーム',         'ko' => '홈',       'zh' => '首页'],
            'nav.about'       => ['ja' => 'について',        'ko' => '소개',      'zh' => '关于我们'],
            'nav.services'    => ['ja' => 'サービス',        'ko' => '서비스',    'zh' => '服务项目'],
            'nav.booking'     => ['ja' => '予約する',        'ko' => '예약하기',  'zh' => '立即预约'],
            'nav.voucher'     => ['ja' => 'バウチャー',      'ko' => '바우처',    'zh' => '优惠券'],
            'nav.gallery'     => ['ja' => 'ギャラリー',      'ko' => '갤러리',    'zh' => '图片展示'],
            'nav.promotions'  => ['ja' => 'キャンペーン',    'ko' => '프로모션',  'zh' => '优惠活动'],
            'nav.blog'        => ['ja' => 'ブログ',          'ko' => '블로그',    'zh' => '博客'],
            'nav.contact'     => ['ja' => 'お問い合わせ',    'ko' => '문의',      'zh' => '联系我们'],
            'nav.myBookings'  => ['ja' => '予約履歴',        'ko' => '예약 내역', 'zh' => '我的预约'],
            'nav.login'       => ['ja' => 'ログイン',        'ko' => '로그인',    'zh' => '登录'],
            'nav.register'    => ['ja' => '新規登録',        'ko' => '회원가입',  'zh' => '注册'],
            'nav.logout'      => ['ja' => 'ログアウト',      'ko' => '로그아웃',  'zh' => '退出登录'],
            'common.loading'  => ['ja' => '読み込み中...',   'ko' => '로딩 중...','zh' => '加载中...'],
            'common.submit'   => ['ja' => '送信',            'ko' => '제출',      'zh' => '提交'],
            'common.cancel'   => ['ja' => 'キャンセル',      'ko' => '취소',      'zh' => '取消'],
            'common.save'     => ['ja' => '保存',            'ko' => '저장',      'zh' => '保存'],
            'common.back'     => ['ja' => '戻る',            'ko' => '뒤로',      'zh' => '返回'],
            'common.next'     => ['ja' => '次へ',            'ko' => '다음',      'zh' => '下一步'],
            'common.bookNow'  => ['ja' => '今すぐ予約',      'ko' => '지금 예약', 'zh' => '立即预约'],
            'common.readMore' => ['ja' => '続きを読む',      'ko' => '더 읽기',   'zh' => '阅读更多'],
            'home.hero.title' => [
                'ja' => '身体・心・精神のバランスへの旅',
                'ko' => '몸·마음·정신의 균형을 찾는 여정',
                'zh' => '开启身心灵平衡的旅程',
            ],
            'home.hero.subtitle' => [
                'ja' => 'Maha Spa — ダナンで体験するベトナム伝統スパ',
                'ko' => 'Maha Spa — 다낭에서 경험하는 베트남 전통 스파',
                'zh' => 'Maha Spa — 在岘港体验越南传统水疗',
            ],
            'footer.tagline' => [
                'ja' => '身体・心・精神のバランスへの旅の始まり',
                'ko' => '몸·마음·정신의 균형을 찾는 여정의 시작',
                'zh' => '开启身心灵平衡旅程的起点',
            ],
            'footer.branches' => ['ja' => '店舗',     'ko' => '지점',    'zh' => '门店'],
            'footer.contact'  => ['ja' => 'お問い合わせ', 'ko' => '문의', 'zh' => '联系我们'],
            'footer.follow'   => ['ja' => 'フォローする', 'ko' => '팔로우', 'zh' => '关注我们'],
            'footer.rights'   => [
                'ja' => '© {{year}} Maha Spa. 無断転載禁止。',
                'ko' => '© {{year}} Maha Spa. 모든 권리 보유.',
                'zh' => '© {{year}} Maha Spa. 版权所有。',
            ],
        ];

        foreach ($strings as $dotKey => $translations) {
            [$group, $key] = explode('.', $dotKey, 2);
            $row = TranslationString::where('group', $group)->where('key', $key)->first();
            if (! $row) continue;

            $values = $row->values ?? [];
            foreach ($translations as $locale => $value) {
                $values[$locale] = $value;
            }
            $row->update(['values' => $values]);
            $this->command->line("  UI: {$dotKey}");
        }
    }
}
