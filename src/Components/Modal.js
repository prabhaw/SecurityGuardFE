import { Modal } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../Redux/actions/modal.action'

const PopModal = () => {
  const dispathc = useDispatch()
  const { open, element } = useSelector((state) => state.modal)
  return (
    <Modal
      visible={open}
      centered={true}
      closable={true}
      footer={null}
      onCancel={() => {
        dispathc(closeModal())
      }}
      zIndex={1050}
    >
      {element}
    </Modal>
  )
}

export default PopModal
