import { useForm } from "react-hook-form"
import { cn } from "../../../shared/utils/cn"
import AvatarUpload from "./AvatarUpload"
import { useState } from "react"
import placeholder from "../../../assets/images/placeholder.webp"

export default function PersonalInfo() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [avatar, setAvatar] = useState<any>()

    const handleReset = () => {
        reset({
            fullName: '',
            gender: 'MALE',
            phoneNumber: ''
        })
    }

    const onSubmit = (values: any) => {
        const data = {
            ...values,
            avatar
        }
        console.log(data)
    }

    return (
        <div className="w-full p-3">
            <h4 className="font-medium text-lg mb-6">Cập nhật thông tin cá nhân</h4>
            <div className="flex mb-5 flex-col md:flex-row gap-5">
                <div className="relative w-full md:w-2/5 grow">
                    <label htmlFor="avatar" className="block text-md mb-2 font-medium text-gray-600">Avatar</label>
                    <AvatarUpload src={avatar ?? placeholder} onChange={setAvatar}/>
                </div>
                <div className="relative w-full md:w-2/5 grow">
                    <label htmlFor="email" className="block text-md mb-2 font-medium text-gray-600">Email</label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="example@gmail.com"
                        disabled
                        className={cn(
                            'px-3 py-1 w-full text-md rounded-md ring-1 ring-gray-300 focus:outline-hidden focus:ring-sky-600',
                        )}
                    />
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex mb-5 flex-col md:flex-row gap-5">
                    <div className="relative w-full md:w-2/5 grow">
                        <label
                            htmlFor="fullName"
                            className="block text-md mb-2 font-medium text-gray-600"
                        >Họ và tên</label>
                        <input
                            id="fullName"
                            type="text"
                            autoComplete="name"
                            placeholder="Nhập họ và tên"
                            className={cn(
                                'px-3 py-1 w-full text-md rounded-md ring-1 ring-gray-300 focus:outline-hidden focus:ring-sky-600',
                                errors?.fullName && 'ring-red-500'
                            )}
                            {...register("fullName", { required: 'Vui lòng nhập họ và tên' })}
                        />
                        {errors?.fullName && <span className="absolute text-sm mt-1 text-red-500 top-full w-full left-0">{errors?.fullName.message as string}</span>}
                    </div>
                    <div className="relative w-full md:w-2/5 grow">
                        <label
                            htmlFor="gender"
                            className="block text-md mb-2 font-medium text-gray-600"
                        >Giới tính</label>
                        <select
                            id="gender"
                            className="px-3 py-1 w-full text-md rounded-md ring-1 ring-gray-300 focus:outline-hidden focus:ring-sky-600"
                            {...register('gender')}
                        >
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                        </select>
                    </div>
                </div>
                <div className="flex mb-5 flex-col md:flex-row gap-5">
                    <div className="relative w-full md:w-2/5 grow">
                        <label
                            htmlFor="phoneNumber"
                            className="block text-md mb-2 font-medium text-gray-600"
                        >Số điện thoại</label>
                        <input
                            id="phoneNumber"
                            type="tel"
                            autoComplete="tel"
                            placeholder="Nhập số điện thoại"
                            className={cn(
                                'px-3 py-1 w-full text-md rounded-md ring-1 ring-gray-300 focus:outline-hidden focus:ring-sky-600',
                                errors?.phoneNumber && 'ring-red-500'
                            )}
                            {...register("phoneNumber", { required: 'Vui lòng nhập số điện thoại' })}
                        />
                        {errors?.phoneNumber && <span className="absolute text-sm mt-1 text-red-500 top-full w-full left-0">{errors?.phoneNumber.message as string}</span>}
                    </div>
                    {/* <div className="relative w-full md:w-2/5 grow"></div> */}
                </div>
                <div className="flex gap-3 w-full justify-end">
                    <button type="button" className="px-5 py-2 rounded-md bg-gray-100 text-black text-md" onClick={handleReset}>Hủy</button>
                    <button type="submit" className="px-5 py-2 rounded-md bg-primary text-white text-md">Cập nhật</button>
                </div>
            </form>
        </div>
    )
}