import { Modal } from "antd"
import useLogoutModal from "../../hooks/useLogoutModal"

export default function LogoutModal() {

    const { isOpen, close, logout } = useLogoutModal()

    return (
        <Modal
            title="Đăng xuất"
            open={isOpen}
            onOk={logout}
            onCancel={close}
            onClose={close}
            // confirmLoading={loading}
            centered
            style={{
                transform: ''
            }}
        >
            <p className="text-base">Xác nhận đăng xuất tài khoản?</p>
        </Modal>
    )
}