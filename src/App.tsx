import { Route, Routes } from 'react-router-dom';
import TaskPage from './pages/TaskPage';
import AboutPage from './pages/AboutPage';
import Navigation from './components/Navigation';

export function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/" element={<AboutPage />} />
      </Routes>
    </>
  );
}
