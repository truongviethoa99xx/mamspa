import { useEffect, useRef } from 'react';

interface ReviewEmbedProps {
    /**
     * Mã nhúng HTML thô (vd. widget Elfsight: <script ...></script><div ...></div>),
     * hoặc chỉ Share Link URL (vd. https://xxxx.elf.site) — sẽ tự bọc thành iframe.
     */
    html?: string | null;
    className?: string;
}

/**
 * Nếu chỉ là một URL trần (Share Link Elfsight) thì bọc thành iframe tự co giãn;
 * còn lại trả nguyên (đã là mã nhúng đầy đủ).
 */
function normalizeEmbed(raw: string): string {
    const trimmed = raw.trim();
    if (/^https?:\/\/[^\s<>"']+$/.test(trimmed)) {
        return (
            '<script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.10/iframeResizer.min.js"></script>' +
            `<iframe onload="iFrameResize(this)" src="${trimmed}" style="border:none;width:100%;"></iframe>`
        );
    }
    return raw;
}

/**
 * Render một đoạn mã nhúng bên thứ 3 (Elfsight / Google reviews...) và **thực
 * thi các thẻ <script>** bên trong — điều mà `innerHTML` mặc định không làm.
 *
 * Lưu ý bảo mật: nội dung do admin (vai trò nội dung) nhập nên được coi là tin
 * cậy. Không dùng cho dữ liệu từ người dùng cuối.
 */
export function ReviewEmbed({ html, className }: ReviewEmbedProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = ref.current;
        if (!container || !html) {
            return;
        }

        container.innerHTML = normalizeEmbed(html);

        // Thẻ <script> chèn qua innerHTML không tự chạy → tạo lại để trình duyệt thực thi.
        const scripts = Array.from(container.querySelectorAll('script'));
        for (const old of scripts) {
            const script = document.createElement('script');
            for (const attr of Array.from(old.attributes)) {
                script.setAttribute(attr.name, attr.value);
            }
            script.text = old.textContent ?? '';
            old.replaceWith(script);
        }

        return () => {
            container.innerHTML = '';
        };
    }, [html]);

    if (!html) {
        return null;
    }

    return <div ref={ref} className={className} />;
}
