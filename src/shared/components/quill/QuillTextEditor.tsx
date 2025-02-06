import ReactQuill from "react-quill"
import { cn } from "../../utils/cn"

type TextEditorProps = {
    className?: string
    value?: string
    onChange?: (
        value: string,
        delta: any,
        source: any,
        editor: ReactQuill.UnprivilegedEditor) => void
    placeholder?: string
}

export default function QuillTextEditor({className, value, onChange, placeholder}: TextEditorProps) {

    return (
        <ReactQuill
            className={cn(
                className
            )}
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
        />
    )
}

const modules = {
    toolbar: [ 
        [
            { 'header': [1, 2, 3, 4, 5, 6, false] },
        ],
        [
            { 'list': 'ordered' },
            { 'list': 'bullet' }
        ],
        [
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote'
        ],
        [
            { 'color': [] },
            { 'background': [] }
        ],
        [
            'link',
            'image',
            'video'],
        [
            'clean'
        ]
    ]
}
  
const formats = [
    'header', 
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'color', 'background'
]