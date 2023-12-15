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
    let tol = (2249*0.03);
    let costPerMile = 3.00;
    let distance = calculateShipping(storeLat, storeLong, custLat, custLong, costPerMile);
    expect(distance).toBeGreaterThan(costPerMile*(2249-tol));
    expect(distance).toBeLessThan(costPerMile*(2249+tol));  //miles
    });

    test('calc TEST lat-long distance', () => {
      let storeLat = 0;
      let storeLong = 0;
      let custLat = 0;
      let custLong = 1;
      let costPerMile = 0.03;
      let distance = calculateShipping(storeLat, storeLong, custLat, custLong, costPerMile);
      expect(distance).toBeCloseTo(60*costPerMile);  //miles
      });

      test('calc TEST1 lat-long distance', () => {
        let storeLat = 118.2425;
        let storeLong = 34.0549;
        let custLat = 22.0020;
        let custLong = 33.0030;
        let costPerMile = 0.03;
        let distance = calculateShipping(storeLat, storeLong, custLat, custLong, costPerMile);
        expect(distance).toBeCloseTo(60*costPerMile);  //miles
        });