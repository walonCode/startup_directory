import { useNavigate, useParams } from "react-router-dom";
import {
  fetchStartups,
  selectStartupById,
  Startup,
} from "../../store/features/startupSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { useState } from "react";
import CreateStartupForm from "../forms/CreateStartupForm";
import axios from "axios";

export default function EditStartupPage() {
  const { id } = useParams<{ id: string }>();
  const startup =
    (useAppSelector((state) => selectStartupById(state, id)) as Startup) || [];
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState(startup.name ? startup.name : "");
  const [description, setDescription] = useState(
    startup.description ? startup.description : ""
  );
  const [services, setServices] = useState(
    startup.services ? startup.services : ""
  );
  const [contact, setContact] = useState(
    startup.contact ? startup.contact : ""
  );
  const [website, setWebsite] = useState(
    startup.website ? startup.website : ""
  );
  const [address, setAddress] = useState(
    startup.address ? startup.address : ""
  );
  const [operatingHours, setOperatingHours] = useState(
    startup.operatingHours ? startup.operatingHours : ""
  );
  const [email, setEmail] = useState(startup.email ? startup.email : "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let BASE_URL;
  if (import.meta.env.VITE_NODE_ENV === "development") {
    BASE_URL = `http://localhost:3000/api/startups/${id}`;
  } else {
    BASE_URL = `https://startup-directory-server.vercel.app/api/startups/${id}`;
  }

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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement | HTMLImageElement>
  ) => {
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
        console.log(formData.values)
        const response = await axios.patch(BASE_URL, formData);
        console.log(response.data);
        if (response.status === 200) {
          setIsSubmitting(true);
          setSuccess(true);
          await dispatch(fetchStartups());
          navigate("/");
        } else {
          setIsSubmitting(false);
          setSuccess(false);
          setErrors((prev) => ({ ...prev, axiosError: response.data.message }));
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
    }
  };

  return (
    <div>
      <CreateStartupForm
        handleSubmit={handleSubmit}
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
        isEdit={true}
      />
    </div>
  );
}
