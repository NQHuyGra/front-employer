import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify"
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import GlobalLoading from './shared/components/loading/GlobalLoading.jsx'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<GlobalLoading/>}>
        <RouterProvider router={router}/>
      </Suspense>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </QueryClientProvider>
  )
}

export default App
