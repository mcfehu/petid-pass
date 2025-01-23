import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { savePetProfile } from '../lib/airtable';

interface PetFormProps {
  onSuccess?: () => void;
}

export function PetForm({ onSuccess }: PetFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    petName: '',
    petType: 'Dog',
    petAge: '',
    petGender: 'Male',
    ownerName: '',
    phone: '',
    email: '',
    vaccinated: false,
    allergies: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await savePetProfile(formData);
      toast.success('Pet profile created successfully!');
      
      setFormData({
        petName: '',
        petType: 'Dog',
        petAge: '',
        petGender: 'Male',
        ownerName: '',
        phone: '',
        email: '',
        vaccinated: false,
        allergies: ''
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="petName" className="block text-sm font-medium text-gray-700">Pet Name</label>
          <input
            type="text"
            id="petName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm bg-white/90"
            value={formData.petName}
            onChange={(e) => setFormData(prev => ({ ...prev, petName: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="petType" className="block text-sm font-medium text-gray-700">Pet Type</label>
          <select
            id="petType"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm bg-white/90"
            value={formData.petType}
            onChange={(e) => setFormData(prev => ({ ...prev, petType: e.target.value }))}
          >
            <option>Dog</option>
            <option>Cat</option>
            <option>Bird</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="petAge" className="block text-sm font-medium text-gray-700">Pet Age (years)</label>
          <input
            type="number"
            id="petAge"
            min="0"
            max="30"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm bg-white/90"
            value={formData.petAge}
            onChange={(e) => setFormData(prev => ({ ...prev, petAge: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="petGender" className="block text-sm font-medium text-gray-700">Pet Gender</label>
          <select
            id="petGender"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm bg-white/90"
            value={formData.petGender}
            onChange={(e) => setFormData(prev => ({ ...prev, petGender: e.target.value }))}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div>
          <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Owner Name</label>
          <input
            type="text"
            id="ownerName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm bg-white/90"
            value={formData.ownerName}
            onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phone"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm bg-white/90"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm bg-white/90"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies or Medical Conditions</label>
          <textarea
            id="allergies"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#008080] focus:ring-[#008080] sm:text-sm bg-white/90"
            value={formData.allergies}
            onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
          />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="vaccinated"
              className="h-4 w-4 text-[#008080] focus:ring-[#008080] border-gray-300 rounded bg-white/90"
              checked={formData.vaccinated}
              onChange={(e) => setFormData(prev => ({ ...prev, vaccinated: e.target.checked }))}
            />
            <label htmlFor="vaccinated" className="ml-2 block text-sm text-gray-700">
              Up to date on vaccinations
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#008080] hover:bg-[#006666] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008080] disabled:opacity-50 transition-colors duration-200"
      >
        {loading ? 'Saving...' : 'Submit'}
      </button>
    </form>
  );
}