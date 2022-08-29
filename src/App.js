import './App.css';
import Nav from './Components/Nav/Nav';
import DefaultMidForm from './Components/DefaultMidForm/DefaultMidForm';
import UserMidForm from './Components/UserMidForm/UserMidForm';
import MapPage from './Components/MapPage/MapPage';


function App() {
  return (
    <div className="App">
      <p>App here</p>
      <Nav />
      <DefaultMidForm />
      <UserMidForm />
      <MapPage />
    </div>
  );
}

export default App;
