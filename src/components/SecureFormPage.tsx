import React, { useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { PetForm } from './PetForm';
import { Shield, CheckCircle, PawPrint } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { Header } from './Header';

export function SecureFormPage() {
  const [searchParams] = useSearchParams();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const token = searchParams.get('token');

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      // For now, we'll consider all tokens valid since we're using manual data entry
      setIsValid(true);
    };

    checkToken();
  }, [token]);

  // Redirect to home if trying to access directly without token
  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] via-white to-[#F5F5DC]">
        <Header />
        <div className="pt-24 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-[#008080]/10 hover:shadow-xl transition-shadow duration-300">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#008080]/10 mb-4">
                <CheckCircle className="h-6 w-6 text-[#008080]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Created Successfully!</h2>
              <p className="text-gray-600">
                Thank you for submitting your pet's information. You'll receive a confirmation email shortly with next steps.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isValid === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] via-white to-[#F5F5DC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#008080]"></div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] via-white to-[#F5F5DC]">
        <Header />
        <div className="pt-24 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-[#008080]/10 hover:shadow-xl transition-shadow duration-300">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid or Expired Link</h2>
              <p className="text-gray-600">
                This form access link is either invalid, expired, or has already been used. Please check your email for a valid link or contact support.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] via-white to-[#F5F5DC]">
      <Header />
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#008080]/10 mb-4">
            <PawPrint className="h-6 w-6 text-[#008080]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Pet Profile Form</h1>
          <p className="mt-2 text-gray-600">Please fill out your pet's information below</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-[#008080]/10 hover:shadow-xl transition-shadow duration-300 mb-12">
          <PetForm onSuccess={() => setSubmitted(true)} />
        </div>
      </div>
    </div>
  );
}