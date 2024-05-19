import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ThreadPage from './pages/ThreadsPage';
import DetailPage from './pages/DetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { asyncPreloadProcess } from './states/isPreload/thunk';
import { asyncUnsetAuthUser } from './states/authUser/thunk';
import PageError from './pages/PageError';
import 'react-toastify/dist/ReactToastify.css';
import './styles/style.css';

function App() {
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <div className="app-container">
        <header>
          <Navigation authUser={authUser} signOut={onSignOut} />
          <Loading />
        </header>
        <main>
          <Routes>
            <Route path="/*" element={<ThreadPage />} />
            <Route path="/threads/:threadId" element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/leaderboards" element={<LeaderboardPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
          <ToastContainer />
        </main>
      </div>
    );
  }
  return (
    <div className="app-container">
      <header>
        <Loading />
        <Navigation authUser={authUser} signOut={onSignOut} />
      </header>
      <main>
        <Routes>
          <Route path="/*" element={<PageError />} />
          <Route path="/" element={<ThreadPage />} />
          <Route path="/threads" element={<ThreadPage />} />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
          <Route path="/threads/:threadId" element={<DetailPage />} />
        </Routes>
        <ToastContainer />
      </main>
    </div>
  );
}

export default App;
