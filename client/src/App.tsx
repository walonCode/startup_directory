import { Route,Routes } from "react-router-dom"
import Layout from "./components/Layout"
import CreateStartup from "./components/forms/CreateStartup"
import ReviewCreation from "./components/forms/ReviewCreation"
import ViewList from "./components/Startup/ViewList"
import StartupDetails from "./components/Startup/StartupDetails"
import Hero from "./components/Hero"

export default function App(){
  return(
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<Hero/>}/>
      <Route path='/view' element={<ViewList/>} />


      <Route path='startup'>
        <Route index element={<CreateStartup/>}/>
        <Route path=':id' element={<StartupDetails/>}/>
        <Route path='review/:startupId' element={<ReviewCreation/>}/>
      </Route>

      </Route>
    </Routes>
  )
}