import { Route,Routes } from "react-router-dom"
import Layout from "./components/Layout"
import CreateStartup from "./components/forms/CreateStartup"
import ReviewCreation from "./components/forms/ReviewCreation"
import ViewList from "./components/Startup/ViewList"
import StartupDetails from "./components/Startup/StartupDetails"

export default function App(){
  return(
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<ViewList/>} />


      <Route path='startup'>
        <Route index element={<CreateStartup/>}/>
        <Route path=':id' element={<StartupDetails/>}/>
        <Route path=':startupId' element={<ReviewCreation/>}/>
      </Route>

      </Route>
    </Routes>
  )
}