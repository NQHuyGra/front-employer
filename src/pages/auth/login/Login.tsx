import { Form, Input } from "antd";
import { AuthenticatedRequest } from "../../../shared/types/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginApi } from "../../../shared/apis/authApi";
import useAuth from "../../../shared/hooks/useAuth";
import { toast } from "react-toastify";
import { cn } from "../../../shared/utils/cn";

export default function Login() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const {login} = useAuth()

    useEffect(() => {
        document.title = 'Đăng nhập'
    }, [])

    const onSubmit = (data: AuthenticatedRequest) => {
        
        setLoading(true)

        loginApi(data).then((res) => {
            login(res.result.accessToken, res.result.user)
            navigate('/')
            toast.success("Đăng nhập thành công")
        }).catch((err) => {
            console.log(err)
            toast.error(err?.response?.data?.message || err?.message)
        }).finally(() => setLoading(false))

    }

    return (
        <div className="py-10 px-2 mx-auto max-w-[600px]">
            <h1 className="font-semibold text-primary text-4xl mb-5">Chào mừng bạn đã quay trở lại</h1>
            <Form
                layout="vertical"
                onFinish={onSubmit}
                autoComplete="off"
                className="w-full"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập email!"
                        }
                    ]}
                >
                    <Input
                        className="py-2"
                        type="email"
                        placeholder="Nhập email"/>
                </Form.Item>
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu!"
                        }
                    ]}
                >
                    <Input.Password
                        className="py-2"
                        placeholder="Nhập mật khẩu"
                        autoComplete="off"
                    />
                </Form.Item>
                <Form.Item>
                    <button
                        type="submit"
                        className={cn(
                            "bg-primary flex items-center justify-center rounded-lg text-white text-base w-full px-5 py-2",
                            loading && "opacity-50 cursor-progress"
                        )}
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </Form.Item>
            </Form>
            <p className="text-center text-gray-700">Bạn chưa có tài khoản? <Link to="/register" className="text-primary">Đăng ký ngay</Link></p>
        </div>
    )
}