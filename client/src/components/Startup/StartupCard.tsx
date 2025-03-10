import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Startup {
  _id?: string;
  name: string;
  description: string;
  services: string;
  email: string;
  contact: string;
  address: string;
  website: string;
  operatingHours: string;
}

const StartupCard = ({ startup }: { startup: Startup }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl max-w-md w-full mx-auto">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FaBuilding className="text-green-600 text-xl" />
            <h3 className="text-2xl font-bold text-gray-800">{startup.name}</h3>
          </div>
          {/* Service Bubble */}
          <div className="bg-green-600 text-white px-4 py-2 rounded-full text-xs flex items-center justify-center">
            <p>{startup.services}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">{startup.description}</p>

        {/* Contact Information */}
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center">
            <FaPhone className="text-green-600 mr-2" />
            <p>{startup.contact}</p>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-green-600 mr-2" />
            <p>{startup.email}</p>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-green-600 mr-2" />
            <p>{startup.address}</p>
          </div>
        </div>

        {/* Website & More Details */}
        <div className="mt-6 flex items-center justify-between flex-wrap">
          <a
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 font-semibold hover:underline flex items-center mb-2 sm:mb-0"
          >
            <FaGlobe className="mr-2" />
            Visit Website
          </a>
          <Link
            to={`startup/${startup._id}`}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartupCard;
