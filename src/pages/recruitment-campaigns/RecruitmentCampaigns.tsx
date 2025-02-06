import { Form, Input } from "antd";
import Card from "../../shared/components/cards/Card";

export default function RecruitmentCampaigns() {


    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <Card className="m-4">
            <h3 className="font-semibold text-xl mb-3">Tạo chiến dịch tuyển dụng của bạn</h3>
            <Form
                onFinish={onSubmit}
                layout="vertical"
            >
                <Form.Item
                    label="Tên chiến dịch tuyển dụng"
                    name="recruitment_campaign_name"
                    rules={[
                        {
                            required: true,
                            message: 'Tên chiến dịch tuyển dụng không được để trống'
                        }
                    ]}
                >
                    <Input
                        className="py-2"
                        placeholder={`VD: Tuyển dụng nhân viên Marketing tháng ${new Date().getMonth() + 1} ...`}
                    />
                </Form.Item>
                <Form.Item>
                    <button type="submit" className="bg-primary flex items-center justify-center rounded-lg text-white text-base w-full px-5 py-2">Tiếp theo </button>
                </Form.Item>
            </Form>
        </Card>
    )
}