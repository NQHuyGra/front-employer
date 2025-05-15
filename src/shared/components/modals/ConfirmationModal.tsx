import { Modal } from "antd"
import React from "react"
import { cn } from "../../utils/cn"

type ConfirmationModalProps = {
    isOpen?: boolean
    onClose?: () => void
    title?: React.ReactNode
    description?: React.ReactNode
    onConfirm?: () => void
    confirmText?: React.ReactNode
    cancelText?: React.ReactNode
    confirmButtonClassName?: string
    cancelButtonClassName?: string
    loading?: boolean
}

const ConfirmationModal = ({
    isOpen = false,
    onClose,
    title = '',
    description = '',
    onConfirm,
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    confirmButtonClassName = 'bg-primary text-white',
    cancelButtonClassName = 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    loading = false,
} : ConfirmationModalProps) => {

    return (
        <Modal
            title={title}
            open={isOpen}
            onOk={onConfirm}
            onCancel={onClose}
            onClose={onClose}
            centered
            style={{
                transform: ''
            }}
            footer={[
                <button
                    key="back"
                    className={cn(
                        "px-4 py-1 rounded-md bg-sky-500 hover:bg-sky-600 me-2",
                        cancelButtonClassName,
                    )}
                    onClick={onClose}
                >
                    {cancelText}
                </button>,
                <button
                    key="submit"
                    className={cn(
                        "px-4 py-1 rounded-md bg-gray-400 hover:bg-gray-500",
                        confirmButtonClassName,
                        loading && "opacity-50 cursor-progress"
                    )}
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {confirmText}
                </button>
            ]}
        >
            {description}
        </Modal>
    )
}

export default ConfirmationModal