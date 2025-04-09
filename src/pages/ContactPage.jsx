import React, { useState, useEffect } from "react";
import { fetchContactInfo } from "../services/api";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });

  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setLoading(true);
        const response = await fetchContactInfo();
        setContactInfo(response?.data || null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching contact info:", err);
        setError("Failed to load contact information. Please try again later.");
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you for your message! We'll get back to you soon."
    });
    
    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  // Display loading indicator while fetching contact data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-amber-800">Loading contact information...</div>
      </div>
    );
  }

  // Use API data if available, or fallback to default
  const info = contactInfo || {
    title: "Contact Us",
    subtitle: "Have questions or ready to plan your adventure? Get in touch with our team.",
    location: "123 Safari Road, Nairobi, Kenya",
    phone: ["+254 123 456 789", "+254 987 654 321"],
    email: ["info@hiddensafari.com", "bookings@hiddensafari.com"],
    hours: ["Monday - Friday: 9am - 5pm", "Saturday: 10am - 2pm", "Sunday: Closed"],
    social: [
      { platform: "facebook", url: "#" },
      { platform: "twitter", url: "#" },
      { platform: "instagram", url: "#" },
      { platform: "linkedin", url: "#" }
    ]
  };

  return (
    <>
      {/* Page Header */}
      <div className="bg-amber-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{info.title}</h1>
          <p className="text-lg md:text-xl">
            {info.subtitle}
          </p>
        </div>
      </div>

      {/* Contact Form and Info Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Form */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">Send Us a Message</h2>
              
              {formStatus.submitted && (
                <div className={`p-4 mb-6 rounded-md ${formStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Booking Information">Booking Information</option>
                      <option value="Custom Trek">Custom Trek</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-map-marker-alt text-amber-600"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Our Location</h3>
                    <p className="text-gray-700">
                      {info.location || "Location information not available"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-phone-alt text-amber-600"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Phone</h3>
                    {info.phone && Array.isArray(info.phone) ? (
                      <p className="text-gray-700">
                        {info.phone.map((number, index) => (
                          <React.Fragment key={index}>
                            {number}
                            {index < info.phone.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    ) : (
                      <p className="text-gray-700">Phone information not available</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-amber-600"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                    {info.email && Array.isArray(info.email) ? (
                      <p className="text-gray-700">
                        {info.email.map((email, index) => (
                          <React.Fragment key={index}>
                            {email}
                            {index < info.email.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    ) : (
                      <p className="text-gray-700">Email information not available</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-clock text-amber-600"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Office Hours</h3>
                    {info.hours && Array.isArray(info.hours) ? (
                      <p className="text-gray-700">
                        {info.hours.map((hours, index) => (
                          <React.Fragment key={index}>
                            {hours}
                            {index < info.hours.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    ) : (
                      <p className="text-gray-700">Hours information not available</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-bold text-gray-800 mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  {info.social && Array.isArray(info.social) ? (
                    info.social.map((social, index) => (
                      <a 
                        key={index} 
                        href={social.url} 
                        className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
                      >
                        <i className={`fab fa-${social.platform}`}></i>
                      </a>
                    ))
                  ) : (
                    <>
                      <a href="#" className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#" className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-amber-800 mb-6">Find Us</h2>
          <div className="h-96 bg-gray-300 rounded-lg overflow-hidden">
            {/* Replace with actual map embed */}
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              {info.mapEmbed ? (
                <div dangerouslySetInnerHTML={{ __html: info.mapEmbed }}></div>
              ) : (
                <p className="text-gray-600">Map Embed Goes Here</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-amber-800 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">How far in advance should I book a trek?</h3>
              <p className="text-gray-700">
                We recommend booking at least 3-6 months in advance for popular treks, especially during peak season (June-September and December-February). For less popular routes or off-season travel, 1-2 months notice is usually sufficient.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">What fitness level is required for your treks?</h3>
              <p className="text-gray-700">
                Our treks range from easy to challenging. Each trek listing includes a difficulty rating and fitness recommendations. For moderate to difficult treks, we recommend regular cardio exercise for at least 2-3 months before your trip.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Can you accommodate dietary restrictions?</h3>
              <p className="text-gray-700">
                Yes, we can accommodate most dietary requirements including vegetarian, vegan, gluten-free, and allergies. Please inform us of any dietary needs when booking so we can make appropriate arrangements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">What's your cancellation policy?</h3>
              <p className="text-gray-700">
                Cancellations made more than 60 days before departure receive a full refund minus deposit. Cancellations 30-60 days before departure receive a 50% refund. Cancellations less than 30 days before departure are non-refundable. We strongly recommend travel insurance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;