import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'

const ContactForm = () => {

  const [data, setData] = useState();

  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    axios.post('https://reqres.in/api/users', data)
      .then(res => {
        console.log(res)
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            id="firstName"
            name="firstName"
            placeholder="Edd"
            ref={register({ required: true, maxLength: 3 })}
          />
          {errors.firstName && (
            <p>Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Burke"
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email*
          </label>
          <input id="email" name="email" ref={register({ required: true })} />
          {errors.email && (
            <p>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" ref={register({ required: false })} />
        </div>
        {data && (
          <pre data-testid="printout" style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <input data-testid='submit' type="submit" />
      </form>
    </div>
  );
};

export default ContactForm;
