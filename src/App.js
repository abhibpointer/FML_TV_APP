import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/common.css';
const ProtectedRoute = React.lazy(() => import('./util/ProtectedRoutes'));

const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse'></div>
  </div>
);

const Login = React.lazy(() => import('./components/Login/Login'));
const Home = React.lazy(() => import('./components/Categories/index.js'));
const Slider = React.lazy(() => import('./components/Slider.js'));
const Categories = React.lazy(() => import('./components/Categories/index.js'));


const App = () => {
  return (
    <Router>
      <Suspense fallback={loading}>
        <Routes>
          {/* <Route path='/login' name="Login Page" element={<Login />} />
          <Route path='*' name="Login Page" element={<Login />} /> */}
          {/* <Route path='/home' name="Login Page" element={<Home />} /> */}
          <Route path='*' name="Login Page" element={<Slider />} />
          {/* <Route path='/Categories' name="Login Page" element={<Categories />} /> */}
          <Route element={<ProtectedRoute />} />
          
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
