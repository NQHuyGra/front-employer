import { ChangeEvent, useEffect, useState } from "react"
import { base64Converter } from "../../../shared/utils/base64Converter"
import ImageCropper from "../../../shared/components/modals/ImageCropper"
import { cn } from "../../../shared/utils/cn"
import { FaPen } from "react-icons/fa6"

type AvatarUploadProps = {
    src?: string,
    onChange?: (imgSrc: string | ArrayBuffer | null) => void
}

export default function AvatarUpload({src, onChange}: AvatarUploadProps) {

    const [open, setOpen] = useState(false)
    const [imgSrc, setImgSrc] = useState<any>()
    const [preview, setPreview] = useState<any>(src)

    useEffect(() => {
        setPreview(src)
    }, [src])

    const handleInputChnage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(file) {
            base64Converter(file).then(result => {
                setImgSrc(result)
                setPreview(result)
                onChange?.(result)
            })
        }
    }

    const handleImageCrop = (e: any) => {
        setPreview(e)
        onChange?.(e)
    }

    return (
        <div className="flex items-center gap-4">
            <input
                id="user-avatar"
                className="hidden"
                type="file"
                onChange={handleInputChnage}
            />
            <div className="relative size-28 flex items-center">
                <div className="absolute size-28 border rounded-full">
                    <img src={preview} alt="User avatar" className="absolute object-cover size-full rounded-full"/>
                    <button
                        onClick={() => setOpen(true)}
                        className={cn(
                            "absolute justify-center items-center size-full rounded-full",
                            "text-white bg-gray-400/15",
                            "transition-all opacity-0 hover:opacity-100",
                            imgSrc ? 'flex' : 'hidden'
                        )}
                    >
                        <FaPen/>
                    </button>
                </div>
            </div>
            <label htmlFor="user-avatar" className="flex px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer">
                Đổi avatar
            </label>
            <ImageCropper
                open={open}
                onClose={() => setOpen(false)}
                src={imgSrc}
                onCrop={handleImageCrop}
            />
        </div>
    )
}