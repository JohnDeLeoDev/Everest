import { render, screen } from '@testing-library/react';
import App from './App';
import { calculateShipping } from './Customer/Buy';
/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

//file to test customer use cases
import { calculateShipping } from "./Buy";
*/

//tests for latitude-longitude conversion to distance (mi)
//giving 5% tolerance 
test('calc lat-long distance', () => {
    let storeLat = 42.361145;
    let storeLong = -71.057083;
    let custLat = 32.715736;
    let custLong = -117.161087;
    let tol = (2578*0.05);
    let costPerMile = 3.00;
    let distance = calculateShipping(storeLat, storeLong, custLat, custLong, costPerMile);
    expect(distance).toBeGreaterThan(costPerMile*(2578-tol));
    expect(distance).toBeLessThan(costPerMile*(2578+tol));  //miles
    });
