import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "./Auth/AuthForm";
// import userDetails from "../pages/UserDetails";
// import Home from "../pages/Home";
describe("Expense Tracker", () => {
  test("renders sign up:", () => {
    //Arrange
    render(<AuthForm />);
    // Act
    //..nothing
    const buttonElement = screen.getByText("create new account", {
      exact: false,
    });
    userEvent.click(buttonElement);
    //Assert
    const testElement = screen.getByText("Sign up");
    expect(testElement).toBeInTheDocument();
  });
});
