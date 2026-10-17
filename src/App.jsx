
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shackleton from './pages/Shackleton'
import WaterIce from './pages/WaterIce'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations/shackleton" element={<Shackleton />} />
        <Route path="/locations/water-ice" element={<WaterIce />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
