import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { shortenURLAPI, getAllUrlsAPI } from '../api/axios/userService';

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const navigate = useNavigate();

  const fetchUrls = async () => {
    try {
      const res = await getAllUrlsAPI();
      setUrls(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch URLs');
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  async function handleShorten(e: React.FormEvent) {
    e.preventDefault();
    try{
        const res = await shortenURLAPI(url);
        console.log(res.data);
        toast.success("URL shortened successfully!");
        setUrl('');
        fetchUrls();
    }catch(error: any){
        console.log(error);
        toast.error(error.response?.data?.message || "URL shortening failed");
    }
  }

  const copyToClipboard = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">URL Shortener</span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 font-medium text-sm border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* Shorten Link Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Create a short link</h2>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleShorten}>
            <input 
              type="url" 
              placeholder="Paste your long URL here" 
              className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 outline-none transition-colors hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors whitespace-nowrap"
            >
              Shorten URL
            </button>
          </form>
        </div>

        {/* URLs List */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Your Links</h2>
            <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              {urls.length} Total
            </span>
          </div>
          
          <div className="divide-y divide-gray-200">
            {urls.map((item) => (
              <div key={item.id} className="p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:bg-gray-50 transition-colors">
                
                <div className="flex flex-col flex-1 overflow-hidden">
                  <a 
                    href={item.shortUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold text-lg hover:underline truncate"
                  >
                    {item.shortUrl}
                  </a>
                  <a 
                    href={item.originalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 text-sm hover:text-gray-700 truncate mt-1"
                  >
                    {item.originalUrl}
                  </a>
                </div>

                <div className="flex flex-row items-center gap-6 mt-4 md:mt-0 text-sm">
                  <div className="flex flex-col text-center">
                    <span className="text-gray-500 text-xs font-medium uppercase">Date</span>
                    <span className="text-gray-900">{item.createdAt}</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(item.shortUrl)}
                    className="ml-2 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-gray-200 hover:border-blue-200"
                    title="Copy short link"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>

              </div>
            ))}

            {urls.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <p className="text-lg font-medium text-gray-900 mb-1">No links created yet</p>
                <p>Paste a URL above to get started.</p>
              </div>
            )}
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default Dashboard;
