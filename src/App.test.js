import React from "react";
import { render, screen, fireEvent, getByTestId, getAllByAltText, getAllByTestId } from "@testing-library/react";
import App from "./App";
import ContactForm from './components/ContactForm'
import { act } from "react-dom/test-utils";

test("renders App without crashing", () => {
  render(<App />);
});

test('user can fill out form and axios post request to REQRES successful', async () => {
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

  // new state added from successful req res axios post request
  const newID = await screen.queryByText(/id/i)
  const createdAt = await screen.queryByText(/createdat/i)

})

test('terms checkbox working', () => {
  render (<ContactForm />)

  const terms = screen.getByLabelText(/terms/i)
  fireEvent.click(terms)
  expect(terms).toBeChecked()
  fireEvent.click(terms)
  expect(terms).not.toBeChecked();
})

test('race dropdown menu working', () => {
  render (<ContactForm />)

  const dropdown = screen.getByLabelText(/race/i)

  const human = screen.getByTestId(/human/i)
  const nightelf = screen.getByTestId(/nightelf/i)
  const dwarf = screen.getByTestId(/dwarf/i)
  const gnome = screen.getByTestId(/gnome/i)
  const draenei = screen.getByTestId(/draenei/i)

  
  fireEvent.change(dropdown, {target: {name: dwarf}})
  const dwarfText = screen.queryByText(/dwarf/i)
  fireEvent.change(dropdown, {target: {name: human}})
  const humanText = screen.queryByText(/human/i)
  fireEvent.change(dropdown, {target: {name: nightelf}})
  const nightElfText = screen.queryByText(/night elf/i)
  fireEvent.change(dropdown, {target: {name: gnome}})
  const gnomeText = screen.queryByText(/gnome/i)
  fireEvent.change(dropdown, {target: {name: draenei}})
  const draeneiText = screen.queryByText(/draenei/i)

})