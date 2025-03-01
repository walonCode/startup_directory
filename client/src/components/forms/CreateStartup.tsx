import { useState } from "react";
import { FaBuilding, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhone, FaRegClock, FaServicestack } from "react-icons/fa";
import { useAppDispatch } from "../../hooks/storeHooks";
import { postStartups } from "../../store/features/startupSlice";
import { useNavigate } from "react-router-dom";

const CreateStartup = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [website, setWebsite] = useState('');

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name,
      description,
      services,
      email,
      contact,
      address,
      operatingHours,
      website,
    };

    await dispatch(postStartups(formData));
    navigate('/');
    setName('');
    setDescription('');
    setServices('');
    setEmail('');
    setContact('');
    setAddress('');
    setOperatingHours('');
    setWebsite('');
  };

  return (
    <section className="min-h-screen flex justify-center items-center mt-10 px-4">
      <div className="max-w-xl w-full p-6 bg-white shadow-md rounded-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-6">Create a Startup</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name */}
          <div className="flex items-center border border-gray-300 p-3 rounded-md focus-within:border-green-600">
            <FaBuilding className="text-green-600 text-lg mr-3" />
            <input
              type="text"
              placeholder="Startup Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full outline-none text-sm"
              required
            />
          </div>

          {/* Description */}
          <div className="flex items-start border border-gray-300 p-3 rounded-md focus-within:border-green-600">
            <FaBuilding className="text-green-600 text-lg mr-3" />
            <textarea
              placeholder="Brief Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none text-sm resize-none"
              rows={3}
              required
            ></textarea>
          </div>

          {/* Services */}
          <div className="flex items-center border border-gray-300 p-3 rounded-md focus-within:border-green-600">
            <FaServicestack className="text-green-600 text-lg mr-3" />
            <input
              type="text"
              placeholder="Services Offered"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              className="w-full outline-none text-sm"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 p-3 rounded-md focus-within:border-green-600">
            <FaEnvelope className="text-green-600 text-lg mr-3" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none text-sm"
              required
            />
          </div>

          {/* Contact */}
          <div className="flex items-center border border-gray-300 p-3 rounded-md focus-within:border-green-600">
            <FaPhone className="text-green-600 text-lg mr-3" />
            <input
              type="text"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full outline-none text-sm"
              required
            />
          </div>

          {/* Address */}
          <div className="flex items-center border border-gray-300 p-3 rounded-md focus-within:border-green-600">
            <FaMapMarkerAlt className="text-green-600 text-lg mr-3" />
            <input
              type="text"
              placeholder="Business Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full outline-none text-sm"
              required
            />
          </div>

          {/* Operating Hours */}
          <div className="flex items-center border border-gray-300 p-3 rounded-md focus-within:border-green-600">
            <FaRegClock className="text-green-600 text-lg mr-3" />
            <input
              type="text"
              placeholder="Operating Hours (e.g. 9 AM - 5 PM)"
              value={operatingHours}
              onChange={(e) => setOperatingHours(e.target.value)}
              className="w-full outline-none text-sm"
              required
            />
          </div>

          {/* Website */}
          <div className="flex items-center border border-gray-300 p-3 rounded-md focus-within:border-green-600">
            <FaGlobe className="text-green-600 text-lg mr-3" />
            <input
              type="text"
              placeholder="Website URL"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full outline-none text-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition ease-in-out duration-300"
          >
            Create Startup
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateStartup;
