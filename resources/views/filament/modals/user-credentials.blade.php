@php
    $combined = "Email: {$email}\nMật khẩu: {$password}";
@endphp

<div x-data="{ copied: null }" style="display: flex; flex-direction: column; gap: 0.75rem;">
    <div style="border-radius: 0.75rem; border: 1px solid #e5e7eb; overflow: hidden;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">
            <div style="min-width: 0;">
                <p style="font-size: 0.6875rem; font-weight: 600; color: #6b7280; margin: 0;">Email</p>
                <p style="font-family: ui-monospace, monospace; font-size: 0.875rem; color: #111827; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin: 0;">{{ $email }}</p>
            </div>
            <button
                type="button"
                x-on:click="navigator.clipboard.writeText(@js($email)); copied = 'email'; setTimeout(() => (copied === 'email') && (copied = null), 1500)"
                class="mm-btn mm-btn-copy"
                :class="copied === 'email' ? 'mm-btn-copy--done' : ''"
                style="flex: 0 0 auto;"
            >
                <span x-show="copied !== 'email'">Sao chép</span>
                <span x-show="copied === 'email'" x-cloak>Đã sao chép ✓</span>
            </button>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.75rem;">
            <div style="min-width: 0;">
                <p style="font-size: 0.6875rem; font-weight: 600; color: #6b7280; margin: 0;">Mật khẩu</p>
                <p style="font-family: ui-monospace, monospace; font-size: 0.875rem; color: #111827; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin: 0;">{{ $password }}</p>
            </div>
            <button
                type="button"
                x-on:click="navigator.clipboard.writeText(@js($password)); copied = 'password'; setTimeout(() => (copied === 'password') && (copied = null), 1500)"
                class="mm-btn mm-btn-copy"
                :class="copied === 'password' ? 'mm-btn-copy--done' : ''"
                style="flex: 0 0 auto;"
            >
                <span x-show="copied !== 'password'">Sao chép</span>
                <span x-show="copied === 'password'" x-cloak>Đã sao chép ✓</span>
            </button>
        </div>
    </div>

    <button
        type="button"
        x-on:click="navigator.clipboard.writeText(@js($combined)); copied = 'both'; setTimeout(() => (copied === 'both') && (copied = null), 1500)"
        class="mm-btn mm-btn-copy"
        style="width: 100%; padding: 0.6rem;"
        :class="copied === 'both' ? 'mm-btn-copy--done' : ''"
    >
        <span x-show="copied !== 'both'">Sao chép cả email &amp; mật khẩu</span>
        <span x-show="copied === 'both'" x-cloak>Đã sao chép ✓</span>
    </button>

    <p style="font-size: 0.75rem; color: #b91c1c; margin: 0;">
        ⚠️ Mật khẩu chỉ hiển thị một lần duy nhất tại đây — hãy sao chép và gửi ngay cho nhân sự trước khi đóng cửa sổ này.
    </p>
</div>

<style>
    .mm-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.3rem;
        padding: 0.4rem 0.75rem;
        border-radius: 0.5rem;
        border: 1px solid transparent;
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        cursor: pointer;
        transition: background-color .15s ease, border-color .15s ease, color .15s ease, transform .1s ease;
    }
    .mm-btn:active { transform: scale(0.96); }

    .mm-btn-copy {
        background: #556B3F;
        border-color: #556B3F;
        color: #ffffff;
    }
    .mm-btn-copy:hover { background: #425436; border-color: #425436; }
    .mm-btn-copy--done,
    .mm-btn-copy--done:hover {
        background: #ecfdf5;
        border-color: #a7f3d0;
        color: #15803d;
    }
</style>
