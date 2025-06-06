import { DatePicker, Form, Input, Select } from "antd";
import Card from "../../../shared/components/cards/Card";
import { JOB_FIELDS } from "../../../shared/constants/jobField";
import { RANKS } from "../../../shared/constants/rank";
import { EXP } from "../../../shared/constants/exp";
import QuillTextEditor from "../../../shared/components/quill/QuillTextEditor";
import { FORM_OF_WORK } from "../../../shared/constants/formOfWork";
import { CITIES } from "../../../shared/constants/city";
import { Link, useNavigate } from "react-router-dom";
import { Job } from "../../../shared/types/job";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addJob } from "../../../shared/apis/jobApi";
import { toast } from "react-toastify";
import { cn } from "../../../shared/utils/cn";
import { SALARY } from "../../../shared/constants/salary";
import { CATEGORIES } from "../../../shared/constants/category";

export default function CreateJob() {

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationFn: addJob,
        onSuccess: (data) => {
            toast.success(data.message ?? "Tạo tin tuyển dụng thành công!")
            queryClient.invalidateQueries({queryKey: ["my-jobs"]})
            queryClient.invalidateQueries({queryKey: ["all-jobs"]})
            navigate("/jobs")
        },
    })

    const onSubmit = (values: Job) => {
        createMutation.mutate(values)
    }

    return (
        <Card className="m-4">
            <h1 className="font-semibold text-gray-800 text-3xl">Tạo tin tuyển dụng mới</h1>
            <p className="text-gray-800 mb-5">Tìm kiếm ứng viên tiềm năng.</p>
            <Form
                layout="vertical"
                className="w-full"
                onFinish={onSubmit}
                scrollToFirstError
            >
                <h1 className="text-xl  text-gray-800 mb-3">Thông tin việc làm</h1>
                <div className="lg:flex gap-3 w-full">
                    <Form.Item
                        label={<p className=" text-gray-800">Tiêu đề tin tuyển dụng</p>}
                        name="title"
                        className="w-full"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tiêu đề tin tuyển dụng!"
                            }
                        ]}
                    >
                        <Input
                            type="text"
                            placeholder="VD: Tuyển dụng nhân viên kinh doanh"
                        />
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-gray-800">Ngành nghề</p>}
                        name="category"
                        className="w-full"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn ngành nghề!"
                            }
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Ngành nghề"
                            options={CATEGORIES.map(item => (
                                {
                                    value: item.id,
                                    label: item.name
                                }
                            ))}
                        />
                    </Form.Item>
                </div>
                <div className="lg:flex gap-3 w-full">
                    <Form.Item
                        label={<p className=" text-gray-800">Lĩnh vực công việc</p>}
                        name="job_field"
                        className="w-full"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn lĩnh vực!"
                            }
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Lĩnh vực công việc"
                            options={JOB_FIELDS.map(item => (
                                {
                                    value: item.id,
                                    label: item.name
                                }
                            ))}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-gray-800">Số lượng tuyển</p>}
                        name="number_of_recruits"
                        className="w-full"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số lượng tuyển!"
                            }
                        ]}
                    >
                        <Input
                            type="number"
                            min={1}
                            placeholder="Nhập số lượng tuyển"
                        />
                    </Form.Item>
                </div>
                <div className="lg:flex gap-3 w-full">
                    <Form.Item
                        label={<p className=" text-gray-800">Giới tính</p>}
                        name="gender"
                        className="w-full"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn giới tính!"
                            }
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn giới tính"
                            options={[
                                {
                                    value: 0,
                                    label: "Không yêu cầu"
                                },
                                {
                                    value: 1,
                                    label: "Nam",
                                },
                                {
                                    value: 2,
                                    label: "Nữ",
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-gray-800">Cấp bậc</p>}
                        name="rank"
                        className="w-full"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn cấp bậc!"
                            }
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn ngành nghề & lĩnh vực"
                            options={RANKS.map(item => (
                                {
                                    value: item.id,
                                    label: item.name
                                }
                            ))}
                        />
                    </Form.Item>
                </div>
                <div className="lg:flex gap-3 w-full">
                    <Form.Item
                        label={<p className=" text-gray-800">Kinh nghiệm</p>}
                        name="exp"
                        className="w-full"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn kinh nghiệm!"
                            }
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn kinh nghiệm"
                            options={EXP.map(item => (
                                {
                                    value: item.id,
                                    label: item.name
                                }
                            ))}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-gray-800">Mức lương</p>}
                        name="salary"
                        className="w-full"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mức lương!"
                            }
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Mức lương"
                            options={SALARY.map(item => (
                                {
                                    value: item.id,
                                    label: item.name
                                }
                            ))}
                        />
                    </Form.Item>
                </div>
                <div className="lg:flex gap-3 w-full">
                    <Form.Item
                        label={<p className=" text-gray-800">Hình thức làm việc</p>}
                        name="form_of_work"
                        className="w-full"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn hình thức làm việc!"
                            }
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn hình thức làm việc"
                            options={FORM_OF_WORK.map(item => (
                                {
                                    value: item.id,
                                    label: item.name
                                }
                            ))}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-gray-800">Khu vực</p>}
                        name="location"
                        className="w-full"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn khu vực!"
                            }
                        ]}
                    >
                        <Select
                            showSearch
                            mode="multiple"
                            placeholder="Chọn khu vực"
                            options={CITIES.map(item => (
                                {
                                    value: item,
                                    label: item
                                }
                            ))}
                        />
                    </Form.Item>
                </div>
                <h1 className="text-gray-800 text-xl  text-gray-800 mb-3">Chi tiết việc làm</h1>
                <Form.Item
                    label={<p className=" text-gray-800">Mô tả công việc</p>}
                    name="description"rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mô tả công việc!"
                        }
                    ]}
                >
                    <QuillTextEditor
                        placeholder="Nội dung mô tả công việc"
                    />
                </Form.Item>
                <Form.Item
                    label={<p className=" text-gray-800">Yêu cầu ứng viên</p>}
                    name="requirement"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập yêu cầu ứng viên!"
                        }
                    ]}
                >
                    <QuillTextEditor
                        placeholder="Nội dung yêu cầu ứng viên"
                    />
                </Form.Item>
                <Form.Item
                    label={<p className=" text-gray-800">Quyền lợi ứng viên</p>}
                    name="benefit"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập quyền lợi ứng viên!"
                        }
                    ]}
                >
                    <QuillTextEditor
                        placeholder="Nội dung quyền lợi ứng viên"
                    />
                </Form.Item>
                <Form.Item
                    label={<p className=" text-gray-800">Thu nhập</p>}
                    name="salary_details"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập thu nhập!"
                        }
                    ]}
                >
                    <QuillTextEditor
                        placeholder="Nội dung thu nhập"
                    />
                </Form.Item>
                <Form.Item
                    label={<p className=" text-gray-800">Địa chỉ làm việc</p>}
                    name="location_details"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập địa chỉ làm việc!"
                        }
                    ]}
                >
                    <QuillTextEditor
                        placeholder="Nội dung địa chỉ làm việc"
                    />
                </Form.Item>
                <Form.Item
                    label={<p className=" text-gray-800">Hạn nộp cv</p>}
                    name="deadline"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập hạn nộp hồ sơ!"
                        }
                    ]}
                >
                    <DatePicker
                        className="w-full"
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày hết hạn nộp hồ sơ"
                    />
                </Form.Item>
                <div className="w-full flex justify-end gap-3">
                    <Link to="/jobs" className="!bg-gray-200 !text-gray-800 font-medium px-5 py-1 rounded-md hover:!bg-gray-300 !transition-all">Hủy</Link>
                    <button
                        className={cn(
                            "bg-primary text-white font-medium px-5 py-1 rounded-md",
                            createMutation.isPending && "!bg-primary/50 !cursor-progress"
                        )}
                        type="submit"
                        disabled={createMutation.isPending}
                    >
                        {createMutation.isPending ? "Đang lưu..." : "Hoàn tất"}
                    </button>
                </div>
            </Form>
        </Card>
    )
}