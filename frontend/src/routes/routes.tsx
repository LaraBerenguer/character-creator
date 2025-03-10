import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CharacterCreation from '../pages/ChatacterCreator';
import CharacterName from '../pages/CharacterName';
import Login from '../auth/Login';
import Layout from '../layout/layout';
import SignUp from '../auth/SignUp';
import ProtectedRoute from '../auth/ProtectedRoutes';
import UserDashboard from '../pages/UserDashboard';
import NotFoundPage from '../pages/NotFound';
import Error500 from '../pages/Error500';

const RoutesComponent = () => {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path='*' element={<NotFoundPage />} />
                    <Route path="/500" element={<Error500 />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/creation" element={<CharacterCreation />} />
                        <Route path="/creation/name" element={<CharacterName />} />
                        <Route path="/dashboard" element={<UserDashboard />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
};

export default RoutesComponent;