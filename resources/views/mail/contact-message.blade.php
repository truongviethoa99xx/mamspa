<x-mail::message>
# Liên hệ mới từ website

- **Họ tên:** {{ $p['name'] }}
- **Email:** {{ $p['email'] }}
- **SĐT:** {{ $p['phone'] ?? '(không có)' }}
- **Chủ đề:** {{ $p['subject'] }}

**Nội dung:**

{{ $p['message'] }}
</x-mail::message>
