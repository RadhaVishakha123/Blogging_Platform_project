import { useState } from 'react'
import AuthLoginRegister from './Components/Authentication/AuthLoginRegister'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import AuthContextProviderWithLayout from './Components/Context/AuthContextProviderWithLayout'
import LayoutProeject from './LayoutProject'
import Home from './Components/Home/Home'
import UserProfile from './Components/User/UserProfile'
import UserProfileContextWithlayout from './Components/Context/UserProfileContextWithlayout'

function App() {
  
const router=createBrowserRouter([
  {path:"/" , element:<AuthLoginRegister/>},
  {element:<LayoutProeject/>,children:[
    {path:"Home" , element:<Home/>},
    {path:"UserProfile" , element:<UserProfile/>},  
  ]}
])
  return (
    <>
    <AuthContextProviderWithLayout>
      <UserProfileContextWithlayout>
    <RouterProvider router={router}></RouterProvider>
    </UserProfileContextWithlayout>
    </AuthContextProviderWithLayout>
    </>
    
  )
}

export default App
