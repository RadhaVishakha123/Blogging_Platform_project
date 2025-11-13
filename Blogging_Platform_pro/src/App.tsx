import { useState } from 'react'
import AuthLoginRegister from './Components/Authentication/AuthLoginRegister'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import AuthContextProviderWithLayout from './Components/Context/AuthContextProviderWithLayout'
import layoutProeject from './layoutProeject'



function App() {
  const [Text, setText] = useState("Editable text content.")
const router=createBrowserRouter([
  {path:"/" , element:<AuthLoginRegister/>},
  // {element:<layoutProeject/>,children:[
  //   {path:"Home" , element:""},
  //   {path:"" , element:""}
  // ]}
])
  return (
    <>
    <AuthContextProviderWithLayout>
    <RouterProvider router={router}></RouterProvider>
  </AuthContextProviderWithLayout>
    </>
  )
}

export default App
