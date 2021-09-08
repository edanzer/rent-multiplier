// Import testing resources
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import component 
import App from './App';

describe('App initially renders correctly', () => {
  
  afterEach(cleanup);

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

describe('Search works correctly', () => {

  afterEach(cleanup);

  it('shows search results correctly', async () => {

    // Setup
    const { 
      getByText, 
      getByPlaceholderText, 
      getAllByText,
      getByRole
    } = render(<App />);
    const input = getByPlaceholderText("Choose Location");
    const button = getByText("Submit");

    // Execute search
    await waitFor(() => fireEvent.change(input, {target: {value: 'boulder'}}));
    await waitFor(() => getAllByText('Boulder'));
    const menuItem = getByRole('option', { name : 'Colorado: Boulder' });
    fireEvent.click(menuItem);
    fireEvent.click(button);
    
    // Check that result exists
    expect(getByText("Colorado: Boulder")).toBeInTheDocument();
    expect(getByText("Average Home Value:")).toBeInTheDocument();
    expect(getByText("Average Rental Price:")).toBeInTheDocument();
    expect(getByText("Gross Rent Multiplier:")).toBeInTheDocument();
    
  });
});