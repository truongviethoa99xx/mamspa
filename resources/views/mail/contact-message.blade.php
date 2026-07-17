<x-mail::message>
# Liên hệ mới từ website

- **Họ tên:** {{ $p['name'] }}
- **Email:** {{ $p['email'] ?? '(không có)' }}
- **SĐT:** {{ $p['phone'] ?? '(không có)' }}
- **Chi nhánh quan tâm:** {{ $p['branch'] ?? '(không có)' }}
- **Chủ đề:** {{ $p['subject'] }}

**Nội dung:**

{{ $p['message'] }}
</x-mail::message>
