import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CharacterCreation from './pages/ChatacterCreator';
import CharacterName from './pages/CharacterName';
import Login from './auth/Login';
import Layout from './layout/layout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/creation" element={<CharacterCreation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/creation/name" element={<CharacterName />} />
        </Route>
      </Routes>
    </>

  );
};

export default App;
