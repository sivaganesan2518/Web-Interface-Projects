
import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    course: "",
    college: "",
    linkedin: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    setSuccess("");
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must contain at least 3 characters";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Mobile
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    // DOB
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    // Gender
    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    // City
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // State
    if (!formData.state) {
      newErrors.state = "Please select a state";
    }

    // Pincode
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must contain 6 digits";
    }

    // Course
    if (!formData.course) {
      newErrors.course = "Please select a course";
    }

    // College
    if (!formData.college.trim()) {
      newErrors.college = "College name is required";
    }

    // LinkedIn
    if (!formData.linkedin.trim()) {
      newErrors.linkedin = "LinkedIn URL is required";
    } else if (
      !/^https?:\/\/(www\.)?linkedin\.com\/.+/i.test(formData.linkedin)
    ) {
      newErrors.linkedin = "Enter a valid LinkedIn URL";
    }

    // Terms
    if (!formData.terms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccess("Registration completed successfully!");

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        dob: "",
        gender: "",
        password: "",
        confirmPassword: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        course: "",
        college: "",
        linkedin: "",
        terms: false,
      });
    }
  };

  return (
    <div className="page">
      <div className="form-container">

        <div className="form-header">
          <h1>Student Registration</h1>
          <p>Enter your details carefully to create your profile</p>
        </div>

        {success && (
          <div className="success-message">
            ✓ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            {/* 1 Full Name */}
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <span className="error">{errors.fullName}</span>
              )}
            </div>

            {/* 2 Email */}
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error">{errors.email}</span>
              )}
            </div>

            {/* 3 Mobile */}
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile"
                placeholder="10-digit mobile number"
                maxLength="10"
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && (
                <span className="error">{errors.mobile}</span>
              )}
            </div>

            {/* 4 DOB */}
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && (
                <span className="error">{errors.dob}</span>
              )}
            </div>

            {/* 5 Gender */}
            <div className="form-group">
              <label>Gender</label>

              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  Male
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  Female
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={handleChange}
                  />
                  Other
                </label>
              </div>

              {errors.gender && (
                <span className="error">{errors.gender}</span>
              )}
            </div>

            {/* 6 Password */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            {/* 7 Confirm Password */}
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>

            {/* 8 Address */}
            <div className="form-group full-width">
              <label>Address</label>
              <textarea
                name="address"
                placeholder="Enter your complete address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
              ></textarea>

              {errors.address && (
                <span className="error">{errors.address}</span>
              )}
            </div>

            {/* 9 City */}
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && (
                <span className="error">{errors.city}</span>
              )}
            </div>

            {/* 10 State */}
            <div className="form-group">
              <label>State</label>

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Kerala">Kerala</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
              </select>

              {errors.state && (
                <span className="error">{errors.state}</span>
              )}
            </div>

            {/* 11 Pincode */}
            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                placeholder="6-digit pincode"
                maxLength="6"
                value={formData.pincode}
                onChange={handleChange}
              />
              {errors.pincode && (
                <span className="error">{errors.pincode}</span>
              )}
            </div>

            {/* 12 Course */}
            <div className="form-group">
              <label>Course</label>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
              >
                <option value="">Select Course</option>
                <option value="B.E CSE">B.E Computer Science</option>
                <option value="B.E ECE">B.E Electronics</option>
                <option value="B.E EEE">B.E Electrical</option>
                <option value="B.Tech IT">B.Tech Information Technology</option>
                <option value="B.Sc CS">B.Sc Computer Science</option>
              </select>

              {errors.course && (
                <span className="error">{errors.course}</span>
              )}
            </div>

            {/* 13 College */}
            <div className="form-group">
              <label>College Name</label>
              <input
                type="text"
                name="college"
                placeholder="Enter college name"
                value={formData.college}
                onChange={handleChange}
              />
              {errors.college && (
                <span className="error">{errors.college}</span>
              )}
            </div>

            {/* 14 LinkedIn */}
            <div className="form-group">
              <label>LinkedIn Profile</label>
              <input
                type="url"
                name="linkedin"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedin}
                onChange={handleChange}
              />
              {errors.linkedin && (
                <span className="error">{errors.linkedin}</span>
              )}
            </div>

          </div>

          {/* 15 Terms */}
          <div className="terms-section">
            <label className="terms-label">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              <span>
                I agree to the Terms and Conditions
              </span>
            </label>

            {errors.terms && (
              <span className="error">{errors.terms}</span>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>

        </form>
      </div>
    </div>
  );
}

export default App;
