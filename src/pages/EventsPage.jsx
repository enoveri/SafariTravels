import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import {
  fetchSnowTreksEvents,
  fetchSummerEvents,
  fetchHighlightedEvents,
  fetchEpicAdventureEvents,
  fetchSpecialEvents
} from "../services/api";

const EventsPage = () => {
  // State for storing API data
  const [snowTreksEvents, setSnowTreksEvents] = useState([]);
  const [summerEvents, setSummerEvents] = useState([]);
  const [highlightedEvents, setHighlightedEvents] = useState([]);
  const [epicAdventureEvents, setEpicAdventureEvents] = useState([]);
  const [specialEvents, setSpecialEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Fetch all data when component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch data in parallel
        const [
          snowTreksData,
          summerData,
          highlightedData,
          epicAdventureData,
          specialData
        ] = await Promise.all([
          fetchSnowTreksEvents(),
          fetchSummerEvents(),
          fetchHighlightedEvents(),
          fetchEpicAdventureEvents(),
          fetchSpecialEvents()
        ]);
        
        // Update state with fetched data
        setSnowTreksEvents(snowTreksData?.data || []);
        setSummerEvents(summerData?.data || []);
        setHighlightedEvents(highlightedData?.data || []);
        setEpicAdventureEvents(epicAdventureData?.data || []);
        setSpecialEvents(specialData?.data || []);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load events data. Please try again later.");
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Display loading message while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-amber-800">Loading events...</div>
      </div>
    );
  }

  // Display error message if fetch failed
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  // Define categories for dynamic navigation
  const categories = [
    { id: "summer", name: "Summer Events", count: summerEvents.length },
    { id: "snow-treks", name: "Snow Treks", count: snowTreksEvents.length },
    { id: "epic-adventure", name: "Epic Adventure", count: epicAdventureEvents.length },
    { id: "special", name: "Special Events", count: specialEvents.length }
  ];

  return (
    <>
      {/* Page Header */}
      <div className="bg-amber-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Our Events</h1>
          
          {/* Search form */}
          <form onSubmit={handleSearch} className="flex max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Categories Section */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-amber-800">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/events/category/${category.id}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <h3 className="text-xl font-bold text-amber-800 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count} events</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Highlighted Events Section */}
      {highlightedEvents.length > 0 && (
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-amber-800">
                Highlighted Events
              </h2>
              <Link 
                to="/events/category/highlighted" 
                className="text-amber-600 hover:text-amber-800 transition-colors"
              >
                View All <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {highlightedEvents.slice(0, 3).map((event) => (
                <Card
                  key={event.id}
                  id={event.id}
                  image={event.image || event.imageUrl}
                  title={event.title || event.name}
                  icons={event.icons}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Summer Events Section */}
      {summerEvents.length > 0 && (
        <section className="py-12 md:py-16 px-4 md:px-6 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-amber-800">
                Summer Events
              </h2>
              <Link 
                to="/events/category/summer" 
                className="text-amber-600 hover:text-amber-800 transition-colors"
              >
                View All <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {summerEvents.slice(0, 4).map((event) => (
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
          </div>
        </section>
      )}

      {/* Snow Treks Section */}
      {snowTreksEvents.length > 0 && (
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-amber-800">
                Snow Treks
              </h2>
              <Link 
                to="/events/category/snow-treks" 
                className="text-amber-600 hover:text-amber-800 transition-colors"
              >
                View All <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {snowTreksEvents.slice(0, 4).map((trek) => (
                <Card
                  key={trek.id}
                  id={trek.id}
                  image={trek.image || trek.imageUrl}
                  title={trek.title || trek.name}
                  type="trek"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Epic Adventure Section */}
      {epicAdventureEvents.length > 0 && (
        <section className="py-12 md:py-16 px-4 md:px-6 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-amber-800">
                Epic Adventure
              </h2>
              <Link 
                to="/events/category/epic-adventure" 
                className="text-amber-600 hover:text-amber-800 transition-colors"
              >
                View All <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {epicAdventureEvents.slice(0, 3).map((adventure) => (
                <Card
                  key={adventure.id}
                  id={adventure.id}
                  image={adventure.image || adventure.imageUrl}
                  title={adventure.title || adventure.name}
                  type={adventure.overlay ? "overlay" : "simple"}
                  overlay={adventure.overlay}
                  className="border border-gray-300"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Special Events Section */}
      {specialEvents.length > 0 && (
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-amber-800">
                Special Events
              </h2>
              <Link 
                to="/events/category/special" 
                className="text-amber-600 hover:text-amber-800 transition-colors"
              >
                View All <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {specialEvents.slice(0, 2).map((event) => (
                <Card
                  key={event.id}
                  id={event.id}
                  image={event.image || event.imageUrl}
                  title={event.title || event.name}
                  type={event.overlay ? "overlay" : "simple"}
                  overlay={event.overlay}
                  className="border border-gray-300"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EventsPage; 