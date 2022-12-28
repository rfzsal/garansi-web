import { createContext, useContext, useState } from 'react'

const DialogContext = createContext(null)

const ProvideDialog = ({ children }) => {
  const DialogProvider = useProvideDialog()

  return <DialogContext.Provider value={DialogProvider}>{children}</DialogContext.Provider>
}

const useDialog = () => useContext(DialogContext)

const useProvideDialog = () => {
  const [dialogOpened, setDialogOpened] = useState(false)

  const openDialog = () => {
    setDialogOpened(true)
  }

  const closeDialog = () => {
    setDialogOpened(false)
  }

  return { dialogOpened, openDialog, closeDialog }
}

export { ProvideDialog, useDialog }
