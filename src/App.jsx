import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/UI/Layout'
import MapPage from './pages/MapPage'
import MapAside from './pages/Asides/MapAside'
import UserPage from './pages/UserPage'
import BoardsPage from './pages/BoardsPage'
import IdAside from './pages/Asides/IdAside'
import Shop from './pages/ShopPage'


function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<MapPage/>}>
            <Route path='' element={<MapAside/>} />
            <Route path=':category/:id' element={<IdAside/>} />
            <Route path='boards' element={<BoardsPage/>} />
            <Route path='shop' element={<Shop/>} />
            <Route path='user' element={<UserPage/>} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
