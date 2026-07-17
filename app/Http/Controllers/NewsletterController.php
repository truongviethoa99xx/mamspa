<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscriber;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        // Honeypot: trường ẩn chỉ bot mới điền — không hiển thị lỗi validate cụ thể để tránh gợi ý cho bot.
        if ($request->filled('website')) {
            return back()->with('success', 'Cảm ơn bạn đã đăng ký.');
        }

        $data = $request->validate([
            'email' => ['required', 'email', 'max:190', 'unique:newsletter_subscribers,email'],
        ], [
            'email.required' => 'Vui lòng nhập email.',
            'email.email' => 'Email không hợp lệ.',
            'email.unique' => 'Email này đã đăng ký nhận tin.',
        ]);

        NewsletterSubscriber::create($data);

        return back()->with('success', 'Cảm ơn bạn đã đăng ký nhận tin từ Mầm.');
    }
}
