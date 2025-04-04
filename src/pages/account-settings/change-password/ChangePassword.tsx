import { useForm } from "react-hook-form";
import { cn } from "../../../shared/utils/cn";
import { toast } from "react-toastify";

type UpdatePasswordRequest = {
    currentPassword: string
    newPassword: string
    comfirmPassword: string
}

export default function ChangePassword() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdatePasswordRequest>()

    const handleReset = () => {
        reset({
            currentPassword: '',
            newPassword: '',
            comfirmPassword: '',
        })
    }

    const onSubmit = (values: UpdatePasswordRequest) => {
        if(values.newPassword !== values.comfirmPassword) {
            toast.error('Mật khẩu xác nhận không chính xác!')
            return
        }
        console.log(values)
    }

    return (
        <div className="w-full p-3">
            <h4 className="font-medium text-lg mb-6">Thay đổi mật khẩu</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                    <label htmlFor="currentPassword" className="w-60 inline-block text-md">Mật khẩu hiện tại</label>
                    <input
                        id="currentPassword"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Nhập mật khẩu hiện tại"
                        className={cn(
                            'px-3 py-1 w-96 max-w-full text-md rounded-md ring-1 ring-gray-300 focus:outline-hidden focus:ring-sky-500',
                            errors?.currentPassword && 'ring-red-500'
                        )}
                        {...register("currentPassword", { required: true })}
                    />
                </div>
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                    <label htmlFor="newPassword" className="w-60 inline-block text-md">Mật khẩu mới</label>
                    <input
                        id="newPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Nhập mật khẩu mới"
                        className={cn(
                            'px-3 py-1 w-96 max-w-full text-md rounded-md ring-1 ring-gray-300 focus:outline-hidden focus:ring-sky-500',
                            errors?.newPassword && 'ring-red-500'
                        )}
                        {...register("newPassword", { required: true })}
                    />
                </div>
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                    <label htmlFor="comfirmPassword" className="w-60 inline-block text-md">Nhập lại mật khẩu</label>
                    <input
                        id="comfirmPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Nhập lại mật khẩu mới"
                        className={cn(
                            'px-3 py-1 w-96 max-w-full text-md rounded-md ring-1 ring-gray-300 focus:outline-hidden focus:ring-sky-500',
                            errors?.comfirmPassword && 'ring-red-500'
                        )}
                        {...register("comfirmPassword", { required: true })}
                    />
                </div>
                <div className="flex gap-3 md:ml-60">
                    <button type="submit" className="px-5 py-2 rounded-md bg-primary text-white text-md">Cập nhật</button>
                    <button type="button" className="px-5 py-2 rounded-md bg-gray-100 text-black text-md" onClick={handleReset}>Hủy</button>
                </div>
            </form>
        </div>
    )
}