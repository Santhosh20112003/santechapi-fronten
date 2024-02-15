import React, { useState } from 'react';
export default function App() {
  // State to hold form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    age: '',
    gender: '',
    email: '',
    mobile: '',
    qualification: '',
    degree: '',
    majorSubject: '',
    graduationYear: '',
    collegeName: '',
    collegeState: '',
    collegeDistrict: '',
    resume: null,
  });

  // Handler function to update form data
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    // Use a conditional to handle different input types
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  // Handler function to submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission, e.g., API calls or other actions
    console.log('Form submitted with data:', formData);
  };

  return (
    <div>
      <h2>Student Registration Form</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div>
        <label htmlFor="age">Age:</label>
        <input
        type="text"  // Change the type to "text"
        id="age"
        name="age"
        value={formData.age}
        onChange={handleChange}
        required
        />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
        </div>
        <div>
          <label htmlFor="qualification">Qualification:</label>
          <input
            type="text"
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="degree">Degree:</label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="majorSubject">Major Subject:</label>
          <input
            type="text"
            id="majorSubject"
            name="majorSubject"
            value={formData.majorSubject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="graduationYear">Graduation Year:</label>
          <input
            type="number"
            id="graduationYear"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="collegeName">College Name:</label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="collegeState">College State:</label>
          <input
            type="text"
            id="collegeState"
            name="collegeState"
            value={formData.collegeState}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="collegeDistrict">College District:</label>
          <input
            type="text"
            id="collegeDistrict"
            name="collegeDistrict"
            value={formData.collegeDistrict}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="resume">Resume:</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
