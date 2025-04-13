import CreateStartupForm from "../forms/CreateStartupForm";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchStartups } from "../../store/features/startupSlice";
import { useAppDispatch } from "../../hooks/storeHooks";

export default function CreateStartupPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  let BASE_URL;
  if (import.meta.env.VITE_NODE_ENV === "development") {
    BASE_URL = "http://localhost:3000/api/startups";
  } else {
    BASE_URL = "https://startup-directory-server.vercel.app/api/startups";
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //error checking
  const validateForm = () => {
    if (name.trim() === "") {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
    }
    if (description.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        description: "Description is required",
      }));
    }
    if (services.trim() === "") {
      setErrors((prev) => ({ ...prev, services: "Services is required" }));
    }
    if (contact.trim() === "") {
      setErrors((prev) => ({ ...prev, contact: "Contact is required" }));
    }
    if (website.trim() === "") {
      setErrors((prev) => ({ ...prev, website: "Website is required" }));
    }
    if (address.trim() === "") {
      setErrors((prev) => ({ ...prev, address: "Address is required" }));
    }
    if (operatingHours.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        operatingHours: "Operating hours is required",
      }));
    }
    if (email.trim() === "") {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    }
    if (!image) {
      setErrors((prev) => ({ ...prev, image: "Image is required" }));
    }

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement | HTMLImageElement>) => {
    try {
      event.preventDefault();
      if (!validateForm()) {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("services", services);
        formData.append("contact", contact);
        formData.append("website", website);
        formData.append("address", address);
        formData.append("operatingHours", operatingHours);
        formData.append("email", email);
        formData.append("logo", image as File);
        const response = await axios.post(BASE_URL, formData);
        console.log(response.data);
        if (response.status === 201) {
          setIsSubmitting(true);
          setSuccess(true);
          dispatch(fetchStartups());
          navigate("/");
        } else {
          setIsSubmitting(false);
          setSuccess(false);
          setErrors((prev) => ({ ...prev, axiosError: response.data.message }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CreateStartupForm 
        handleSubmit={handleSubmit} 
        handleImageChange={handleImageChange}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        name={name}
        setName={setName}
        services={services}
        setServices={setServices}
        contact={contact}
        setContact={setContact}
        address={address}
        setAddress={setAddress}
        email={email}
        setEmail={setEmail}
        website={website}
        setWebsite={setWebsite}
        description={description}
        setDescription={setDescription}
        operatingHours={operatingHours} 
        setOperatingHours={setOperatingHours}
        isSubmitting={isSubmitting}
        success={success}        
        errors={errors} 
        setImage={setImage}       
    />
    </div>
  );
}
