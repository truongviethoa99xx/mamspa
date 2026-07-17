<?php

namespace App\Http\Controllers;

use App\Models\AboutPageContent;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Trang "Về Mầm" — 10 khối nội dung tĩnh quản lý ở /admin/about-page-settings.
 * Field trống ở CMS sẽ fallback về nội dung mặc định (vi/en) khớp bản thiết kế gốc,
 * để trang luôn có nội dung đầy đủ ngay cả khi admin chưa nhập liệu.
 */
class GioiThieuController extends Controller
{
    public function index(): Response
    {
        $content = AboutPageContent::current();

        return Inertia::render('GioiThieu', [
            'hero' => $this->hero($content),
            'story' => $this->story($content),
            'philosophy' => $this->philosophy($content),
            'healingJourneys' => $this->healingJourneys($content),
            'approach' => $this->approach($content),
            'spaces' => $this->spaces($content),
            'people' => $this->people($content),
            'experiences' => $this->experiences($content),
            'missionVision' => $this->missionVision($content),
            'journey' => $this->journey($content),
            'invitation' => $this->invitation($content),
            // Cờ ẩn/hiện từng khối, chỉnh trong /admin/about-page-settings.
            'sectionVisibility' => [
                'hero' => (bool) $content->hero_visible,
                'story' => (bool) $content->story_visible,
                'philosophy' => (bool) $content->philosophy_visible,
                'healingJourneys' => (bool) $content->features_visible,
                'approach' => (bool) $content->approach_visible,
                'spaces' => (bool) $content->spaces_visible,
                'people' => (bool) $content->people_visible,
                'experiences' => (bool) $content->experiences_visible,
                'missionVision' => (bool) $content->mission_vision_visible,
                'journey' => (bool) $content->journey_visible,
                'invitation' => (bool) $content->invitation_visible,
            ],
        ]);
    }

    /** Banner đầu trang — cùng component/kiểu dáng với banner trang chủ (full-bleed, không nút CTA). */
    protected function hero(AboutPageContent $content): array
    {
        return [
            'heading' => $content->hero_title ?: ['vi' => '<p>Về Mầm</p>', 'en' => '<p>About Mầm</p>'],
            'subtitle' => $content->hero_subtitle ?: [
                'vi' => '<p>Tinh hoa trị liệu Việt. Chăm sóc từ tâm.</p>',
                'en' => '<p>The essence of Vietnamese therapy. Care from the heart.</p>',
            ],
            'image' => $this->publicUrl($content->hero_image),
            'image_alt' => $content->hero_image_alt ?: ['vi' => 'Về Mầm Spa', 'en' => 'About Mầm Spa'],
        ];
    }

    protected function story(AboutPageContent $content): array
    {
        return [
            'heading' => $content->story_heading ?: ['vi' => 'Our Story', 'en' => 'Our Story'],
            'body' => $content->story_p1 ?: [
                'vi' => '<p>Mầm Spa ra đời từ sự trân quý những tri thức lặng thầm của nghệ thuật trị liệu Việt — nơi từng chạm tay không chỉ là kỹ thuật, mà là một ngôn ngữ của sự chăm sóc.</p><p>Chúng tôi mong được cùng bạn gieo những hạt mầm tốt tươi vào bên trong, bằng những liệu pháp chăm sóc chuyên nghiệp, để sức khỏe, sự bình yên và nguồn năng lượng tích cực được nuôi dưỡng mỗi ngày.</p>',
                'en' => '<p>Mầm Spa was born from a deep appreciation of the quiet wisdom of Vietnamese healing arts — where every touch is not just technique, but a language of care.</p><p>We hope to sow good seeds within you through professional care therapies, nurturing health, peace and positive energy every day.</p>',
            ],
            'image' => $this->publicUrl($content->story_image),
            'image_alt' => $content->story_image_alt ?: null,
        ];
    }

    protected function philosophy(AboutPageContent $content): array
    {
        return [
            'heading' => $content->philosophy_heading ?: ['vi' => 'Our Philosophy', 'en' => 'Our Philosophy'],
            'title' => $content->philosophy_title ?: [
                'vi' => '<p>Rooted in Vietnamese Healing Traditions.</p>',
                'en' => '<p>Rooted in Vietnamese Healing Traditions.</p>',
            ],
            'body' => $content->philosophy_p1 ?: [
                'vi' => '<p>Chúng tôi tin rằng, khi cơ thể được lắng nghe và chăm sóc đúng cách, sự cân bằng sẽ tự nhiên được khôi phục.</p><p>Tại Mầm, an lành không phải là điều được trao. Đó là điều được đánh thức từ chính bên trong bạn.</p>',
                'en' => '<p>We believe that when the body is listened to and cared for properly, balance is naturally restored.</p><p>At Mầm, wellbeing is not something given. It is something awakened from within you.</p>',
            ],
            'image' => $this->publicUrl($content->philosophy_image),
            'image_alt' => $content->philosophy_image_alt ?: null,
        ];
    }

    protected function healingJourneys(AboutPageContent $content): array
    {
        $items = $content->features ?: [
            ['image' => null, 'image_alt' => null, 'title' => ['vi' => 'Vietnamese Healing Therapy', 'en' => 'Vietnamese Healing Therapy'], 'description' => ['vi' => 'Tinh hoa day ấn huyệt cổ truyền Việt Nam.', 'en' => 'The essence of traditional Vietnamese acupressure.']],
            ['image' => null, 'image_alt' => null, 'title' => ['vi' => 'Head Spa & Scalp Care', 'en' => 'Head Spa & Scalp Care'], 'description' => ['vi' => 'Nuôi dưỡng da đầu, mái tóc và sự thư thái.', 'en' => 'Nourishing the scalp, hair and a sense of calm.']],
            ['image' => null, 'image_alt' => null, 'title' => ['vi' => 'Natural Facial Care', 'en' => 'Natural Facial Care'], 'description' => ['vi' => 'Chăm sóc làn da khỏe mạnh một cách tự nhiên.', 'en' => 'Caring for healthy skin, naturally.']],
            ['image' => null, 'image_alt' => null, 'title' => ['vi' => 'Signature Rituals', 'en' => 'Signature Rituals'], 'description' => ['vi' => 'Những hành trình chăm sóc đặc trưng được tuyển chọn.', 'en' => 'Curated, signature care journeys.']],
        ];

        return [
            'eyebrow' => $content->features_eyebrow ?: ['vi' => '4 Healing Journeys', 'en' => '4 Healing Journeys'],
            'items' => $this->withPublicImages($items, 'image'),
        ];
    }

    protected function approach(AboutPageContent $content): array
    {
        $features = $content->approach_features ?: [
            ['icon' => 'heart-hands', 'title' => ['vi' => 'Lắng nghe cơ thể', 'en' => 'Listen to the body']],
            ['icon' => 'leaf', 'title' => ['vi' => 'Thảo mộc thiên nhiên', 'en' => 'Natural herbs']],
            ['icon' => 'graduation-cap', 'title' => ['vi' => 'Đội ngũ được đào tạo bài bản', 'en' => 'A well-trained team']],
        ];

        return [
            'title' => $content->approach_title ?: ['vi' => '<p>Chăm sóc theo nhu cầu, không theo khuôn mẫu.</p>', 'en' => '<p>Care tailored to you, never to a mold.</p>'],
            'p1' => $content->approach_p1 ?: [
                'vi' => '<p>Lấy cảm hứng từ tinh hoa trị liệu truyền thống Việt Nam kết hợp cùng nền tảng chuyên môn hiện đại, Vietnamese Healing Therapy được xây dựng với niềm tin rằng mỗi cơ thể đều xứng đáng được chăm sóc theo cách phù hợp nhất.</p>',
                'en' => '<p>Inspired by the essence of traditional Vietnamese therapy combined with modern expertise, Vietnamese Healing Therapy is built on the belief that every body deserves care suited to its own needs.</p>',
            ],
            'image' => $this->publicUrl($content->approach_image),
            'image_alt' => $content->approach_image_alt ?: null,
            'features' => $features,
        ];
    }

    protected function spaces(AboutPageContent $content): array
    {
        $items = $content->spaces ?: [
            [
                'image' => null,
                'image_alt' => null,
                'title' => ['vi' => '<p>Mầm Spa</p>', 'en' => '<p>Mầm Spa</p>'],
                'description' => [
                    'vi' => '<p>Một không gian hiện đại cùng thiên nhiên, nơi mỗi trải nghiệm bắt đầu bằng sự thư thái và kết thúc bằng sự cân bằng.</p>',
                    'en' => '<p>A modern space in touch with nature, where every experience begins in relaxation and ends in balance.</p>',
                ],
            ],
        ];

        return [
            'title' => $content->spaces_title ?: ['vi' => '<p>Our Spaces</p>', 'en' => '<p>Our Spaces</p>'],
            'intro' => $content->spaces_intro ?: [
                'vi' => '<p>Hai không gian. Một triết lý chăm sóc. Mỗi không gian mang một cá tính riêng, nhưng cùng giữ gìn một tinh thần chữa lành và tiêu chuẩn chăm sóc nhất quán.</p>',
                'en' => '<p>Two spaces. One philosophy of care. Each carries its own character, yet shares the same healing spirit and consistent standard of care.</p>',
            ],
            'items' => $this->withPublicImages($items, 'image'),
        ];
    }

    protected function people(AboutPageContent $content): array
    {
        return [
            'title' => $content->people_title ?: ['vi' => '<p>Đội ngũ Mầm</p>', 'en' => '<p>The Mầm Team</p>'],
            'p1' => $content->people_p1 ?: [
                'vi' => '<p>Đằng sau mỗi trải nghiệm là một hệ thống đào tạo được xây dựng trên cùng một tiêu chuẩn chuyên môn, tinh thần hiếu khách và triết lý chăm sóc.</p><p>Chúng tôi không đặt mục tiêu xây dựng một đội ngũ đông đảo, mà lựa chọn xây dựng một đội ngũ cùng chung tiêu chuẩn, cùng chung tư duy và cùng gìn giữ những giá trị mà Mầm theo đuổi.</p>',
                'en' => '<p>Behind every experience is a training system built on the same standard of expertise, hospitality and philosophy of care.</p><p>We do not aim to build a large team, but a team that shares the same standards, the same mindset, and upholds the same values Mầm stands for.</p>',
            ],
            'image' => $this->publicUrl($content->people_image),
            'image_alt' => $content->people_image_alt ?: null,
        ];
    }

    protected function experiences(AboutPageContent $content): array
    {
        $items = $content->testimonials ?: [
            ['source' => 'google', 'rating' => 5, 'quote' => ['vi' => '<p>Một trải nghiệm tuyệt vời! Không gian yên tĩnh, nhân viên chu đáo và tận tâm.</p>', 'en' => '<p>A wonderful experience! Quiet space, attentive and caring staff.</p>'], 'author_name' => 'Hannah L.', 'author_meta' => null],
            ['source' => 'tripadvisor', 'rating' => 5, 'quote' => ['vi' => '<p>Best massage in Saigon! Professional, relaxing and beautiful space. Highly recommended.</p>', 'en' => '<p>Best massage in Saigon! Professional, relaxing and beautiful space. Highly recommended.</p>'], 'author_name' => 'Michael T.', 'author_meta' => null],
            ['source' => 'quote', 'rating' => null, 'quote' => ['vi' => '<p>Tôi cảm thấy cơ thể nhẹ nhàng hơn rất nhiều sau liệu trình. Mọi thứ ở Mầm đều tinh tế và chỉn chu.</p>', 'en' => '<p>I felt so much lighter after the treatment. Everything at Mầm is refined and thoughtfully done.</p>'], 'author_name' => 'Thúy N.', 'author_meta' => ['vi' => '<p>Khách hàng thân thiết</p>', 'en' => '<p>Loyal customer</p>']],
            ['source' => 'quote', 'rating' => null, 'quote' => ['vi' => '<p>Không gian ấm áp, mùi hương dễ chịu, nhân viên rất tận tâm. Mầm thực sự là nơi để chữa lành.</p>', 'en' => '<p>A warm space, a pleasant scent, and truly caring staff. Mầm really is a place to heal.</p>'], 'author_name' => 'Jessica K.', 'author_meta' => ['vi' => '<p>From Singapore</p>', 'en' => '<p>From Singapore</p>']],
        ];

        return [
            'title' => $content->experiences_title ?: ['vi' => '<p>Customer Experiences</p>', 'en' => '<p>Customer Experiences</p>'],
            'intro' => $content->experiences_intro ?: [
                'vi' => '<p>Hàng chục nghìn lượt khách trong nước và quốc tế đã lựa chọn Mầm như một điểm đến nghỉ ngơi và tái tạo năng lượng. Những lời chia sẻ chân thành của khách hàng là minh chứng rõ nét nhất cho hành trình mà Mầm đang bền bỉ theo đuổi.</p>',
                'en' => '<p>Tens of thousands of guests, local and international, have chosen Mầm as a destination to rest and recharge. Their honest words are the clearest proof of the journey Mầm continues to pursue.</p>',
            ],
            'items' => $items,
        ];
    }

    protected function missionVision(AboutPageContent $content): array
    {
        return [
            'title' => $content->mission_vision_title ?: ['vi' => '<p>Our Mission & Vision</p>', 'en' => '<p>Our Mission & Vision</p>'],
            'mission' => [
                'title' => $content->mission_title ?: ['vi' => '<p>Our Mission</p>', 'en' => '<p>Our Mission</p>'],
                'description' => $content->mission_desc ?: [
                    'vi' => '<p>Mang tinh hoa trị liệu Việt đến gần hơn với cuộc sống hiện đại, mang những trải nghiệm chăm sóc chân thành, tinh tế và được cá nhân hoá.</p>',
                    'en' => '<p>Bringing the essence of Vietnamese therapy closer to modern life, with sincere, refined and personalised care experiences.</p>',
                ],
            ],
            'vision' => [
                'title' => $content->vision_title ?: ['vi' => '<p>Our Vision</p>', 'en' => '<p>Our Vision</p>'],
                'description' => $content->vision_desc ?: [
                    'vi' => '<p>Trở thành thương hiệu wellness mang bản sắc Việt được tin yêu bởi khách hàng trong nước và quốc tế.</p>',
                    'en' => '<p>To become a wellness brand with Vietnamese identity, trusted and loved by guests at home and abroad.</p>',
                ],
            ],
        ];
    }

    protected function journey(AboutPageContent $content): array
    {
        return [
            'title' => $content->journey_title ?: ['vi' => '<p>Our Journey</p>', 'en' => '<p>Our Journey</p>'],
            'intro' => $content->journey_intro ?: [
                'vi' => '<p>Mỗi vị khách, mỗi đối tác và mỗi dấu mốc đều góp phần tạo nên hành trình của Mầm.</p>',
                'en' => '<p>Every guest, every partner and every milestone has shaped the journey of Mầm.</p>',
            ],
            'images' => $this->withPublicImages($content->journey_images ?: [], 'image'),
        ];
    }

    protected function invitation(AboutPageContent $content): array
    {
        return [
            'title' => $content->invitation_title ?: ['vi' => '<p>A Gentle Invitation</p>', 'en' => '<p>A Gentle Invitation</p>'],
            'p1' => $content->invitation_p1 ?: [
                'vi' => '<p>Giữa những chuyển động không ngừng của cuộc sống, ai cũng cần một khoảng lặng để nghỉ ngơi, hít thở và trở về với chính mình.</p><p>Một không gian dành cho những ai tìm kiếm nhiều hơn sự thư giãn. Nơi cơ thể được lắng nghe, tâm trí được nâng đỡ, và từng liệu trình được thực hiện với sự hiện diện trọn vẹn.</p>',
                'en' => '<p>Amid the constant motion of life, everyone needs a quiet moment to rest, breathe and return to themselves.</p><p>A space for those seeking more than relaxation — where the body is heard, the mind is held, and every treatment is carried out with complete presence.</p>',
            ],
            'p2' => $content->invitation_p2 ?: [
                'vi' => '<p>Chúng tôi mong được chào đón bạn tại <strong>Mầm</strong> vào một ngày gần nhất.</p>',
                'en' => '<p>We look forward to welcoming you to <strong>Mầm</strong> soon.</p>',
            ],
            'buttonText' => $content->invitation_button_text ?: ['vi' => '<p>Đặt lịch ngay</p>', 'en' => '<p>Book now</p>'],
            'buttonUrl' => $content->invitation_button_url ?: '/dat-lich/',
            'image' => $this->publicUrl($content->invitation_image),
            'image_alt' => $content->invitation_image_alt ?: null,
        ];
    }

    private function withPublicImages(array $items, string $key = 'image'): array
    {
        return array_map(function (array $item) use ($key) {
            if (! empty($item[$key])) {
                $item[$key] = $this->publicUrl($item[$key]);
            }

            return $item;
        }, $items);
    }

    private function publicUrl(?string $path): ?string
    {
        if (! $path || str_starts_with($path, '/') || str_starts_with($path, 'http')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}
