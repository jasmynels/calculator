import Calculator from './components/Calculator';
import './App.css';
import './components/reset.css'
import './index.css'
import {
  BrowserRouter, 
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={(<Calculator/>)}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
