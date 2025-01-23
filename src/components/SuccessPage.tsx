import React, { useEffect } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  // Debugging Logs
  useEffect(() => {
    console.log('SuccessPage rendered.');
    console.log('Session ID:', sessionId);
  }, [sessionId]);

  // Redirect if no session ID
  if (!sessionId) {
    console.warn('No session ID found. Redirecting...');
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Success Page</h1>
        <p className="text-gray-600 mt-4">
          Your session ID: <span className="font-mono text-gray-800">{sessionId}</span>
        </p>
        <p className="text-gray-500 mt-2">
          This page confirms that the session ID was received.
        </p>
      </div>
    </div>
  );
}
