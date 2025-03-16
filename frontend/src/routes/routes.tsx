import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '../layout/layout';
import ProtectedRoute from '../auth/ProtectedRoutes';
import Loading from '../components/Loading/Loading';

const Home = lazy(() => import('../pages/Home'));
const CharacterCreation = lazy(() => import('../pages/ChatacterCreator'));
const CharacterName = lazy(() => import('../pages/CharacterName'));
const Login = lazy(() => import('../auth/Login'));
const SignUp = lazy(() => import('../auth/SignUp'));
const UserDashboard = lazy(() => import('../pages/UserDashboard'));
const CharacterInfo = lazy(() => import('../pages/CharacterInfo'))
const NotFoundPage = lazy(() => import('../pages/NotFound'));
const Error500 = lazy(() => import('../pages/Error500'));

//wrapper so it's less code
const LazyWrapper = ({ component: Component }: { component: React.ComponentType }) => {
    return (
        <Suspense fallback={<Loading />}>
            <Component />
        </Suspense >
    );
};

const RoutesComponent = () => {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<LazyWrapper component={Home} />} />
                    <Route path="/login" element={<LazyWrapper component={Login} />} />
                    <Route path="/signup" element={<LazyWrapper component={SignUp} />} />
                    <Route path='*' element={<LazyWrapper component={NotFoundPage} />} />
                    <Route path="/500" element={<LazyWrapper component={Error500} />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/creation" element={<LazyWrapper component={CharacterCreation} />} />
                        <Route path="/name" element={<LazyWrapper component={CharacterName} />} />
                        <Route path="/dashboard" element={<LazyWrapper component={UserDashboard} />} />
                        <Route path="/dashboard/character/:id" element={<LazyWrapper component={CharacterInfo} />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
};

export default RoutesComponent;