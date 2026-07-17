<?php

namespace App\Http\Controllers;

use App\Jobs\NotifyAdminsOfContactSubmission;
use App\Mail\ContactMessage;
use App\Models\ContactPageContent;
use App\Models\ContactSubmission;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        $content = ContactPageContent::current();
        $site = SiteSetting::current();

        $branchItems = $this->branchItems($content);

        return Inertia::render('Contact', [
            'content' => [
                'seo_description' => $content->seo_description,
                'map_embed_url' => $content->map_embed_url,
            ],
            'hero' => [
                'heading' => $this->trOr($content->heading, ['vi' => '<p>Liên hệ</p>', 'en' => '<p>Contact</p>']),
                'subtitle' => $this->trOr($content->hero_subtitle, ['vi' => '<p>Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn trong hành trình chăm sóc sức khỏe.</p>', 'en' => '<p>We are always ready to listen and accompany you on your wellness journey.</p>']),
                'image' => $this->publicUrl($content->hero_image),
                'image_alt' => $this->trOr($content->hero_image_alt, ['vi' => 'Không gian Mầm Spa', 'en' => 'Mầm Spa space']),
            ],
            'branches' => [
                'title' => $this->trOr($content->branches_title, ['vi' => '<p>Hệ thống chi nhánh</p>', 'en' => '<p>Our Branches</p>']),
                'intro' => $this->trOr($content->branches_intro, ['vi' => '<p>Chọn chi nhánh gần bạn nhất để ghé thăm Mầm.</p>', 'en' => '<p>Choose the branch nearest to you to visit Mầm.</p>']),
                'directionsLabel' => $this->trOr($content->branches_directions_label, ['vi' => 'Xem đường đi', 'en' => 'Get directions']),
                'moreLabel' => $this->trOr($content->branches_more_label, ['vi' => 'Tìm hiểu thêm về chi nhánh', 'en' => 'Learn more about this branch']),
                'items' => collect($branchItems)->map(fn (array $item) => [
                    'image' => $this->publicUrl($item['image'] ?? null),
                    'image_alt' => $item['image_alt'] ?? null,
                    'name' => $item['name'] ?? null,
                    'address' => $item['address'] ?? null,
                    'phone' => $item['phone'] ?? null,
                    'open_hours' => $item['open_hours'] ?? null,
                    'hours_note' => $item['hours_note'] ?? null,
                    'directions_url' => $item['directions_url'] ?? null,
                    'link_url' => $item['link_url'] ?? null,
                ])->all(),
            ],
            'aboutBanner' => [
                'text' => $this->trOr($content->about_banner_text, ['vi' => '<p>Xem chi tiết về không gian, triết lý và đội ngũ tại Mầm.</p>', 'en' => '<p>See our spaces, philosophy and team at Mầm.</p>']),
                'linkText' => $this->trOr($content->about_banner_link_text, ['vi' => 'Khám phá về Mầm', 'en' => 'Discover Mầm']),
                'linkUrl' => $content->about_banner_link_url ?: '/gioi-thieu',
            ],
            'info' => [
                'title' => $this->trOr($content->info_title, ['vi' => '<p>Đặt lịch & Liên hệ</p>', 'en' => '<p>Booking & Contact</p>']),
                'intro' => $this->trOr($content->info_intro, ['vi' => '<p>Chọn cách thuận tiện nhất để kết nối với chúng tôi.</p>', 'en' => '<p>Choose the most convenient way to reach us.</p>']),
                'hotline' => $content->hotline ?: $site->hotline,
                'hotline_note' => $this->trOr($content->hotline_note, ['vi' => '<p>Hỗ trợ đặt lịch & tư vấn 10:00 - 21:00 (hàng ngày)</p>', 'en' => '<p>Booking & consultation support 10:00 - 21:00 (daily)</p>']),
                'zalo' => $content->zalo ?: 'Mầm Integrative Therapy',
                'zalo_note' => $this->trOr($content->zalo_note, ['vi' => '<p>Nhắn tin nhanh, phản hồi trong ngày</p>', 'en' => '<p>Fast messaging, same-day response</p>']),
                'email' => $content->email ?: $site->email,
                'email_note' => $this->trOr($content->email_note, ['vi' => '<p>Phản hồi trong vòng 24 giờ</p>', 'en' => '<p>Response within 24 hours</p>']),
                'instagram' => $content->instagram ?: '@mam.spa.therapy',
                'instagram_note' => $this->trOr($content->instagram_note, ['vi' => '<p>Cập nhật ưu đãi và thông tin mới nhất</p>', 'en' => '<p>Latest offers and updates</p>']),
            ],
            'form' => [
                'title' => $this->trOr($content->form_title, ['vi' => '<p>Gửi cho chúng tôi</p>', 'en' => '<p>Send us a message</p>']),
                'intro' => $this->trOr($content->form_intro, ['vi' => '<p>Điền thông tin, chúng tôi sẽ liên hệ lại với bạn sớm nhất.</p>', 'en' => '<p>Fill in your details and we will get back to you soon.</p>']),
                'privacyNote' => $this->trOr($content->form_privacy_note, ['vi' => 'Thông tin của bạn được bảo mật tuyệt đối', 'en' => 'Your information is kept strictly confidential']),
                'branchOptions' => collect($branchItems)
                    ->map(fn (array $item) => trim(strip_tags($item['name']['vi'] ?? '')))
                    ->filter()
                    ->map(fn (string $name) => ['value' => $name, 'label' => $name])
                    ->values()
                    ->all(),
            ],
            'closing' => [
                'title' => $this->trOr($content->closing_title, ['vi' => '<p>Mỗi trải nghiệm tại Mầm là một khoảng lặng chỉ dành cho bạn.</p>', 'en' => '<p>Every experience at Mầm is a quiet pause made just for you.</p>']),
                'image' => $this->publicUrl($content->closing_image),
                'image_alt' => $this->trOr($content->closing_image_alt, ['vi' => 'Không gian thư giãn Mầm Spa', 'en' => 'Mầm Spa relaxation space']),
                'buttonText' => $this->trOr($content->closing_button_text, ['vi' => 'Đặt lịch ngay', 'en' => 'Book now']),
                'buttonUrl' => $content->closing_button_url ?: '/dat-lich',
            ],
            'commitments' => [
                'items' => $content->commitments ?: [
                    ['icon' => 'Clock', 'title' => ['vi' => '<p>Giờ hoạt động</p>', 'en' => '<p>Opening hours</p>'], 'description' => ['vi' => '<p>10:00 - 21:00 hàng ngày (Last booking 21:00)</p>', 'en' => '<p>10:00 - 21:00 daily (last booking 21:00)</p>']],
                    ['icon' => 'Gift', 'title' => ['vi' => '<p>Không yêu cầu tip</p>', 'en' => '<p>No tipping required</p>'], 'description' => ['vi' => '<p>Gratuities at your discretion</p>', 'en' => '<p>Gratuities at your discretion</p>']],
                    ['icon' => 'Leaf', 'title' => ['vi' => '<p>Sản phẩm thiên nhiên</p>', 'en' => '<p>Natural products</p>'], 'description' => ['vi' => '<p>Lành tính & an toàn</p>', 'en' => '<p>Gentle & safe</p>']],
                    ['icon' => 'HeartHandshake', 'title' => ['vi' => '<p>Luôn sẵn lòng hỗ trợ</p>', 'en' => '<p>Always here to help</p>'], 'description' => ['vi' => '<p>Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>', 'en' => '<p>We are always happy to assist you</p>']],
                ],
            ],
            'sectionVisibility' => [
                'hero' => (bool) $content->hero_visible,
                'branches' => (bool) $content->branches_visible,
                'aboutBanner' => (bool) $content->about_banner_visible,
                'contactForm' => (bool) $content->contact_form_visible,
                'closing' => (bool) $content->closing_visible,
                'commitments' => (bool) $content->commitments_visible,
            ],
        ]);
    }

    protected function publicUrl(?string $path): ?string
    {
        return $path ? (str_starts_with($path, 'http') ? $path : "/storage/{$path}") : null;
    }

    /**
     * Fallback cho field đa ngôn ngữ (JSON {vi,en,...}). Filament lưu cả field chưa nhập
     * thành mảng toàn null (vd. {vi:null,en:null,...}) khi admin bấm Lưu — mảng này luôn
     * truthy nên toán tử `?:` không nhận ra là rỗng. Hàm này kiểm tra thực sự có ít nhất
     * 1 ngôn ngữ có nội dung trước khi fallback về giá trị mặc định.
     */
    protected function trOr(mixed $value, array $default): array
    {
        if (is_array($value) && collect($value)->contains(fn ($v) => filled($v))) {
            return $value;
        }

        return $default;
    }

    /**
     * Danh sách thẻ chi nhánh trên trang Liên hệ — nhập tay riêng trong CMS (không còn lấy
     * từ hệ thống chi nhánh/Branch cũ). "Xem đường đi"/"Tìm hiểu thêm" là link nhập tay,
     * có thể trỏ sang bài blog giới thiệu chi nhánh khi được tạo sau này.
     */
    protected function branchItems(ContactPageContent $content): array
    {
        return $content->branches_items ?: [
            [
                'image' => null,
                'image_alt' => ['vi' => 'Mầm Spa Phú Nhuận', 'en' => 'Mầm Spa Phú Nhuận'],
                'name' => ['vi' => '<p>Mầm Spa Phú Nhuận</p>', 'en' => '<p>Mầm Spa Phú Nhuận</p>'],
                'address' => ['vi' => '<p>12 Lê Văn Sỹ, Phường Phú Nhuận, TP. Hồ Chí Minh</p>', 'en' => '<p>12 Lê Văn Sỹ, Phú Nhuận Ward, Ho Chi Minh City</p>'],
                'phone' => '(+84) 965 80 6166',
                'open_hours' => '09:00 - 21:00',
                'hours_note' => ['vi' => '(Last booking 21:00)', 'en' => '(Last booking 21:00)'],
                'directions_url' => 'https://maps.google.com/?q='.urlencode('12 Lê Văn Sỹ, Phường Phú Nhuận, TP. Hồ Chí Minh'),
                'link_url' => null,
            ],
            [
                'image' => null,
                'image_alt' => ['vi' => 'Mầm Spa Bến Thành', 'en' => 'Mầm Spa Bến Thành'],
                'name' => ['vi' => '<p>Mầm Spa Bến Thành</p>', 'en' => '<p>Mầm Spa Bến Thành</p>'],
                'address' => ['vi' => '<p>45 Phạm Ngũ Lão, Phường Bến Thành, TP. Hồ Chí Minh</p>', 'en' => '<p>45 Phạm Ngũ Lão, Bến Thành Ward, Ho Chi Minh City</p>'],
                'phone' => '(+84) 965 80 6166',
                'open_hours' => '09:00 - 21:00',
                'hours_note' => ['vi' => '(Last booking 21:00)', 'en' => '(Last booking 21:00)'],
                'directions_url' => 'https://maps.google.com/?q='.urlencode('45 Phạm Ngũ Lão, Phường Bến Thành, TP. Hồ Chí Minh'),
                'link_url' => null,
            ],
        ];
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'email' => ['nullable', 'email', 'not_regex:/[\r\n]/'],
            'phone' => ['required', 'regex:/^0\d{8,10}$/'],
            'branch' => 'nullable|string|max:150',
            'message' => 'required|string|max:2000',
        ], [
            'name.required' => 'Vui lòng nhập họ tên.',
            'email.email' => 'Email không hợp lệ.',
            'phone.required' => 'Vui lòng nhập số điện thoại.',
            'phone.regex' => 'Số điện thoại không hợp lệ (bắt đầu bằng 0, gồm 9-11 chữ số).',
            'message.required' => 'Vui lòng nhập nội dung lời nhắn.',
        ]);

        $data['subject'] = $data['branch'] ?? null
            ? "Liên hệ - {$data['branch']}"
            : 'Liên hệ từ website';

        $submission = ContactSubmission::create($data);

        NotifyAdminsOfContactSubmission::dispatch($submission->id);

        try {
            Mail::to(config('mail.from.address'))->send(new ContactMessage($data));
        } catch (\Throwable $e) {
            report($e);
        }

        return back()->with('success', 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm.');
    }
}
