import { BrowserRouter } from 'react-router-dom';
import './style/App.css'
import { AppRouter } from "./components/AppRouter";
import { Navbar } from "./components/navigate/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <AppRouter/>
      </div>
    </BrowserRouter>
  );
}

export default App;
