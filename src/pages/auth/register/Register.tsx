import { Form, Input, Radio, Select } from "antd"
import { RegisterRequest } from "../../../shared/types/auth"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchDistricts, fetchProvinces } from '../../../shared/apis/provinceApi'
import { BsBuilding, BsEnvelope, BsPerson, BsShieldShaded, BsTelephone } from "react-icons/bs"
import { registerApi } from "../../../shared/apis/authApi"
import { toast } from "react-toastify"
import { cn } from "../../../shared/utils/cn"

export default function Register() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const [selectedProvince, setSelectedProvince] = useState('')
    const { data: provinces = [], isLoading: isLoadingProvinces } = useQuery({
        queryKey: ['provinces'],
        queryFn: fetchProvinces,
    })
    const { data: districts = [], isLoading: isLoadingDistricts } = useQuery({
        queryKey: ['districts', selectedProvince],
        queryFn: () => fetchDistricts(selectedProvince),
        enabled: !!selectedProvince
    })

    useEffect(() => {
        document.title = 'Đăng ký'
    }, [])

    const handleProvinceChange = (value: string) => {
        const selectedProvinceCode = provinces.find((item: any) => item?.name === value)?.code
        setSelectedProvince(selectedProvinceCode)
        form.setFieldValue('work_district', null)
    }

    const onSubmit = (data: any) => {

        setLoading(true)

        const requestData: RegisterRequest = {
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password,
            full_name: data.full_name,
            phone_number: data.phone_number,
            gender: data.gender,
            company_name: data.company_name,
            address: `${data.work_district}, ${data.work_city}`
        }

        registerApi(requestData)
            .then((res) => {
                toast.success(res?.message)
                navigate("/login")
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message || err?.message)
            })
            .finally(() => setLoading(false))

    }

    return (
        <div className="py-10 px-2 mx-auto max-w-[600px]">
            <h1 className="font-semibold text-primary text-4xl mb-5">Chào mừng bạn đã đến với ViecMoi</h1>
            <Form
                layout="vertical"
                onFinish={onSubmit}
                className="w-full"
                autoComplete="off"
                form={form}
                initialValues={{gender: 'MALE'}}
                scrollToFirstError
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng cho chúng tôi biết email của bạn!"
                        }
                    ]}
                >
                    <Input
                        className="py-2"
                        type="email"
                        placeholder="Nhập email"
                        prefix={<BsEnvelope className="text-primary"/>}
                    />
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
                        prefix={<BsShieldShaded className="text-primary"/>}
                    />
                </Form.Item>
                <Form.Item
                    label="Nhập lại mật khẩu"
                    name="confirm_password"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập lại mật khẩu!"
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
                            }
                        })
                    ]}
                >
                    <Input.Password
                        className="py-2"
                        placeholder="Nhập lại mật khẩu"
                        autoComplete="off"
                        prefix={<BsShieldShaded className="text-primary"/>}
                    />
                </Form.Item>
                <Form.Item>
                    <h3 className="font-medium text-xl -mb-3">Thông tin nhà tuyển dụng</h3>
                </Form.Item>
                <Form.Item
                    label="Họ và tên"
                    name="full_name"
                    rules={[
                        {
                            required: true,
                            message: "Họ và tên không được để trống!"
                        }
                    ]}
                >
                    <Input
                        className="py-2"
                        placeholder="Nhập họ và tên"
                        prefix={<BsPerson className="text-primary"/>}
                    />
                </Form.Item>
                <Form.Item
                    label="Giới tính"
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng cho chúng tôi giới tính của bạn!"
                        }
                    ]}
                >
                    <Radio.Group>
                        <Radio value="MALE">Nam</Radio>
                        <Radio value="FEMALE">Nữ</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="Số điện thoại cá nhân"
                    name="phone_number"
                    rules={[
                        {
                            required: true,
                            message: "Số điện thoại không được để trống!"
                        }
                    ]}
                >
                    <Input
                        className="py-2"
                        placeholder="Nhập số điện thoại"
                        prefix={<BsTelephone className="text-primary"/>}
                    />
                </Form.Item>
                <Form.Item
                    label="Tên công ty"
                    name="company_name"
                    rules={[
                        {
                            required: true,
                            message: "Tên công ty không được để trống!"
                        }
                    ]}
                >
                    <Input
                        className="py-2"
                        placeholder="Nhập tên công ty"
                        prefix={<BsBuilding className="text-primary"/>}
                    />
                </Form.Item>
                <Form.Item
                    label="Địa điểm làm việc"
                    name="work_city"
                    rules={[
                        {
                            required: true,
                            message: "Tỉnh/ thành phố không được để trống!"
                        }
                    ]}
                >
                    <Select
                        className="h-10"
                        showSearch
                        loading={isLoadingProvinces}
                        placeholder="Chọn tỉnh/ thành phố"
                        options={provinces.map((item: any) => ({
                            value: item?.name,
                            label: item?.name
                        }))}
                        onChange={handleProvinceChange}
                    />
                </Form.Item>
                <Form.Item
                    label="Quận/ huyện"
                    name="work_district"
                    rules={[
                        {
                            required: true,
                            message: "Quận/ huyện không được để trống!"
                        }
                    ]}
                >
                    <Select
                        className="h-10"
                        showSearch
                        loading={isLoadingDistricts}
                        placeholder="Chọn quận/ huyện"
                        disabled={!selectedProvince}
                        options={districts.map((item: any) => ({
                            value: item?.name,
                            label: item?.name
                        }))}
                    />
                </Form.Item>
                <Form.Item>
                    <button
                        type="submit"
                        className={cn(
                            "bg-primary flex items-center justify-center rounded-lg text-white text-base w-full px-5 py-2",
                            loading && "opacity-50 cursor-progress"
                        )}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Đăng ký"}
                    </button>
                </Form.Item>
            </Form>
            <p className="text-center text-gray-700">Bạn đã có tài khoản? <Link to="/login" className="text-primary">Đăng nhập ngay</Link></p>
        </div>
    )
}