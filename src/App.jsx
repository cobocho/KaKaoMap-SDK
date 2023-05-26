import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/UI/Layout'
import MapPage from './pages/MapPage'
import AsideViewer from './components/AsideViewer'


function App() {

  return (
    <BrowserRouter>
      <Layout>
        <AsideViewer />
        <Routes>
          <Route path='/map' element={<MapPage/>}>
          </Route>
          <Route path='/map/:id' element={<MapPage/>}>
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
