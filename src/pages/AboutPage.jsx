import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAboutUsInfo } from "../services/api";

const AboutPage = () => {
  const [aboutInfo, setAboutInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await fetchAboutUsInfo();
        setAboutInfo(response?.data || null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching about us info:", err);
        setError("Failed to load about us information. Please try again later.");
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Display loading message while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-amber-800">Loading about us information...</div>
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

  // If API data is not available, fallback to default content
  const content = aboutInfo || {
    title: "About Us",
    subtitle: "Discover the story behind HiddenSafari and our passion for adventure",
    story: {
      title: "Our Story",
      content: [
        "Founded in 2008, HiddenSafari began with a simple mission: to share the breathtaking beauty of Africa's landscapes while promoting sustainable tourism and supporting local communities.",
        "What started as a small operation with just two guides and a handful of treks has grown into one of Africa's most respected adventure companies, offering a wide range of experiences from mountain treks to wildlife safaris.",
        "Despite our growth, we've remained true to our founding principles: small groups, expert local guides, authentic experiences, and a commitment to environmental and cultural preservation."
      ],
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="bg-amber-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {content.title}
          </h1>
          <p className="text-lg md:text-xl">
            {content.subtitle}
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-amber-800 mb-6">
                {content.story?.title || "Our Story"}
              </h2>
              {content.story?.content && Array.isArray(content.story.content) ? (
                content.story.content.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-gray-700 mb-4">
                  {content.story?.content || "Our story information is not available at the moment."}
                </p>
              )}
            </div>
            <div className="md:w-1/2">
              <img 
                src={content.story?.image || "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
                alt="Safari guides with travelers" 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-800 mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.values && Array.isArray(content.values) ? (
              content.values.map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <i className={`${value.icon || "fas fa-leaf"} text-amber-600 text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">{value.title}</h3>
                  <p className="text-gray-700 text-center">{value.description}</p>
                </div>
              ))
            ) : (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <i className="fas fa-leaf text-amber-600 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">Environmental Stewardship</h3>
                  <p className="text-gray-700 text-center">
                    We practice and promote responsible tourism that minimizes environmental impact and contributes to conservation efforts across Africa.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <i className="fas fa-hands-helping text-amber-600 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">Community Partnership</h3>
                  <p className="text-gray-700 text-center">
                    We work closely with local communities, ensuring they benefit from tourism through employment, fair compensation, and community development projects.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <i className="fas fa-book-reader text-amber-600 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">Educational Experiences</h3>
                  <p className="text-gray-700 text-center">
                    We believe travel should be enlightening. Our guides provide deep insights into the ecology, history, and cultures of the places we visit.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-800 mb-12 text-center">Our Approach</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {content.approach && Array.isArray(content.approach) ? (
              content.approach.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Small Groups</h3>
                    <p className="text-gray-700">
                      We limit our group sizes to ensure personalized attention, minimize environmental impact, and create more intimate, meaningful experiences.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Expert Local Guides</h3>
                    <p className="text-gray-700">
                      Our guides are not only experienced outdoor professionals but also deeply knowledgeable about local ecosystems, cultures, and histories.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Authentic Experiences</h3>
                    <p className="text-gray-700">
                      We go beyond typical tourist routes to offer genuine connections with places and people, creating memories that last a lifetime.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Sustainable Practices</h3>
                    <p className="text-gray-700">
                      From our operations to the experiences we offer, sustainability is at the core of everything we do.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-amber-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Africa with Us?</h2>
          <p className="text-xl mb-8">
            Join us for an adventure that combines natural beauty, cultural immersion, and unforgettable experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/events" 
              className="bg-white text-amber-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium"
            >
              Browse Our Events
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-amber-600 transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;