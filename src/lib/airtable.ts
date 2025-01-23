// This file is kept for reference but its functions are disabled
// Manual data entry process is now in place

interface CustomerData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  petName: string;
  petType: string;
  petAge: string;
  petBreed: string;
  allergies: string;
  vaccinated: boolean;
  sessionId: string;
}

// Placeholder function - data should be entered manually in Airtable
export const saveCustomerData = async (data: CustomerData) => {
  console.info('Customer data received - please enter manually in Airtable:', data);
  return null;
};

// Placeholder function - data should be entered manually in Airtable
export const savePetProfile = async (data: any) => {
  console.info('Pet profile data received - please enter manually in Airtable:', data);
  return null;
};