
import {  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

interface Startup {
  name:string
  description: string
  services:string
  email:string
  contact:string
  address:string
  website:string
  operatingHours:string
  reviews?:[]
}

const StartupCard = ({
 startup
}: {
  startup:Startup
}) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden">
      <div className="p-6">
        <h3 className="text-3xl font-bold text-green-600 mb-4">{startup.name}</h3>
        <p className="text-gray-700 text-sm mb-4">{startup.description}</p>

        {/* Services */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800">Services</h4>
          <p className="text-gray-600 text-sm">{startup.services}</p>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <FaPhone className="text-green-600 mr-2" />
            <p>{startup.contact}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <FaEnvelope className="text-green-600 mr-2" />
            <p>{startup.email}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="text-green-600 mr-2" />
            <p>{startup.address}</p>
          </div>
        </div>

        {/* Website */}
        <div className="mt-4">
          <a
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline flex items-center"
          >
            <FaGlobe className="mr-2" />
            <span>Visit Website</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StartupCard;
