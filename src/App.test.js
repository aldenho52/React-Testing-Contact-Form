import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import ContactForm from './components/ContactForm'

test("renders App without crashing", () => {
  render(<App />);
});

test('user can fill out form', () => {
  render (<ContactForm />)

  const firstName = screen.getByLabelText(/first name*/i);
  const lastName = screen.getByLabelText(/last name*/i);
  const email = screen.getByLabelText(/email*/i);
  const message = screen.getByLabelText(/message/i);

  fireEvent.change(firstName, {target: {value: 'Ald', name: 'firstName'}})
  fireEvent.change(lastName, {target: {value: 'Ho', name: 'lastName'}})
  fireEvent.change(email, {target: {value: 'ach52@gmail.com', name: 'email'}})
  fireEvent.change(message, {target: {value: 'Alden', name: 'message'}})

  
})
