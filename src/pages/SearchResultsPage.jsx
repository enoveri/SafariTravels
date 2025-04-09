import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { fetchAllEvents } from "../services/api";

const SearchResultsPage = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        
        // Fetch all events and filter them client-side
        const response = await fetchAllEvents();
        const allEvents = response?.data || [];
        
        // Filter events based on search query (case-insensitive)
        const searchTerm = query.toLowerCase();
        const filteredEvents = allEvents.filter(event => {
          const title = (event.title || event.name || "").toLowerCase();
          const description = (event.description || event.content || "").toLowerCase();
          const location = (event.location || "").toLowerCase();
          
          return (
            title.includes(searchTerm) || 
            description.includes(searchTerm) || 
            location.includes(searchTerm)
          );
        });
        
        setSearchResults(filteredEvents);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to load search results. Please try again later.");
        setLoading(false);
      }
    };

    if (query && query.trim().length > 0) {
      fetchResults();
    } else {
      setLoading(false);
      setSearchResults([]);
    }
  }, [query]);

  // Handle new search submission
  const [newSearchQuery, setNewSearchQuery] = useState(query || "");
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (newSearchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(newSearchQuery.trim())}`);
    }
  };

  // Display loading message while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-amber-800">Searching for "{query}"...</div>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="bg-amber-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Search Results</h1>
          
          {/* Search form */}
          <form onSubmit={handleSearch} className="flex max-w-xl">
            <input
              type="text"
              value={newSearchQuery}
              onChange={(e) => setNewSearchQuery(e.target.value)}
              placeholder="Search for adventures..."
              className="w-full px-4 py-2 rounded-l-md focus:outline-none"
              aria-label="Search query"
            />
            <button 
              type="submit" 
              className="bg-amber-800 text-white px-6 py-2 rounded-r-md hover:bg-amber-900 transition-colors"
              aria-label="Search"
            >
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for "{query}"
              </h2>
              
              {searchResults.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-gray-600 mb-6">No events match your search criteria.</p>
                  <Link 
                    to="/events" 
                    className="bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700 transition-colors"
                  >
                    Browse All Events
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                  {searchResults.map((event) => (
                    <Card
                      key={event.id}
                      id={event.id}
                      image={event.image || event.imageUrl}
                      title={event.title || event.name}
                      type="simple"
                      className="border border-gray-300"
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage; 