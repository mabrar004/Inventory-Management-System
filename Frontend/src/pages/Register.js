import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input change for registration form
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear the error for this field
  };

  // Validate form inputs
  const validateForm = () => {
    let validationErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    const phonePattern = /^[0-9]{10,15}$/; // Assuming phone number length between 10-15 digits

    if (!form.firstName) validationErrors.firstName = "First Name is required";
    if (!form.lastName) validationErrors.lastName = "Last Name is required";
    if (!form.email) {
      validationErrors.email = "Email is required";
    } else if (!emailPattern.test(form.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!form.password) {
      validationErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }
    if (!form.phoneNumber) {
      validationErrors.phoneNumber = "Phone Number is required";
    } else if (!phonePattern.test(form.phoneNumber)) {
      validationErrors.phoneNumber = "Invalid phone number";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Register User
  const registerUser = async () => {
    if (!validateForm()) return; // Only register if validation passes

    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Registration failed");

      alert("Successfully Registered, Now Login with your details");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration");
    }
  };

  // Uploading image to Cloudinary
  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "inventoryapp");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      setForm({ ...form, imageUrl: result.url });
      alert("Image Successfully Uploaded");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(); // Call registerUser on form submit
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center place-items-center">
      <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={require("../assets/logo.png")}
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 -space-y-px rounded-md shadow-sm">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  name="firstName"
                  type="text"
                  required
                  className={`relative block w-full rounded-md border py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
              </div>
              <div className="flex-1">
                <input
                  name="lastName"
                  type="text"
                  required
                  className={`relative block w-full rounded-md border py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`relative block w-full rounded-md border py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                placeholder="Email address"
                value={form.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`relative block w-full rounded-md border py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                placeholder="Password"
                value={form.password}
                onChange={handleInputChange}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <div>
              <input
                name="phoneNumber"
                type="text"
                required
                className={`relative block w-full rounded-md border py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
                placeholder="Phone Number"
                value={form.phoneNumber}
                onChange={handleInputChange}
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
            </div>
            <UploadImage uploadImage={uploadImage} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                required
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                I Agree to Terms & Conditions
              </label>
            </div>

            <div className="text-sm">
              <span
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <span
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already Have an Account?{" "}
                <Link to="/login"> Sign in now </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
      <div className="flex justify-center order-first sm:order-last">
        <img src={require("../assets/Login.png")} alt="" />
      </div>
    </div>
  );
}

export default Register;
