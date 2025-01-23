import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ArrowRight } from 'lucide-react';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'newsletter',
          email
        }).toString()
      });

      if (!response.ok) throw new Error('Submission failed');

      toast.success('Thanks for joining our waitlist! Check your email for exclusive updates.');
      setEmail('');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form 
        onSubmit={handleSubmit} 
        className="sm:flex max-w-md mx-auto"
        data-netlify="true"
        name="newsletter"
        netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="newsletter" />
        <p className="hidden">
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </p>
        
        <div className="relative flex-1">
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-5 py-3 border border-[#008080]/20 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-[#008080] focus:border-[#008080] rounded-l-md"
            placeholder="Enter your email for early access"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-r-md text-white bg-[#008080] hover:bg-[#006666] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008080] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            'Joining...'
          ) : (
            <>
              Get Early Access
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </form>

      <p className="text-sm text-gray-500 text-center">
        🎁 <span className="font-medium">Early bird bonus:</span> Get 20% off at launch + exclusive roadmap access
      </p>
    </div>
  );
}