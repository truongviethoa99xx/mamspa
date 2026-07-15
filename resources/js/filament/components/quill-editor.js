import Quill from 'quill'

export default function quillEditorFormComponent({ state, placeholder }) {
    return {
        state,

        quill: null,

        init: function () {
            this.quill = new Quill(this.$refs.editor, {
                theme: 'snow',
                placeholder: placeholder || '',
                modules: {
                    toolbar: [
                        [{ header: [2, 3, false] }],
                        [{ size: ['small', false, 'large', 'huge'] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ color: [] }, { background: [] }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['blockquote', 'link', 'image'],
                        ['clean'],
                    ],
                },
            })

            if (this.state) {
                // Fields migrated from a plain text/textarea input (e.g. hero_eyebrow before it
                // became a Quill field) can hold bare text with no block-level tag. Pasting that
                // straight in leaves Quill's internal Parchment tree without a proper block blot,
                // which later crashes ("Cannot read properties of null (reading 'offset')") the
                // moment the user clicks or types. Wrap it in <p> first so it's always valid.
                const isBlockHtml = /^\s*<(p|h[1-6]|ul|ol|blockquote|div)[\s>]/i.test(this.state)
                const html = isBlockHtml ? this.state : `<p>${this.state}</p>`

                this.quill.clipboard.dangerouslyPasteHTML(html)
            }

            this.quill.on('text-change', () => {
                const html = this.quill.root.innerHTML

                this.state = html === '<p><br></p>' ? '' : html
            })
        },
    }
}
