import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOriginalUrlByCode } from "../api/axios/urlRedirectService";

const RedirectPage = () => {
  const { code } = useParams<{ code: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndRedirect = async () => {
      if (!code) {
        setError("Invalid URL code.");
        return;
      }

      try {
        const data = await getOriginalUrlByCode(code);
    alert("sd")
        if (data.originalUrl) {
          alert(data.originalUrl)
          window.location.href = data.originalUrl;
        } else {
          setError("Invalid response from server.");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "URL not found or has expired.");
      }
    };

    fetchAndRedirect();
  }, [code]);

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full border border-gray-100">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h1>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full border border-gray-100">
        <div className="relative mx-auto w-16 h-16 mb-6">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Redirecting...</h1>
        <p className="text-gray-500">Please wait while we take you to your destination.</p>
      </div>
    </div>
  );
};

export default RedirectPage;
