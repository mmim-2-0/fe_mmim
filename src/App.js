import './App.css';
import Homepage from './Components/Homepage/Homepage'
import ResultsPage from './Components/ResultsPage/ResultsPage'
import Nav from './Components/Nav/Nav';
import DefaultMidForm from './Components/DefaultMidForm/DefaultMidForm';
import UserMidForm from './Components/UserMidForm/UserMidForm';
import MapPage from './Components/MapPage/MapPage';
import getFetch from './apiCalls.js'
import { BrowserRouter as Router,  Routes,  Route } from "react-router-dom";


function App() {
  console.log(getFetch())
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/results' element={<ResultsPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
