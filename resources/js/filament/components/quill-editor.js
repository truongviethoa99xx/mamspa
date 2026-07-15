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
                this.quill.clipboard.dangerouslyPasteHTML(this.state)
            }

            this.quill.on('text-change', () => {
                const html = this.quill.root.innerHTML

                this.state = html === '<p><br></p>' ? '' : html
            })
        },
    }
}
