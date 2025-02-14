import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CharacterCreation from './pages/ChatacterCreator';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creation" element={<CharacterCreation />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>

  );
};

export default App;
