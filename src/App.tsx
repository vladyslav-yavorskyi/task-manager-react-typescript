import { Route, Routes } from 'react-router-dom';
import TaskPage from './pages/TaskPage';
import AboutPage from './pages/AboutPage';
import Navigation from './components/Navigation';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { CircularProgress } from '@mui/material';

export function App() {
  const user = useContext(AuthContext);

  return (
    <div>
      {!user?.pending ? (
        <>
          <Navigation />
          <Routes>
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/" element={<AboutPage />} />
          </Routes>
        </>
      ) : (
        <div className="grid place-items-center h-screen">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
