import React, { useState, useEffect } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CheckCircle, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { Header } from './Header';

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Success Page Mounted');
    console.log('Session ID:', sessionId);
    console.log('Current Step:', step);
  }, [sessionId, step]);

  // Redirect if no session ID
  if (!sessionId) {
    console.log('No session ID found, redirecting to home');
    return <Navigate to="/" replace />;
  }

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    petName: '',
    petType: 'Dog',
    petAge: '',
    petBreed: '',
    allergies: '',
    vaccinated: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Submitting form data:', formData);
      console.info('New customer submission:', {
        ...formData,
        sessionId
      });
      
      toast.success('Information submitted successfully!');
      setStep(2);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] via-white to-[#F5F5DC]">
        <Header />
        <div className="pt-24 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-[#008080]/10 hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#008080]/10 mb-4">
                <Mail className="h-6 w-6 text-[#008080]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
              <p className="text-gray-600 mb-6">
                Your information has been received. We'll process your details and send your PetID Pass kit shortly.
              </p>
              <div className="bg-[#F5F5DC]/50 p-4 rounded-md text-sm text-gray-600 mb-6">
                <p>Please check your email for:</p>
                <ul className="list-disc list-inside mt-2">
                  <li>Order confirmation</li>
                  <li>Shipping updates</li>
                  <li>Setup instructions</li>
                </ul>
              </div>
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#008080] hover:bg-[#006666] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008080] transition-colors duration-200"
              >
                Return Home
              </a>
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
      <div className="max-w-md mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#008080]/10 mb-4">
            <CheckCircle className="h-6 w-6 text-[#008080]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Payment Successful!</h2>
          <p className="mt-2 text-gray-600">
            Please provide your information below
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-[#008080]/10 hover:shadow-xl transition-shadow duration-300 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Owner Information</h3>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Pet Information</h3>
              
              <div>
                <label htmlFor="petName" className="block text-sm font-medium text-gray-700">
                  Pet's Name
                </label>
                <input
                  type="text"
                  id="petName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm"
                  value={formData.petName}
                  onChange={(e) => setFormData(prev => ({ ...prev, petName: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="petType" className="block text-sm font-medium text-gray-700">
                  Pet Type
                </label>
                <select
                  id="petType"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm"
                  value={formData.petType}
                  onChange={(e) => setFormData(prev => ({ ...prev, petType: e.target.value }))}
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="petBreed" className="block text-sm font-medium text-gray-700">
                  Breed
                </label>
                <input
                  type="text"
                  id="petBreed"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm"
                  value={formData.petBreed}
                  onChange={(e) => setFormData(prev => ({ ...prev, petBreed: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="petAge" className="block text-sm font-medium text-gray-700">
                  Age (years)
                </label>
                <input
                  type="number"
                  id="petAge"
                  min="0"
                  max="30"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm"
                  value={formData.petAge}
                  onChange={(e) => setFormData(prev => ({ ...prev, petAge: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                  Allergies or Medical Conditions
                </label>
                <textarea
                  id="allergies"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm"
                  value={formData.allergies}
                  onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="vaccinated"
                  className="h-4 w-4 text-[#008080] focus:ring-[#008080] border-gray-300 rounded"
                  checked={formData.vaccinated}
                  onChange={(e) => setFormData(prev => ({ ...prev, vaccinated: e.target.checked }))}
                />
                <label htmlFor="vaccinated" className="ml-2 block text-sm text-gray-700">
                  Up to date on vaccinations
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#008080] hover:bg-[#006666] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008080] disabled:opacity-50 transition-colors duration-200"
            >
              {loading ? 'Submitting...' : 'Submit Information'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}