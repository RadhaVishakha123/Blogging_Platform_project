import { useState } from 'react'
import AnchorAnt from './AnchorAnt'
import Prcative from './Prcative'
import AuthLoginRegister from './Components/Authentication/AuthLoginRegister'



function App() {
  const [Text, setText] = useState("Editable text content.")

  return (
    <>
    <AuthLoginRegister/>
    <div className=' bg-white'>
   
{/* <AnchorAnt/>
<Prcative/> */}
</div>



      
    </>
  )
}

export default App
