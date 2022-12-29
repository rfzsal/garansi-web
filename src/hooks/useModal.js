import { createContext, useContext, useState } from 'react'

const ModalContext = createContext(null)

const ProvideModal = ({ children }) => {
  const ModalProvider = useProvideModal()

  return <ModalContext.Provider value={ModalProvider}>{children}</ModalContext.Provider>
}

const useModal = () => useContext(ModalContext)

const useProvideModal = () => {
  const [modalOpened, setModalOpened] = useState(false)

  const openModal = modalId => {
    setModalOpened(modalId)
  }

  const closeModal = () => {
    setModalOpened(false)
  }

  return { modalOpened, openModal, closeModal }
}

export { ProvideModal, useModal }
