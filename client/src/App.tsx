import { Route,Routes } from "react-router-dom"
import Layout from "./components/Layout"
import ViewList from "./components/Startup/ViewList"
import StartupDetails from "./components/Startup/StartupDetails"
import CreateStartupPage from "./components/Startup/CreateStartupPage"
import EditStartupPage from "./components/Startup/EditStartupPage"

export default function App(){
  return(
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<ViewList/>} />


      <Route path='startup'>
        <Route index element={<CreateStartupPage/>}/>
        <Route path=':id' element={<StartupDetails/>}/>
        <Route path=":id/edit/:id" element={<EditStartupPage/>}/>
      </Route>

      </Route>
    </Routes>
  )
}