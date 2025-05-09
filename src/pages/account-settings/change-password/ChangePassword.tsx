import { useForm } from "react-hook-form";
import { cn } from "../../../shared/utils/cn";
import { toast } from "react-toastify";
import { useState } from "react";
import { changePasswordApi } from "../../../shared/apis/userApi";

export type UpdatePasswordRequest = {
    current_password: string
    new_password: string
    confirm_password: string
}

export default function ChangePassword() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdatePasswordRequest>()
    const [loading, setLoading] = useState(false)

    const handleReset = () => {
        reset({
            current_password: '',
            new_password: '',
            confirm_password: '',
        })
    }

    const onSubmit = (values: UpdatePasswordRequest) => {
        if(values.new_password !== values.confirm_password) {
            toast.error('Mật khẩu xác nhận không chính xác!')
            return
        }
        
        setLoading(true)
        
        changePasswordApi(values)
            .then((res) => {
                toast.success(res.message ?? "Dổi mật khẩu thành công!")
            }).catch((err) => {
                toast.error(err?.response?.data?.message || err?.message)
            }).finally(() => {
                setLoading(false)
                handleReset()
            })
    }

    return (
        <div className="w-full p-3">
            <h4 className="font-medium text-lg mb-6">Thay đổi mật khẩu</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                    <label htmlFor="currentPassword" className="w-60 inline-block text-md">Mật khẩu hiện tại</label>
                    <input
                        id="current_password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Nhập mật khẩu hiện tại"
                        className={cn(
                            'px-3 py-1 w-96 max-w-full text-md rounded-md ring-1 ring-gray-300 focus:outline-hidden focus:ring-sky-500',
                            errors?.current_password && 'ring-red-500'
                        )}
                        {...register("current_password", { required: true })}
                    />
                </div>
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                    <label htmlFor="newPassword" className="w-60 inline-block text-md">Mật khẩu mới</label>
                    <input
                        id="new_password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Nhập mật khẩu mới"
                        className={cn(
                            'px-3 py-1 w-96 max-w-full text-md rounded-md ring-1 ring-gray-300 focus:outline-hidden focus:ring-sky-500',
                            errors?.new_password && 'ring-red-500'
                        )}
                        {...register("new_password", { required: true })}
                    />
                </div>
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                    <label htmlFor="confirm_password" className="w-60 inline-block text-md">Nhập lại mật khẩu</label>
                    <input
                        id="confirm_password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Nhập lại mật khẩu mới"
                        className={cn(
                            'px-3 py-1 w-96 max-w-full text-md rounded-md ring-1 ring-gray-300 focus:outline-hidden focus:ring-sky-500',
                            errors?.confirm_password && 'ring-red-500'
                        )}
                        {...register("confirm_password", { required: true })}
                    />
                </div>
                <div className="flex gap-3 md:ml-60">
                    <button type="submit" className="px-5 py-2 rounded-md bg-primary text-white text-md">Cập nhật</button>
                    <button
                        type="button"
                        className={cn(
                            "px-5 py-2 rounded-md bg-gray-100 text-black text-md",
                            loading && "opacity-50 cursor-progress"
                        )}
                        onClick={handleReset}
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    )
}