<div
    wire:poll.15s="poll"
    x-data="{
        show: false,
        title: '',
        body: '',
        url: null,
        timer: null,
        open(detail) {
            this.title = detail.title
            this.body = detail.body
            this.url = detail.url
            this.show = true
            clearTimeout(this.timer)
            this.timer = setTimeout(() => { this.show = false }, 60000)
        },
    }"
    x-on:booking-alert-show.window="open($event.detail)"
>
    <template x-teleport="body">
        <div
            x-show="show"
            x-transition.opacity
            x-cloak
            style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 9999; display: flex; align-items: center; justify-content: center; background: rgba(30, 27, 20, 0.55); backdrop-filter: blur(2px);"
        >
            <div style="background: #fff; border-radius: 1rem; padding: 2rem 2.5rem; max-width: 28rem; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.35); border: 1px solid #e7e2d8; text-align: center;">
                <div style="font-size: 2.5rem; line-height: 1;">🔔</div>
                <h2 style="margin: 0.75rem 0 0.5rem; font-size: 1.375rem; font-weight: 700; color: #3f4a2f;" x-text="title"></h2>
                <p style="margin: 0 0 1.5rem; color: #6b6455; font-size: 0.95rem; white-space: pre-line;" x-text="body"></p>
                <div style="display: flex; gap: 0.75rem; justify-content: center;">
                    <button
                        type="button"
                        x-show="url"
                        x-on:click="window.location.href = url"
                        style="background: #556B3F; color: #fff; border: none; padding: 0.6rem 1.25rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer;"
                    >Xem ngay</button>
                    <button
                        type="button"
                        x-on:click="show = false"
                        style="background: #f1efe8; color: #4a4536; border: none; padding: 0.6rem 1.25rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer;"
                    >Đóng</button>
                </div>
            </div>
        </div>
    </template>
</div>
