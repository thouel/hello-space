import StateProvider from './StateProvider'
import ToastProvider from './ToastProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StateProvider>
      <ToastProvider />
      {children}
    </StateProvider>
  )
}

export default Providers
