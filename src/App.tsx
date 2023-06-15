import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import './App.scss';
import { Home } from './pages/home/home';
import { CatDetails } from './pages/cat-details/cat-details';

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path='/:id'
            element={<CatDetails />}
          />
          <Route
            path='/'
            element={<Home />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
