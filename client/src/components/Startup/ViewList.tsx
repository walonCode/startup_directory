import { useAppDispatch } from "../../hooks/storeHooks"
import { fetchStartups } from "../../store/features/startupSlice"
import { useAppSelector } from "../../hooks/storeHooks"
import { useEffect } from "react"
import { allStartup } from "../../store/features/startupSlice";
import StartupCard from "./StartupCard";


function ViewList() {
  const dispatch = useAppDispatch()
  const startups = useAppSelector(allStartup)

  useEffect(() => {
    dispatch(fetchStartups())
  },[dispatch])

  const content = startups.map(startup => {
    return(
      <StartupCard key={startup._id} startup={startup}/>
    )
})
  return (
    <div>
      {content}
    </div>
  )
}

export default ViewList