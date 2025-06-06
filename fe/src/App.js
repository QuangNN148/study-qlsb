import SanBongPage from './components/SanBongPage';
import GetListSb from './components/SanBong';
import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SanBongPage />} />
        <Route path="/sb" element={<GetListSb />} />
      </Routes>
    </Router>
  );
}