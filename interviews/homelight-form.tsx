import React, { useState } from "react";
import "./App.css";
// import * as personApi from "./api/PersonApi";

const PHONE_VALIDATOR = /^\d{10}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

/* Next steps
 * 1. Split email, phone and name into components
 *   a. each components will be moved to components folder
 * 2. Split name into 2 inputs (nice to have)
 * 3. Implement a dummy call to an api, currently PersonApi only prints the values
 * 4. Add ids to the form (nice to have)
 */
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  /*
   * Validate that inputs have values before sending the request to
   * PersonApi
   */
  function handleOnSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();

    if (!name) {
      setError("Name cannot be empty");
      return;
    }

    if (!phone) {
      setError("Phone cannot be empty");
      return;
    }

    if (!email) {
      setError("Email cannot be empty");
      return;
    }

    // personApi.requestApi({ name, phone, email });
  }

  /*
   * Handles the onChange event from the form, this should be working
   * with name input
   */
  function handleOnChangeName(event: React.SyntheticEvent): void {
    event.preventDefault();
    setError("");

    const rawName = event.target.value;
    if (rawName.split(" ").length < 2) {
      setError("Name must contain first name and last name");
      return;
    }

    setName(rawName);
  }

  /*
   * Handles the onChange event from the form, this should be working
   * with phone input
   */
  function handleOnChangePhone(event: React.SyntheticEvent): void {
    event.preventDefault();
    setError("");

    const rawPhone: string = event.target.value;
    if (isNaN(Number(rawPhone))) {
      setError("phone number must be a number");
      return;
    }

    // numeric && 10 digits
    if (!PHONE_VALIDATOR.test(rawPhone)) {
      setError("Phone number must be 10 digits");
      return;
    }

    setPhone(rawPhone);
  }

  /*
   * Handles the onChange event from the form, this should be working
   * with email input
   */
  function handleOnChangeEmail(event: React.SyntheticEvent): void {
    event.preventDefault();
    setError("");

    const rawEmail: string = event.target.value;
    if (!EMAIL_REGEX.test(rawEmail)) {
      setError("Email must be valid");
      return;
    }

    setEmail(rawEmail);
  }

  return (
    <div className="app">
      <form onSubmit={handleOnSubmit}>
        <div>{error}</div>
        <div>
          <label>Name</label>
          <input onChange={handleOnChangeName} />
        </div>
        <div>
          <label>Email</label>
          <input onChange={handleOnChangeEmail} />
        </div>
        <div>
          <label>Phone</label>
          <input onChange={handleOnChangePhone} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
