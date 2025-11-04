import './App.css'
import { Routes, Route } from "react-router-dom";
import {Callback} from './pages/Callback';
import {Authorize} from './pages/Authorize';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      {/* <Route path="/authorize" element={ <Authorize />} /> */}
      <Route path="/callback" element={ <Callback />} />      
    </Routes>
  )
}

export default App
