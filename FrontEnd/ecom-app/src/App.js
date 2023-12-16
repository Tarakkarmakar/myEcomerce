import logo from './logo.svg';
import './App.css';
import Header from './Components/Layout/Header';
import { Footer } from 'antd/es/layout/layout';
import MainRoutes from './Pages/MainRoutes';

function App() {
  return (
    <div className="App">
  <MainRoutes />
    </div>
  );
}

export default App;
