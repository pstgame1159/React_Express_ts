import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from './stores';
import LoginPage from './pages/LoginPage';
import MoviesPage from './pages/MoviesPage';

const App = observer(() => {
  const auth = useAuthStore();

  useEffect(() => {
    auth.loadFromStorage();
  }, [auth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={auth.isAuthenticated ? <Navigate to="/movies" replace /> : <LoginPage />}
        />
        <Route
          path="/movies"
          element={auth.isAuthenticated ? <MoviesPage /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/movies" replace />} />
      </Routes>
    </BrowserRouter>
  );
});

export default App;
