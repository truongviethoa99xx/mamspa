<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessage;
use App\Models\Branch;
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

        return Inertia::render('Contact', [
            'content' => [
                'seo_description' => $content->seo_description,
                'heading' => $content->heading,
                'email' => $content->email ?: $site->email,
                'map_embed_url' => $content->map_embed_url,
            ],
            'branches' => Branch::where('is_active', true)->orderBy('id')->get()
                ->map(fn ($b) => [
                    'slug' => $b->slug,
                    'name' => $b->name,
                    'address' => $b->address,
                    'phone' => $b->phone,
                    'lat' => $b->lat,
                    'lng' => $b->lng,
                ])->all(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'email' => ['nullable', 'email', 'not_regex:/[\r\n]/'],
            'phone' => ['nullable', 'regex:/^0\d{8,10}$/'],
            'subject' => 'required|string|max:200',
            'message' => 'required|string|max:2000',
        ], [
            'name.required' => 'Vui lòng nhập họ tên.',
            'email.email' => 'Email không hợp lệ.',
            'phone.regex' => 'Số điện thoại không hợp lệ (bắt đầu bằng 0, gồm 9-11 chữ số).',
            'subject.required' => 'Vui lòng nhập chủ đề.',
            'message.required' => 'Vui lòng nhập nội dung lời nhắn.',
        ]);

        ContactSubmission::create($data);

        try {
            Mail::to(config('mail.from.address'))->send(new ContactMessage($data));
        } catch (\Throwable $e) {
            report($e);
        }

        return back()->with('success', 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm.');
    }
}
