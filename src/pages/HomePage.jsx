import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  fetchHighlightedEvents,
  fetchSnowTreksEvents,
  fetchSummerEvents,
  fetchEpicAdventureEvents,
  fetchTestimonials
} from "../services/api";

const HomePage = () => {
  // State for storing API data
  const [highlightedEvents, setHighlightedEvents] = useState([]);
  const [snowTreksEvents, setSnowTreksEvents] = useState([]);
  const [summerEvents, setSummerEvents] = useState([]);
  const [epicAdventureEvents, setEpicAdventureEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Categories for dynamic navigation
  const categories = [
    { 
      id: "summer", 
      name: "Summer Events", 
      description: "Explore our exciting summer adventures.", 
      icon: "fa-sun",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-500"
    },
    { 
      id: "snow-treks", 
      name: "Snow Treks", 
      description: "Experience magical winter landscapes.", 
      icon: "fa-snowflake",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500"
    },
    { 
      id: "epic-adventure", 
      name: "Epic Adventure", 
      description: "Push your limits with thrilling challenges.", 
      icon: "fa-mountain",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    { 
      id: "special", 
      name: "Special Events", 
      description: "Join our unique, limited-time gatherings.", 
      icon: "fa-star",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  // Fetch all data when component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch data in parallel
        const [
          highlightedData,
          snowTreksData,
          summerData,
          epicAdventureData,
          testimonialsData
        ] = await Promise.all([
          fetchHighlightedEvents(),
          fetchSnowTreksEvents(),
          fetchSummerEvents(),
          fetchEpicAdventureEvents(),
          fetchTestimonials()
        ]);
        
        // Update state with fetched data
        setHighlightedEvents(highlightedData?.data || []);
        setSnowTreksEvents(snowTreksData?.data || []);
        setSummerEvents(summerData?.data || []);
        setEpicAdventureEvents(epicAdventureData?.data || []);
        setTestimonials(testimonialsData?.data || []);
        
        // Set initial active testimonial
        if (testimonialsData?.data?.length > 0) {
          setActiveTestimonial(testimonialsData.data[0]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Settings for the event slider
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  // Display loading message while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-amber-800">Loading...</div>
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

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-[url('https://i.pinimg.com/736x/ef/92/c9/ef92c99bce16311992b28d159c9bc3cf.jpg')] bg-cover bg-center min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
              Experience
            </h1>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Nature
            </h1>
            <p className="text-xl text-white mb-10">
              India's Largest Trekking Organization
            </p>
            
            <div className="flex flex-wrap gap-8 text-white">
              <div className="flex items-center gap-2">
                <i className="fa fa-users text-2xl"></i>
                <div>
                  <div className="font-bold">21,500+</div>
                  <div className="text-sm">Participants</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <i className="fa fa-hands-helping text-2xl"></i>
                <div>
                  <div className="font-bold">2,750+</div>
                  <div className="text-sm">Volunteers</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <i className="fa fa-map-marker-alt text-2xl"></i>
                <div>
                  <div className="font-bold">68+</div>
                  <div className="text-sm">Events</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <i className="fa fa-clock text-2xl"></i>
                <div>
                  <div className="font-bold">11</div>
                  <div className="text-sm">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-amber-800 mb-2">
            Explore Our Adventures
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover our range of exciting events and adventures, each carefully curated to provide unforgettable experiences in nature.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/events/category/${category.id}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className={`${category.bgColor} p-8 flex justify-center`}>
                  <i className={`fas ${category.icon} ${category.iconColor} text-5xl group-hover:scale-110 transition-transform duration-300`}></i>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-800 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="text-amber-600 group-hover:text-amber-800 transition-colors">
                    Explore <i className="fas fa-arrow-right ml-1 group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Highlighted Events Section with Slider */}
      {highlightedEvents.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-amber-800">
                Highlighted Events
              </h2>
              <Link 
                to="/events" 
                className="text-amber-600 hover:text-amber-800 transition-colors"
              >
                View All <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>

            <div className="event-slider">
              <Slider {...sliderSettings}>
                {highlightedEvents.map((event) => (
                  <div key={event.id} className="px-2">
                    <Card
                      id={event.id}
                      image={event.image || event.imageUrl}
                      title={event.title || event.name}
                      icons={event.icons}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
      )}

      {/* Summer Events Section with Slider */}
      {summerEvents.length > 0 && (
        <section className="py-16 px-4 bg-gray-100">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-amber-800">
                Summer Events
              </h2>
              <Link 
                to="/events/category/summer" 
                className="text-amber-600 hover:text-amber-800 transition-colors"
              >
                View All <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>

            <div className="event-slider">
              <Slider {...sliderSettings}>
                {summerEvents.map((event) => (
                  <div key={event.id} className="px-2">
                    <Card
                      id={event.id}
                      image={event.image || event.imageUrl}
                      title={event.title || event.name}
                      type="simple"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
      )}

      {/* Epic Adventure Section with Slider */}
      {epicAdventureEvents.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-amber-800">
                Epic Adventure
              </h2>
              <Link 
                to="/events/category/epic-adventure" 
                className="text-amber-600 hover:text-amber-800 transition-colors"
              >
                View All <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>

            <div className="event-slider">
              <Slider {...sliderSettings}>
                {epicAdventureEvents.map((adventure) => (
                  <div key={adventure.id} className="px-2">
                    <Card
                      id={adventure.id}
                      image={adventure.image || adventure.imageUrl}
                      title={adventure.title || adventure.name}
                      type={adventure.overlay ? "overlay" : "simple"}
                      overlay={adventure.overlay}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 px-4 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Experience the best with us
            </h2>

            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-lg p-6">
              <div className="md:w-1/3 space-y-4 md:space-y-6 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer flex-shrink-0 md:flex-shrink ${
                      activeTestimonial && activeTestimonial.id === testimonial.id ? "bg-amber-50" : ""
                    }`}
                    onClick={() => setActiveTestimonial(testimonial)}
                  >
                    <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={testimonial.image || testimonial.imageUrl || "https://randomuser.me/api/portraits/men/32.jpg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {activeTestimonial && (
                <div className="md:w-2/3">
                  <div className="flex text-amber-500 mb-4">
                    {[...Array(activeTestimonial.rating || 5)].map((_, i) => (
                      <i key={i} className="fa fa-star"></i>
                    ))}
                  </div>
                  <p className="text-gray-700">
                    {activeTestimonial.text || activeTestimonial.content}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4 bg-amber-600 text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-10 opacity-90">
            Browse our collection of unique events and start planning your unforgettable journey today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/events" 
              className="bg-white text-amber-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium text-lg"
            >
              Explore All Events
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-amber-600 transition-colors font-medium text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage; 