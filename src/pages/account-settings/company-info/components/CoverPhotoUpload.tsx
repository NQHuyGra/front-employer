import { ChangeEvent, useEffect, useState } from "react"
import { base64Converter } from "../../../../shared/utils/base64Converter"
import { cn } from "../../../../shared/utils/cn"
import { FaCloud, FaCloudArrowUp, FaPen } from "react-icons/fa6"
import { IoCameraOutline } from "react-icons/io5"
import ImageCropper from "../../../../shared/components/modals/ImageCropper"

type CoverPhotoUploadProps = {
    src?: string,
    onChange?: (imgSrc: string | ArrayBuffer | null) => void
}

const CoverPhotoUpload = ({src, onChange} : CoverPhotoUploadProps) => {

    const [open, setOpen] = useState(false)
    const [imgSrc, setImgSrc] = useState<any>()
    const [preview, setPreview] = useState<any>(src)

    useEffect(() => {
            setPreview(src)
        }, [src])
    
        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        <div className="flex items-center gap-4 w-full">
            <input
                id="cover-photo"
                className="hidden"
                type="file"
                onChange={handleInputChange}
                accept="image/*"
            />
            <div className="relative w-full h-36 border rounded-lg">
                {preview ? (
                    <img
                        src={preview}
                        alt="Cover photo"
                        className="absolute object-cover size-full rounded-lg"
                    />
                ) : (
                    <label
                        htmlFor="cover-photo"
                        className=" absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-sm text-sky-500"
                    >
                        Chọn ảnh bìa công ty
                        <FaCloudArrowUp className="text-3xl mx-auto"/>
                    </label>
                )}
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
                <label htmlFor="cover-photo" className="h-9 w-9 border absolute -bottom-2 -right-2 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer">
                    <IoCameraOutline/>
                </label>
            </div>
            <ImageCropper
                aspect={7 / 2}
                open={open}
                onClose={() => setOpen(false)}
                src={imgSrc}
                onCrop={handleImageCrop}
            />
        </div>
    )
}

export default CoverPhotoUpload