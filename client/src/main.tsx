import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { fetchStartups } from './store/features/startupSlice.ts'
import { fetchReview } from './store/features/reviewSlice.ts'
import { HashRouter as Router, Routes,Route} from 'react-router-dom'

store.dispatch(fetchStartups())
store.dispatch(fetchReview())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App/>}/>
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
)
