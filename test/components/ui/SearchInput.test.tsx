import { render, screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "@/components/ui/SearchInput";
import { User } from "lucide-react";

describe("SearchInput", () => {
  it("renders an input", () => {
    render(<SearchInput />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders the search button by default", () => {
    render(<SearchInput />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("hides search button when showButton is false", () => {
    render(<SearchInput showButton={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows custom button text", () => {
    render(<SearchInput buttonText="Find" />);
    expect(screen.getByText("Find")).toBeInTheDocument();
  });

  it("shows default button text", () => {
    render(<SearchInput />);
    expect(screen.getByText("Buscar")).toBeInTheDocument();
  });

  it("calls onSearch when button is clicked", () => {
    const onSearch = vi.fn();
    render(<SearchInput onSearch={onSearch} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it("renders label when provided", () => {
    render(<SearchInput label="Artist" />);
    expect(screen.getByText("Artist")).toBeInTheDocument();
  });

  it("does not render label element when not provided", () => {
    render(<SearchInput />);
    expect(screen.queryByText("Artist")).not.toBeInTheDocument();
  });

  it("renders custom icon", () => {
    const { container } = render(<SearchInput icon={User} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("forwards placeholder to input", () => {
    render(<SearchInput placeholder="Type here..." />);
    expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument();
  });
});
