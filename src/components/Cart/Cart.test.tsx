import { render, screen } from "@testing-library/react";
import { Cart } from "./Cart";
import { products } from "../../data/product";
import userEvent from "@testing-library/user-event";

const cart = products.slice(0, 2); // obtendo os dois primeiros produtos do array

const mockDispatch = jest.fn();

jest.mock("react-redux", () => {
  return {
    useDispatch: () => {
      return mockDispatch;
    },
  };
});

describe("Cart > Unit tests", () => {
  it("shold render an empty cart correctly", () => {
    render(<Cart showCart={true} cart={[]} />);

    const titleElement = screen.getByRole("heading", { level: 1 });
    const totalElement = screen.getByTestId("total");
    const cartListElement = screen.getByRole("list"); //ul

    expect(titleElement).toHaveTextContent("Carrinho");
    expect(totalElement).toHaveTextContent("$0");
    expect(cartListElement).toBeEmptyDOMElement();
  });
});
it("should render a cart with two products", () => {
  render(<Cart showCart={true} cart={cart} />);

  const productsItemElements = screen.getAllByRole("listitem");
  const firstProductTitleElement = screen.getByText(cart[0].title);
  const secondProductTitleElement = screen.getByText(cart[1].title);

  expect(productsItemElements.length).toBe(2);
  expect(firstProductTitleElement).toBeInTheDocument();
  expect(secondProductTitleElement).toBeInTheDocument();
});

it("should remove product when remove button is clicked", () => {
  render(<Cart showCart={true} cart={[products[0]]} />);

  const removeProductButton = screen.getByRole("button", { name: "Remover" });

  userEvent.click(removeProductButton);

  expect(mockDispatch).toHaveBeenCalled();
});
