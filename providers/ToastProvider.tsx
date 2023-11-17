'use client'
import { ToastContainer } from 'react-toastify'
import { TOAST_DURATION } from '@/constants'

const ToastProvider = () => {
  return (
    <ToastContainer
      position='bottom-right'
      autoClose={TOAST_DURATION}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss={true}
      draggable={true}
      pauseOnHover={true}
    />
  )
}

export default ToastProvider
