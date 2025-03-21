import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  eventData,
  trekData,
  summerEventsData,
  epicAdventureData,
  specialEventsData,
  testimonialData,
} from "./data/travelData";

function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(
    testimonialData.find((t) => t.active) || testimonialData[0]
  );

  return (
    <div className="bg-amber-100 min-h-screen w-full overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <section className="text-white py-16 md:py-20 px-4 md:px-6 bg-[url('https://i.pinimg.com/736x/ef/92/c9/ef92c99bce16311992b28d159c9bc3cf.jpg')] bg-cover bg-center relative min-h-[60vh] md:min-h-[80vh] flex items-center">
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Experience Nature
          </h1>
          <p className="text-lg md:text-xl mb-8 md:mb-10 text-white">
            India's Largest Trekking Organization
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="flex flex-col items-center">
              <i className="fa fa-mountain text-2xl md:text-3xl mb-2"></i>
              <span className="text-base md:text-lg">25,000+ Trekkers</span>
            </div>
            <div className="flex flex-col items-center">
              <i className="fa fa-users text-2xl md:text-3xl mb-2"></i>
              <span className="text-base md:text-lg">7,000+ Volunteers</span>
            </div>
            <div className="flex flex-col items-center">
              <i className="fa fa-map-marker text-2xl md:text-3xl mb-2"></i>
              <span className="text-base md:text-lg">50+ Destinations</span>
            </div>
            <div className="flex flex-col items-center">
              <i className="fa fa-clock text-2xl md:text-3xl mb-2"></i>
              <span className="text-base md:text-lg">15+ Years</span>
            </div>
          </div>
        </div>
      </section>

      {/* Highlighted Events Section */}
      <section className="py-12 md:py-16 px-4 md:px-6" id="events">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Highlighted Events
        </h2>
        <p className="text-center text-gray-600 mb-8 md:mb-10 px-4">
          Recommended camps by our Instructors
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {eventData.map((event) => (
            <Card
              key={event.id}
              image={event.image}
              title={event.title}
              icons={event.icons}
            />
          ))}
        </div>
      </section>

      {/* Summer Events Section */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-amber-800">
          Summer Events
        </h2>
        <p className="text-center text-gray-600 mb-8 md:mb-10 px-4">
          Join our exciting range of summer activities
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {summerEventsData.map((event) => (
            <Card
              key={event.id}
              image={event.image}
              title={event.title}
              type="simple"
              className="border border-gray-300"
            />
          ))}
        </div>
      </section>

      {/* Epic Adventure Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-amber-800">
          Epic Adventure
        </h2>
        <p className="text-center text-gray-600 mb-8 md:mb-10 px-4">
          Push your limits with our most thrilling outdoor challenges.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {epicAdventureData.map((adventure) => (
            <Card
              key={adventure.id}
              image={adventure.image}
              title={adventure.title}
              type={adventure.overlay ? "overlay" : "simple"}
              overlay={adventure.overlay}
              className="border border-gray-300"
            />
          ))}
        </div>
      </section>

      {/* Snow Treks Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Snow Treks
        </h2>
        <p className="text-center text-gray-600 mb-8 md:mb-10 px-4">
          Experience the magic of winter landscapes with our guided snow treks
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {trekData.map((trek) => (
            <Card
              key={trek.id}
              image={trek.image}
              title={trek.title}
              type="trek"
            />
          ))}
        </div>
      </section>

      {/* Special Events Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-amber-800">
          Special Events
        </h2>
        <p className="text-center text-gray-600 mb-8 md:mb-10 px-4">
          Join us for unique, limited-time gatherings that celebrate remarkable
          occasions
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {specialEventsData.map((event) => (
            <Card
              key={event.id}
              image={event.image}
              title={event.title}
              type={event.overlay ? "overlay" : "simple"}
              overlay={event.overlay}
              className="border border-gray-300"
            />
          ))}
        </div>
      </section>

      {/* Experience Yourself Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-pink-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-amber-800">
            Experience yourself
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 md:mb-10">
            Exclusive footage from our camps
          </p>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
              <a
                href="#"
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                <svg
                  className="w-16 h-16 md:w-20 md:h-20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
            </div>
            <div className="w-full md:w-1/2 relative">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1168&q=80"
                alt="Safari experience"
                className="rounded-lg shadow-lg w-full"
              />
              <button className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white p-3 md:p-4 rounded-full shadow-lg">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
          Experience the best with us
        </h2>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-lg p-4 md:p-6">
          <div className="md:w-1/3 space-y-4 md:space-y-6 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
            {testimonialData.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer flex-shrink-0 md:flex-shrink ${
                  activeTestimonial.id === testimonial.id ? "bg-amber-50" : ""
                }`}
                onClick={() => setActiveTestimonial(testimonial)}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="md:w-2/3">
            <div className="flex text-amber-500 mb-4">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <i key={i} className="fa fa-star"></i>
              ))}
            </div>
            <p className="text-gray-700 text-sm md:text-base">
              {activeTestimonial.text}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
