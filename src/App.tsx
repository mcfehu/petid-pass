import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SecureFormPage } from './components/SecureFormPage';
import { SuccessPage } from './components/SuccessPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Routes>
        {/* Debugging Placeholder */}
        <Route path="/success" element={<div>Success Page Loaded</div>} />

        <Route path="/secure-form" element={<SecureFormPage />} />
        <Route path="/form" element={<Navigate to="/" replace />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gray-100">
            <Toaster position="top-right" />
            <h1 className="text-center text-3xl font-bold text-gray-800 py-10">
              Welcome to PetID Pass
            </h1>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
