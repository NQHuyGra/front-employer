import { FaPen } from "react-icons/fa6"
import ImageCropper from "../../../../shared/components/modals/ImageCropper"
import { cn } from "../../../../shared/utils/cn"
import { base64Converter } from "../../../../shared/utils/base64Converter"
import { ChangeEvent, useEffect, useState } from "react"
import { IoCameraOutline } from "react-icons/io5"

type LogoUploadProps = {
    src?: string,
    onChange?: (imgSrc: string | ArrayBuffer | null) => void
}

export default function LogoUpload({src, onChange}: LogoUploadProps) {

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
                accept="image/*"
            />
            <div className="relative w-20 h-20 border rounded-full">
                <img src={preview} alt="User avatar" className="absolute object-cover h-full w-full rounded-full"/>
                <button
                    onClick={() => setOpen(true)}
                    className={cn(
                        "absolute justify-center items-center h-full w-full rounded-full",
                        "text-white bg-gray-400/15",
                        "transition-all opacity-0 hover:opacity-100",
                        imgSrc ? 'flex' : 'hidden'
                    )}
                >
                    <FaPen/>
                </button>
                <label htmlFor="user-avatar" className="h-9 w-9 border absolute -bottom-2 -right-2 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer">
                    <IoCameraOutline/>
                </label>
            </div>
            <ImageCropper
                open={open}
                onClose={() => setOpen(false)}
                src={imgSrc}
                onCrop={handleImageCrop}
            />
        </div>
    )
}