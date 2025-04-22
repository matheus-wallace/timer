import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import History from './pages/History/History';
import DefaultLayout from './layouts/DefaultLayout';
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
      <Route />
    </Routes>
  );
};

export default Router;
