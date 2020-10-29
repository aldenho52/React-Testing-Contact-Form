import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import ContactForm from './components/ContactForm'
import { act } from "react-dom/test-utils";

test("renders App without crashing", () => {
  render(<App />);
});

test('user can fill out form', async () => {
  render (<ContactForm />)

  const firstName = screen.getByLabelText(/first name*/i);
  const lastName = screen.getByLabelText(/last name*/i);
  const email = screen.getByLabelText(/email*/i);
  const message = screen.getByLabelText(/message/i);

  fireEvent.change(firstName, {target: {value: 'Ald', name: 'firstName'}})
  fireEvent.change(lastName, {target: {value: 'Ho', name: 'lastName'}})
  fireEvent.change(email, {target: {value: 'ach52@gmail.com', name: 'email'}})
  fireEvent.change(message, {target: {value: 'good', name: 'message'}})


  const submitBtn = screen.getByTestId(/submit/i)
  fireEvent.click(submitBtn)

  const newFirstName = await screen.queryByText(/ald/i)
  expect(newFirstName).toBeInTheDocument

  const newLastName = await screen.queryByText(/ho/i)
  expect(newLastName).toBeInTheDocument

  const newEmail = await screen.queryByText(/ach52@gmail.com/i)
  expect(newEmail).toBeInTheDocument
  
  const newMessage = await screen.queryByText(/good/i)
  expect(newMessage).toBeInTheDocument


})
