import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

interface Location {
  id: number;
  location: string;
  averageHomeValue: number;
  averageRent: number|null;
  grossRentMultiplier: number|null;
}  

// Mock fetch call
const mockData: Location[] = [
  {
    "id": 1,
    "location":"Colorado: Boulder",
    "averageHomeValue":800000,
    "averageRent":3000,
    "grossRentMultiplier":.2 
  },
  {
    "id": 2,
    "location":"Colorado: Denver",
    "averageHomeValue":750000,
    "averageRent":2500,
    "grossRentMultiplier":.2
  },
  {
    "id": 3,
    "location":"Nevada: Boulder City",
    "averageHomeValue":350000,
    "averageRent":1500,
    "grossRentMultiplier":.2
  },
  {
    "id": 4,
    "location":"Florida: Miami",
    "averageHomeValue":500000,
    "averageRent":null,
    "grossRentMultiplier":null
  }
];

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    } as Response),
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

// Simple tests of initial state
describe('App initially renders correctly', () => {

  it('renders page title', () => {
    const { getByText } = render(<App />);
    const headerEl = getByText(/Gross Rent Multiplier/i);
    expect(headerEl).toBeInTheDocument();
  });

  it('renders paragraphs', () => {
    const { getByText } = render(<App />);
    const paragraph1 = getByText(/Find the average gross multiplier by city./i);
    const paragraph2 = getByText(/To start, select a city and click submit. To compare cities, just repeat./i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('renders placeholder text in results area', () => {
    const { getByText } = render(<App />);
    const resultsPlaceholder = getByText(/Select a city above to start./i);
    expect(resultsPlaceholder).toBeInTheDocument();
  });

  it('renders search button', () => {
    const { getByText } = render(<App />);
    const button = getByText("Submit");
    expect(button).toBeInTheDocument();
  });

  it('renders search selector field', () => {
    const { getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText("Choose Location");
    expect(input).toBeInTheDocument();
  });

});

// Test search functionality
describe('Search works correctly', () => {

  it('shows search results correctly', async () => {

    // Set up
    //@ts-ignore
    await act( async () => render(<App />) );
    const { 
      getByText, 
      getByPlaceholderText, 
    } = screen;

    // Get search field and submit button
    const input = getByPlaceholderText("Choose Location");
    const button = getByText("Submit");

    // Execute search
    await waitFor(() => fireEvent.change(input, {target: {value: 'boulder'}}));
    await waitFor(() => screen.getAllByText('Boulder'), { timeout: 4500 } );
    const menuItem = screen.getByRole('option', { name : 'Colorado: Boulder' });
    fireEvent.click(menuItem);
    fireEvent.click(button);
    
    // Check that result exists
    expect(screen.getByText("Colorado: Boulder")).toBeInTheDocument();
    expect(screen.getByText("Average Home Value:")).toBeInTheDocument();
    expect(screen.getByText("Average Rental Price:")).toBeInTheDocument();
    expect(screen.getByText("Gross Rent Multiplier:")).toBeInTheDocument();
      
  })    

});