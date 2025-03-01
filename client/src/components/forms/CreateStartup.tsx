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

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Here you can process the form data
    const formData = {
      name,
      description,
      services,
      email,
      contact,
      address,
      operatingHours,
      website
    };

    await dispatch(postStartups(formData))
    navigate('/view')
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
    <section className="min-h-screen mt-10 ">
    <div className="max-w-lg mx-auto p-6  bg-white shadow-lg rounded-lg mt-10 border border-gray-300">
      <h2 className="text-2xl font-bold text-green-600 text-center mb-4">Create a Startup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name */}
        <div className="flex items-center border border-gray-300 p-2 rounded-md">
          <FaBuilding className="text-green-600 mr-2" />
          <input
            type="text"
            placeholder="Startup Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Description */}
        <div className="flex items-center border border-gray-300 p-2 rounded-md">
          <FaBuilding className="text-green-600 mr-2" />
          <textarea
            placeholder="Brief Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full outline-none"
            required
          ></textarea>
        </div>

        {/* Services */}
        <div className="flex items-center border border-gray-300 p-2 rounded-md">
          <FaServicestack className="text-green-600 mr-2" />
          <input
            type="text"
            placeholder="Services Offered"
            value={services}
            onChange={(e) => setServices(e.target.value)}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center border border-gray-300 p-2 rounded-md">
          <FaEnvelope className="text-green-600 mr-2" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Contact */}
        <div className="flex items-center border border-gray-300 p-2 rounded-md">
          <FaPhone className="text-green-600 mr-2" />
          <input
            type="text"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Address */}
        <div className="flex items-center border border-gray-300 p-2 rounded-md">
          <FaMapMarkerAlt className="text-green-600 mr-2" />
          <input
            type="text"
            placeholder="Business Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Operating Hours */}
        <div className="flex items-center border border-gray-300 p-2 rounded-md">
          <FaRegClock className="text-green-600 mr-2" />
          <input
            type="text"
            placeholder="Operating Hours (e.g. 9 AM - 5 PM)"
            value={operatingHours}
            onChange={(e) => setOperatingHours(e.target.value)}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Website */}
        <div className="flex items-center border border-gray-300 p-2 rounded-md">
          <FaGlobe className="text-green-600 mr-2" />
          <input
            type="text"
            placeholder="Website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Create Startup
        </button>
      </form>
    </div>
    </section>
  );
};

export default CreateStartup;
