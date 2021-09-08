// Import testing resources
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Import component 
import App from './App';

// Test Suite
describe('App initially renders correctly', () => {
  
  it('renders page title', () => {
    const { getByText } = render(<App />);
    const headerEl = screen.getByText(/Gross Rent Multiplier/i);
    expect(headerEl).toBeInTheDocument();
  });

  it('renders paragraphs', () => {
    const { getByText } = render(<App />);
    const paragraph1 = screen.getByText(/Find the average gross multiplier by city./i);
    const paragraph2 = screen.getByText(/To start, select a city and click submit. To compare cities, just repeat./i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('renders placeholder text in results area', () => {
    const { getByText } = render(<App />);
    const resultsPlaceholder = screen.getByText(/Select a city above to start./i);
    expect(resultsPlaceholder).toBeInTheDocument();
  });

  it('renders search button', () => {
    const { getByText } = render(<App />);
    const button = getByText("Submit");
    expect(button).toBeInTheDocument()
  });

  it('renders search selector field', () => {
    const { getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText("Choose Location");
    expect(input).toBeInTheDocument()
  });

});

// Test Suite
describe('Search works correctly', () => {

  it('shows search results correctly', async () => {
    const { 
      getByText, 
      getByPlaceholderText, 
      debug, 
      getAllByText,
      findByText,
      getByDisplayValue, 
      getByRole
    } = render(<App />);
    const input = getByPlaceholderText("Choose Location");
    const button = getByText("Submit");

    // Search for value
    
    // await waitFor(() => {
    //   fireEvent.change(input, {target: {value: 'boulder'}});
    //   const menuItem = getByText('Colorado: Boulder');
    //   fireEvent.click(menuItem);
    // })

    await waitFor(() => fireEvent.change(input, {target: {value: 'boulder'}}));
    await waitFor(() => getAllByText('Boulder'));
    //const menuItem = getByText('Colorado');
    const menuItem = getByRole('option', { name : 'Colorado: Boulder' });
    fireEvent.click(menuItem);
    fireEvent.click(button);

      // const { getByTestId } = render(<App />);
      // where <value> is the option value without angle brackets!
      // userEvent.selectOptions(getByTestId('select'), '<value>');
      // expect((getByTestId('<value>') as HTMLOptionElement).selected).toBeTruthy();
      // expect((getByTestId('<another value>') as HTMLOptionElement).selected).toBeFalsy();

    //expect(getByDisplayValue('Colorado: Boulder')).toBeInTheDocument();

    // await waitFor(() => {
    //   fireEvent.click(button);
    // });

    // expect(getByText('Colorado: Boulder')).toBeInTheDocument();
    
    debug();
    
  });

});