import { Form, Modal, Radio } from "antd"
import { useState } from "react"


type RejectModalProps = {
    open?: boolean
    onClose?: () => void
    onSubmit?: (reason: string) => void
    profile_name?: string
}

const REASON = [
    "Hồ sơ chưa phù hợp",
    "Thiếu kinh nghiệm làm việc",
    "Trình độ học vấn chưa phù hợp với yêu cầu",
    "Không thể hiện rõ kỹ năng cần thiết",
    "Mục tiêu nghề nghiệp không phù hợp"
]

const RejectModal = ({
    open = false,
    onClose,
    onSubmit,
    profile_name = ""
}: RejectModalProps) => {

    const [reason, setReason] = useState<string>("")

    const handleSubmit = () => {
        onSubmit?.(reason)
    }

    return (
        <Modal
            open={open}
            onCancel={onClose}
            onOk={handleSubmit}
            okText="Từ chối"
            cancelText="Hủy"
            title={`Từ chối hồ sơ ${profile_name}`}
            okButtonProps={{
                className: "!bg-red-500 hover:!bg-red-600 text-white",
            }}
        >
            <Form
                layout="vertical"
            >
                <Form.Item label="Lý do từ chối" required>
                    <Radio.Group className="!flex !flex-col gap-2">
                        {REASON.map((item) => (
                            <Radio name="reject" value={item} onChange={e => setReason(e.target.value)}>{item}</Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default RejectModal