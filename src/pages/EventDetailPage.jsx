import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchEventById } from "../services/api";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const response = await fetchEventById(eventId);
        setEvent(response?.data || null);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching event with ID ${eventId}:`, err);
        setError("Failed to load event details. Please try again later.");
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);
  
  // Show loading indicator
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-amber-800">Loading event details...</div>
      </div>
    );
  }
  
  // Show error message if API call failed
  if (error) {
    return (
      <div className="py-20 px-4 text-center">
        <h1 className="text-3xl font-bold text-amber-800 mb-4">Error</h1>
        <p className="mb-8">{error}</p>
        <Link 
          to="/events" 
          className="bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700 transition-colors"
        >
          Back to Events
        </Link>
      </div>
    );
  }
  
  // If event not found, show error message
  if (!event) {
    return (
      <div className="py-20 px-4 text-center">
        <h1 className="text-3xl font-bold text-amber-800 mb-4">Event Not Found</h1>
        <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/events" 
          className="bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700 transition-colors"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  // Extract data from the event object
  const {
    title = 'Event',
    subtitle,
    image = event.imageUrl,
    description,
    icons = [],
    highlights = [
      "Expert guides with extensive knowledge of the area",
      "Small groups for a personalized experience",
      "High-quality equipment and safety measures",
      "Stunning photo opportunities",
      "Cultural interactions with local communities"
    ]
  } = event;

  return (
    <>
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[50vh] md:h-[60vh]"
        style={{ backgroundImage: `url(${image || event.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title || event.name}</h1>
            {subtitle && (
              <p className="text-xl md:text-2xl">{subtitle}</p>
            )}
          </div>
        </div>
        
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        >
          <i className="fa fa-arrow-left"></i>
        </button>
      </div>

      {/* Event Details */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex flex-wrap gap-4 mb-8">
            {icons && Array.isArray(icons) && icons.map((icon, index) => (
              <div key={index} className="flex items-center text-amber-700">
                <i className={`${icon} mr-2`}></i>
                <span className="text-gray-700">
                  {icon.includes("bus") && "Transportation"}
                  {icon.includes("times") && "Guided Tour"}
                  {icon.includes("campground") && "Camping"}
                  {icon.includes("hiking") && "Hiking"}
                  {icon.includes("camera") && "Photography"}
                </span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-amber-800 mb-4">About This Event</h2>
          <p className="text-gray-700 mb-6">
            {description || event.content || `Experience the breathtaking beauty of ${title || event.name} with our expert guides. This adventure offers a perfect blend of excitement, natural beauty, and cultural immersion. Whether you're a seasoned trekker or a first-time adventurer, our ${title || event.name} experience is designed to create memories that will last a lifetime.`}
          </p>

          <h2 className="text-2xl font-bold text-amber-800 mb-4">Highlights</h2>
          <ul className="list-disc pl-5 mb-6 text-gray-700">
            {Array.isArray(highlights) ? (
              highlights.map((highlight, index) => (
                <li key={index} className="mb-2">{highlight}</li>
              ))
            ) : (
              <>
                <li className="mb-2">Expert guides with extensive knowledge of the area</li>
                <li className="mb-2">Small groups for a personalized experience</li>
                <li className="mb-2">High-quality equipment and safety measures</li>
                <li className="mb-2">Stunning photo opportunities</li>
                <li className="mb-2">Cultural interactions with local communities</li>
              </>
            )}
          </ul>

          <div className="flex justify-center mt-8">
            <button className="bg-amber-600 text-white px-8 py-3 rounded-md hover:bg-amber-700 transition-colors text-lg font-medium">
              Book This Adventure
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailPage; 