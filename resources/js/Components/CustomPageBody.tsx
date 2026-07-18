import { useEffect } from 'react';

export interface CustomPageBodyData {
    html?: string | null;
    css?: string | null;
    js?: string | null;
}

const STYLE_ID = 'custom-page-body-style';

/**
 * Render nội dung HTML/CSS/JS do admin tự nhập ở CustomPageResource. JS không thể chạy
 * qua dangerouslySetInnerHTML (React bỏ qua thẻ <script> chèn kiểu này) nên phải tạo
 * <script> thủ công. Cleanup khi rời trang (điều hướng SPA qua Inertia) để không rò rỉ
 * style/script sang trang kế tiếp — lưu ý: side effect JS đã chạy (vd listener gắn vào
 * window) không tự huỷ khi gỡ thẻ <script>, code JS nhập vào đây cần tự dọn dẹp nếu cần.
 */
export function CustomPageBody({ html, css, js }: CustomPageBodyData) {
    useEffect(() => {
        if (!css) {
            return;
        }

        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = css;
        document.head.appendChild(style);

        return () => {
            style.remove();
        };
    }, [css]);

    useEffect(() => {
        if (!js) {
            return;
        }

        const script = document.createElement('script');
        script.textContent = js;
        document.body.appendChild(script);

        return () => {
            script.remove();
        };
    }, [js]);

    if (!html) {
        return null;
    }

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
