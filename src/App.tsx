import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SecureFormPage } from './components/SecureFormPage';
import { SuccessPage } from './components/SuccessPage';
import { Header } from './components/Header';
import { EmailCapture } from './components/EmailCapture';
import { CountdownTimer } from './components/CountdownTimer';
import { ExitIntentPopup } from './components/ExitIntentPopup';
import { Toaster } from 'react-hot-toast';
import { QrCode, FileText, Users, MapPin, Check, HelpCircle, Stethoscope, Clock, Shield, Phone, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: QrCode,
    title: 'QR Code Scanning',
    description: 'Instantly access your pet\'s health information with a simple scan'
  },
  {
    icon: FileText,
    title: 'Health Records',
    description: 'Store vaccination records, medications, and medical history digitally'
  },
  {
    icon: Users,
    title: 'Emergency Contacts',
    description: 'Quick access to emergency contacts and veterinary information'
  },
  {
    icon: MapPin,
    title: 'Vet Finder',
    description: 'Locate nearby veterinarians and emergency pet care facilities'
  }
];

const pricingTiers = [
  {
    name: 'Basic',
    price: '19.99',
    period: 'one-time',
    features: [
      'Metal QR tag',
      'Static profile',
      'One-time payment',
      'Basic health records'
    ],
    stripeLink: 'https://buy.stripe.com/test_3cs6rX5XA3rW9y09AG'
  },
  {
    name: 'Premium',
    price: '19.99',
    subscription: '4.99',
    period: '/mo',
    features: [
      'Metal QR tag',
      'Unlimited updates',
      'Full features',
      'Priority support',
      'Advanced health analytics'
    ],
    stripeLink: 'https://buy.stripe.com/test_8wMg2x1Hk4w0dOg005'
  }
];

const heroFeatures = [
  {
    icon: Stethoscope,
    title: "Complete Medical Records",
    description: "Instant access to vaccines, allergies, medications & more"
  },
  {
    icon: QrCode,
    title: "Smart QR Tags",
    description: "Custom QR code tags to reunite you with a lost pet"
  },
  {
    icon: Shield,
    title: "Emergency Coverage",
    description: "$1000 emergency vet care coverage included"
  },
  {
    icon: Clock,
    title: "24/7 Recovery Support",
    description: "Lost pet recovery concierge to help find your pet, fast"
  }
];

const faqs = [
  {
    question: "How does the QR tag system work?",
    answer: "Each pet receives a unique QR tag that can be scanned with any smartphone camera. When scanned, it instantly shows your pet's essential health information and emergency contacts. The information is securely stored and can only be accessed by authorized users."
  },
  {
    question: "Is my pet's information secure?",
    answer: "Yes, we use bank-level encryption and security measures to protect your pet's data. Only you and the emergency contacts you designate can access the detailed information. Public scans only show essential emergency information."
  },
  {
    question: "Can I update my pet's information anytime?",
    answer: "Absolutely! With our Premium plan, you can update your pet's health records, emergency contacts, and other information in real-time through our web or mobile app. Changes are instantly reflected when someone scans your pet's QR tag."
  },
  {
    question: "What happens if I lose a QR tag?",
    answer: "If you lose a tag, you can instantly deactivate it through your account and order a replacement. Your pet's information remains secure, and the lost tag will no longer provide access to any data."
  },
  {
    question: "Can I use PetID Pass for multiple pets?",
    answer: "Yes! Our Premium plan allows you to manage multiple pets under one subscription. Each pet gets their own profile with separate health records, emergency contacts, and customizable information."
  },
  {
    question: "How do I transfer records to a new veterinarian?",
    answer: "PetID Pass makes it easy to share records with new veterinarians. You can generate a secure, temporary access link to your pet's complete medical history, which you can share directly with your new vet."
  }
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/secure-form" element={<SecureFormPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/form" element={<Navigate to="/" replace />} />
        <Route path="/" element={
          <div className="min-h-screen bg-[#F5F5DC]">
            <Toaster position="top-right" />
            <ExitIntentPopup />
            <Header />
            
            {/* Hero Section */}
            <div className="relative pt-24 bg-gradient-to-b from-[#F5F5DC] via-white to-[#F5F5DC]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
                <div className="space-y-8">
                  <div className="inline-block">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#008080]/10 text-[#008080]">
                      🚀 Coming Soon to petidpass.com
                    </span>
                  </div>
                  
                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#008080] to-[#006666] pb-2">
                    Keep Your Pet Safe & Healthy,
                    <br />
                    Wherever Life Takes You
                  </h2>
                  <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
                    PetID Pass is the all-in-one digital health record and emergency kit for modern pet parents on the go.
                  </p>

                  <CountdownTimer />

                  {/* Hero Features */}
                  <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                      {heroFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-4 bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-[#008080]/10 hover:border-[#008080]/20 transition-colors">
                          <div className="flex-shrink-0">
                            <div className="p-3 bg-[#008080]/10 rounded-lg">
                              <feature.icon className="h-8 w-8 text-[#008080]" />
                            </div>
                          </div>
                          <div className="flex-1 text-left">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-base text-gray-600 leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="max-w-md mx-auto">
                    <EmailCapture />
                  </div>
                </div>
              </div>
              <div className="relative mt-8">
                <div className="absolute inset-0 flex flex-col">
                  <div className="flex-1"></div>
                  <div className="flex-1 w-full bg-gradient-to-b from-[#F5F5DC]/50 to-[#FFD700]/10"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <img
                    className="relative rounded-lg shadow-xl"
                    src="https://images.unsplash.com/photo-1587559070757-f72a388edbba?auto=format&fit=crop&q=80"
                    alt="Dog wearing QR tag"
                  />
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div id="features" className="py-20 bg-gradient-to-b from-[#F5F5DC] to-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Everything you need to keep track of your pet's health
                  </h2>
                </div>

                <div className="mt-20">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                      <div key={feature.title} className="pt-6">
                        <div className="flow-root bg-white rounded-xl px-6 pb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <div className="-mt-6">
                            <div>
                              <span className="inline-flex items-center justify-center p-3 bg-[#008080] rounded-md shadow-lg">
                                <feature.icon className="h-6 w-6 text-white" />
                              </span>
                            </div>
                            <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                              {feature.title}
                            </h3>
                            <p className="mt-5 text-base text-gray-500">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div id="pricing" className="py-20 bg-gradient-to-b from-white to-[#F5F5DC]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Our Plans
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                    Choose the perfect plan for your pet's needs
                  </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-4xl lg:mx-auto">
                  {pricingTiers.map((tier) => (
                    <div key={tier.name} className="relative bg-white border-2 border-[#008080]/20 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 divide-y divide-gray-200">
                      {tier.name === 'Premium' && (
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#008080] text-white shadow-lg">
                            Most Popular
                          </span>
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900">{tier.name}</h3>
                        <p className="mt-8">
                          <span className="text-4xl font-extrabold text-gray-900">£{tier.price}</span>
                          {tier.subscription && (
                            <span className="text-gray-500">
                              + £{tier.subscription}
                              <span className="text-base font-medium">{tier.period}</span>
                            </span>
                          )}
                          {!tier.subscription && (
                            <span className="text-base font-medium text-gray-500"> {tier.period}</span>
                          )}
                        </p>
                        <ul className="mt-6 space-y-4">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex">
                              <Check className="flex-shrink-0 h-6 w-6 text-[#008080]" />
                              <span className="ml-3 text-base text-gray-500">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <a
                          href={tier.stripeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-8 w-full inline-flex items-center justify-center bg-[#008080] text-white px-4 py-2 rounded-lg hover:bg-[#006666] transition-colors"
                        >
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div id="faq" className="py-20 bg-gradient-to-b from-[#F5F5DC] to-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <span className="inline-flex items-center justify-center p-3 bg-[#008080] rounded-full shadow-lg mb-4">
                    <HelpCircle className="h-6 w-6 text-white" />
                  </span>
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Frequently Asked Questions
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                    Everything you need to know about PetID Pass
                  </p>
                </div>

                <div className="mt-16 max-w-3xl mx-auto">
                  <div className="space-y-8">
                    {faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#FFD700]/20"
                      >
                        <h3 className="text-lg font-medium text-gray-900 mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer id="contact" className="bg-[#008080]">
              <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-[#FFD700] tracking-wider uppercase">Company</h3>
                    <ul className="mt-4 space-y-4">
                      <li><a href="#" className="text-base text-white/80 hover:text-white">About</a></li>
                      <li><a href="#" className="text-base text-white/80 hover:text-white">Blog</a></li>
                      <li><a href="#" className="text-base text-white/80 hover:text-white">Careers</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#FFD700] tracking-wider uppercase">Support</h3>
                    <ul className="mt-4 space-y-4">
                      <li><a href="#" className="text-base text-white/80 hover:text-white">Help Center</a></li>
                      <li><a href="#" className="text-base text-white/80 hover:text-white">Contact</a></li>
                      <li><a href="#" className="text-base text-white/80 hover:text-white">Privacy</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#FFD700] tracking-wider uppercase">Legal</h3>
                    <ul className="mt-4 space-y-4">
                      <li><a href="#" className="text-base text-white/80 hover:text-white">Privacy</a></li>
                      <li><a href="#" className="text-base text-white/80 hover:text-white">Terms</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#FFD700] tracking-wider uppercase">Social</h3>
                    <ul className="mt-4 space-y-4">
                      <li><a href="#" className="text-base text-white/80 hover:text-white">Twitter</a></li>
                      <li><a href="#" className="text-base text-white/80 hover:text-white">Facebook</a></li>
                      <li><a href="#" className="text-base text-white/80 hover:text-white">Instagram</a></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 border-t border-[#006666] pt-8">
                  <p className="text-base text-white/80 text-center">
                    &copy; 2024 PetID Pass. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;