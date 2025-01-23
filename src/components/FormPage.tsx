import React from 'react';
import { PetForm } from './PetForm';
import { CheckCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export function FormPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#008080]/10 mb-4">
            <CheckCircle className="h-6 w-6 text-[#008080]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Pet Profile Form</h1>
          <p className="mt-2 text-gray-600">Please fill out your pet's information below</p>
        </div>
        
        <PetForm />
      </div>
    </div>
  );
}