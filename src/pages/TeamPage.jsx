import React, { useState, useEffect } from "react";
import { fetchTeamMembers } from "../services/api";

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const response = await fetchTeamMembers();
        setTeamMembers(response?.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching team data:", err);
        setError("Failed to load team data. Please try again later.");
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  // Display loading message while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-amber-800">Loading team information...</div>
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

  // If no team members found, show a message
  if (teamMembers.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-amber-800">No team members found.</div>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="bg-amber-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h1>
          <p className="text-lg md:text-xl">
            Meet the passionate experts who make your adventures unforgettable
          </p>
        </div>
      </div>

      {/* Team Members Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image || member.imageUrl || "https://randomuser.me/api/portraits/men/32.jpg"} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-800 mb-1">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.position || member.role}</p>
                  <p className="text-gray-700 mb-4">{member.bio || member.description}</p>
                  {member.social && (
                    <div className="flex space-x-4">
                      {member.social.twitter && (
                        <a href={member.social.twitter} className="text-blue-400 hover:text-blue-600">
                          <i className="fab fa-twitter"></i>
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} className="text-blue-700 hover:text-blue-900">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      )}
                      {member.social.instagram && (
                        <a href={member.social.instagram} className="text-pink-600 hover:text-pink-800">
                          <i className="fab fa-instagram"></i>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-800 mb-6">Join Our Team</h2>
          <p className="text-gray-700 mb-8">
            We're always looking for passionate, knowledgeable individuals to join our team of adventure specialists. 
            If you love the outdoors, have expertise in African ecology, culture, or adventure sports, and enjoy sharing 
            your knowledge with others, we'd love to hear from you.
          </p>
          <a 
            href="#" 
            className="inline-block bg-amber-600 text-white px-8 py-3 rounded-md hover:bg-amber-700 transition-colors"
          >
            View Open Positions
          </a>
        </div>
      </section>
    </>
  );
};

export default TeamPage;