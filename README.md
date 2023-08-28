# Southern Lights Frontend assignment example

This code provides a frontend implementation example for Southern Lights frontend developer test.

## Getting Started

To run the development server, follow these steps:

1. Clone this repository to your local machine.

2. Install the required dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```
3. Start the development server:

npm run dev
# or
yarn dev

4. Open http://localhost:3000 in your web browser to view the application.
.
.
.

## Pages - Modifications are made to the main index file in api folder
## Components
Capex Component
The Capex component allows users to enter capex-related data, including size, hardware cost per MW, and installation cost per MW. Input fields are validated to ensure they are greater than 0. Errors are displayed if input field is empty.

H2production Component
The H2production component allows users to enter hydrogen production data, including energy input, SEC, degradation per year, and number of years. Similar to the Capex component, input fields are validated to ensure positive values.

LCOH Calculation and Display
The app calculates the Levelized Cost of Hydrogen (LCOH) based on the provided capex and hydrogen production data. The calculated LCOH is displayed. validation is applied that the third API will be called only when the first two are valid and are completely executed. Loading indicator is displayed during data processing to enhance user experience.
## API Routes
API routes can be accessed on http://localhost:3000/api/capex. The endpoints are defined in the pages/api directory. The capex and h2production endpoints handle data submission and processing, and the lcoh endpoint calculates the LCOH based on the submitted data.



