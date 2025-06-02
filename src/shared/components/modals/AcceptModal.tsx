import { Modal } from "antd"

type AcceptModalProps = {
    open?: boolean
    onClose?: () => void
    onSubmit?: () => void
    profile_name?: string
    loading: boolean
}

const AcceptModal = ({
    open = false,
    onClose,
    onSubmit,
    profile_name = "",
    loading = false
}: AcceptModalProps ) => {

    return (
        <Modal
            open={open}
            onCancel={onClose}
            onOk={onSubmit}
            okText="Chấp nhận"
            cancelText="Hủy"
            title={`Chấp nhận hồ sơ ${profile_name}`}
            okButtonProps={{
                className: "!bg-green-500 hover:!bg-green-600 text-white",
            }}
            loading={loading}
        >
        </Modal>
    )
}

export default AcceptModal