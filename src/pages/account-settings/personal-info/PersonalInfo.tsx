import { useForm } from "react-hook-form"
import { cn } from "../../../shared/utils/cn"
import AvatarUpload from "./AvatarUpload"
import { useState } from "react"
import placeholder from "../../../assets/images/placeholder.webp"
import useAuth from "../../../shared/hooks/useAuth"
import { UserUpdateRequest } from "../../../shared/types/user"
import { updateApi } from "../../../shared/apis/userApi"
import { toast } from "react-toastify"

export default function PersonalInfo() {

    const [loading, setLoading] = useState(false)
    const { user, update } = useAuth()
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            company_name: user?.company_name,
            full_name: user?.full_name,
            gender: user?.gender,
            phone_number: user?.phone_number,
            address: user?.address,
        }
    })
    const [avatar, setAvatar] = useState<any>(user?.avatar_url ?? '')

    const handleReset = () => {
        reset({
            company_name: user?.company_name,
            full_name: user?.full_name,
            gender: user?.gender,
            phone_number: user?.phone_number,
            address: user?.address,
        })
    }

    const onSubmit = (values: any) => {

        setLoading(true)

        const data: UserUpdateRequest = {
            ...values,
            avatar_url: avatar,
        }
        
        updateApi(data)
            .then((res) => {
                toast.success(res.message ?? "Cập nhật thông tin thành công!")
                update(res.result)
            }).catch((err) => {
                toast.error(err?.response?.data?.message || err?.message)
            }).finally(() => {
                setLoading(false)
            })

    }

    return (
        <div className="w-full p-3">
            <h4 className="font-medium text-lg mb-6">Cập nhật thông tin cá nhân</h4>
            <div className="flex mb-5 flex-col md:flex-row gap-5">
                <div className="relative w-full md:w-2/5 grow">
                    <label htmlFor="avatar" className="block text-md mb-2 font-medium text-gray-600">Avatar</label>
                    <AvatarUpload src={avatar || placeholder} onChange={setAvatar}/>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex mb-5 flex-col md:flex-row gap-5">
                    <div className="relative w-full md:w-2/5 grow">
                        <label htmlFor="email" className="block text-md mb-2 font-medium text-gray-600">Email</label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            value={user?.email}
                            disabled
                            className={cn(
                                'px-3 py-1 w-full text-md rounded-md ring-1 ring-gray-300 focus:outline-hidden focus:ring-sky-600',
                            )}
                        />
                    </div>
                    <div className="relative w-full md:w-2/5 grow">
                        <label
                            htmlFor="company_name"
                            className="block text-md mb-2 font-medium text-gray-600"
                        >Tên công ty</label>
                        <input
                            id="company_name"
                            type="text"
                            autoComplete="name"
                            placeholder="Nhập tên công ty"
                            className={cn(
                                'px-3 py-1 w-full text-md rounded-md ring-1 ring-gray-300 focus:outline-hidden focus:ring-sky-600',
                                errors?.company_name && 'ring-red-500'
                            )}
                            {...register("company_name", { required: 'Vui lòng nhập tên công ty!' })}
                        />
                        {errors?.company_name && <span className="absolute text-sm mt-1 text-red-500 top-full w-full left-0">{errors?.company_name.message as string}</span>}
                    </div>
                </div>
                <div className="flex mb-5 flex-col md:flex-row gap-5">
                    <div className="relative w-full md:w-2/5 grow">
                        <label
                            htmlFor="full_name"
                            className="block text-md mb-2 font-medium text-gray-600"
                        >Họ và tên</label>
                        <input
                            id="full_name"
                            type="text"
                            autoComplete="name"
                            placeholder="Nhập họ và tên"
                            className={cn(
                                'px-3 py-1 w-full text-md rounded-md ring-1 ring-gray-300 focus:outline-hidden focus:ring-sky-600',
                                errors?.full_name && 'ring-red-500'
                            )}
                            {...register("full_name", { required: 'Vui lòng nhập họ và tên!' })}
                        />
                        {errors?.full_name && <span className="absolute text-sm mt-1 text-red-500 top-full w-full left-0">{errors?.full_name.message as string}</span>}
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
                            <option value="OTHER">Khác</option>
                        </select>
                    </div>
                </div>
                <div className="flex mb-5 flex-col md:flex-row gap-5">
                    <div className="relative w-full md:w-2/5 grow">
                        <label
                            htmlFor="phone_number"
                            className="block text-md mb-2 font-medium text-gray-600"
                        >Số điện thoại</label>
                        <input
                            id="phone_number"
                            type="tel"
                            autoComplete="tel"
                            placeholder="Nhập số điện thoại"
                            className={cn(
                                'px-3 py-1 w-full text-md rounded-md ring-1 ring-gray-300 focus:outline-hidden focus:ring-sky-600',
                                errors?.phone_number && 'ring-red-500'
                            )}
                            {...register("phone_number", { required: 'Vui lòng nhập số điện thoại!' })}
                        />
                        {errors?.phone_number && <span className="absolute text-sm mt-1 text-red-500 top-full w-full left-0">{errors?.phone_number.message as string}</span>}
                    </div>
                    <div className="relative w-full md:w-2/5 grow">
                        <label
                            htmlFor="address"
                            className="block text-md mb-2 font-medium text-gray-600"
                        >Địa chỉ</label>
                        <input
                            id="address"
                            type="tel"
                            autoComplete="address"
                            placeholder="Nhập địa chỉ"
                            className={cn(
                                'px-3 py-1 w-full text-md rounded-md ring-1 ring-gray-300 focus:outline-hidden focus:ring-sky-600',
                                errors?.address && 'ring-red-500'
                            )}
                            {...register("address", { required: 'Vui lòng nhập địa chỉ!' })}
                        />
                        {errors?.address && <span className="absolute text-sm mt-1 text-red-500 top-full w-full left-0">{errors?.address.message as string}</span>}
                    </div>
                    {/* <div className="relative w-full md:w-2/5 grow"></div> */}
                </div>
                <div className="flex gap-3 w-full justify-end">
                    <button type="button" className="px-5 py-2 rounded-md bg-gray-100 text-black text-md" onClick={handleReset}>Hủy</button>
                    <button
                        type="submit"
                        className={cn(
                            "px-5 py-2 rounded-md bg-primary text-white text-md",
                            loading && 'bg-gray-400 cursor-progress',
                        )}>
                            Cập nhật
                        </button>
                </div>
            </form>
        </div>
    )
}