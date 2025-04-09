import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../components/Card";
import {
  fetchSummerEvents,
  fetchSnowTreksEvents,
  fetchMonsoonEvents,
  fetchEpicAdventureEvents,
  fetchSpecialEvents
} from "../services/api";

const EventCategoryPage = () => {
  const { categoryName } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Category display names mapping
  const categoryDisplayNames = {
    "summer": "Summer Events",
    "snow-treks": "Snow Treks",
    "monsoon": "Monsoon Events",
    "epic-adventure": "Epic Adventure",
    "special": "Special Events"
  };

  // Category descriptions mapping
  const categoryDescriptions = {
    "summer": "Explore our exciting summer adventures in beautiful locations.",
    "snow-treks": "Experience the magic of winter landscapes with our guided snow treks.",
    "monsoon": "Discover the lush beauty of the rainy season on our specialized monsoon treks.",
    "epic-adventure": "Push your limits with our most thrilling outdoor challenges.",
    "special": "Join us for unique, limited-time gatherings that celebrate remarkable occasions."
  };

  useEffect(() => {
    const fetchCategoryEvents = async () => {
      try {
        setLoading(true);
        
        let response;
        switch (categoryName) {
          case "summer":
            response = await fetchSummerEvents();
            break;
          case "snow-treks":
            response = await fetchSnowTreksEvents();
            break;
          case "monsoon":
            response = await fetchMonsoonEvents();
            break;
          case "epic-adventure":
            response = await fetchEpicAdventureEvents();
            break;
          case "special":
            response = await fetchSpecialEvents();
            break;
          default:
            throw new Error("Invalid category");
        }
        
        setEvents(response?.data || []);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching ${categoryName} events:`, err);
        setError(err.message === "Invalid category" 
          ? `Category "${categoryName}" not found` 
          : "Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    fetchCategoryEvents();
  }, [categoryName]);

  // Display loading message while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-amber-800">Loading events...</div>
      </div>
    );
  }

  // Display error message if fetch failed or category is invalid
  if (error) {
    return (
      <div className="py-20 px-4 text-center">
        <h1 className="text-3xl font-bold text-amber-800 mb-4">Error</h1>
        <p className="mb-8">{error}</p>
        <Link 
          to="/events" 
          className="bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700 transition-colors"
        >
          View All Events
        </Link>
      </div>
    );
  }

  // If no events found for valid category
  if (events.length === 0) {
    return (
      <div className="py-20 px-4 text-center">
        <h1 className="text-3xl font-bold text-amber-800 mb-4">{categoryDisplayNames[categoryName] || categoryName}</h1>
        <p className="mb-8">No events found in this category at the moment.</p>
        <Link 
          to="/events" 
          className="bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700 transition-colors"
        >
          View All Events
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="bg-amber-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {categoryDisplayNames[categoryName] || categoryName}
          </h1>
          <p className="text-lg md:text-xl">
            {categoryDescriptions[categoryName] || "Discover our range of adventures and experiences"}
          </p>
        </div>
      </div>

      {/* Events Grid Section */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {events.map((event) => (
            <Card
              key={event.id}
              id={event.id}
              image={event.image || event.imageUrl}
              title={event.title || event.name}
              type={categoryName === "snow-treks" ? "trek" : "simple"}
              className="border border-gray-300"
            />
          ))}
        </div>
      </section>

      {/* Back button */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link 
          to="/events" 
          className="inline-flex items-center text-amber-800 hover:text-amber-600"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to All Events
        </Link>
      </div>
    </>
  );
};

export default EventCategoryPage; 