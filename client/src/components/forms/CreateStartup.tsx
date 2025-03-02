import { useState } from "react";
import {
  FaBuilding,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaRegClock,
  FaServicestack,
} from "react-icons/fa";
import { useAppDispatch } from "../../hooks/storeHooks";
import { postStartups } from "../../store/features/startupSlice";
import { useNavigate } from "react-router-dom";

const CreateStartup = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [website, setWebsite] = useState("");

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
    navigate("/");
    setName("");
    setDescription("");
    setServices("");
    setEmail("");
    setContact("");
    setAddress("");
    setOperatingHours("");
    setWebsite("");
  };

  return (
    <section className="min-h-screen flex justify-center items-center mt-10 px-4">
      <div className="max-w-xl w-full p-6 bg-white shadow-md rounded-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-6">
          Create a Startup
        </h2>
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
          {/* Services */}
          <div className="flex flex-col border border-gray-300 p-3 rounded-md focus-within:border-green-600">
            <div className="relative">
              <FaServicestack className="text-green-600 text-lg absolute top-1/2 left-3 transform -translate-y-1/2" />
              <select
                id="services"
                value={services}
                onChange={(e) => setServices(e.target.value)}
                className="w-full outline-none pl-12 pr-4 py-2 text-sm text-gray-700 rounded-md bg-white border border-gray-300 appearance-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
              >
                <option className="text-black/10">Services</option>
                <option value="CROWD_FUNDING">Crowd Funding</option>
                <option value="AI_ML">AI/ML</option>
                <option value="AR_VR">AR/VR</option>
                <option value="HEALTHCARE">Health Care</option>
                <option value="E_COMMERCE">E-Commerce</option>
                <option value="FINTECH">Fintech</option>
                <option value="TECHNOLOGY">Technology</option>
                <option value="FOOD">Food</option>
                <option value="CLOUD_COMPUTING">Cloud Computing</option>
                <option value="CYBER_SECURITY">CyberSecurity</option>
                <option value="BIOTECHNOLOGY">Bio Technology</option>
                <option value="SOFTWARE_DEVELOPMENT">Software Development</option>
                <option value="BLOCKCHAIN">BlockChain</option>
                <option value="HEALTHTECH">Health Tech</option>
                <option value="MEDICAL_DEVICES">Medical Devices</option>
                <option value="MENTAL_HEALTH">Mental Health</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
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
