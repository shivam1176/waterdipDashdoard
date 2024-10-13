# Dashboard Project - Requirement Analysis

## Objective
Create a dashboard with 4 charts that update dynamically based on a selected date range.

## Dataset
- **Total Records:** 1k records from a hotel booking dataset.
- **Details Included:**
  - Number of adults, children, babies.
  - Country of origin.
  - Arrival date (year, month, day).

## Key Features

### Date Range Selector
- Users should be able to filter data based on the selected date range.

### Charts
- **Time Series Chart:** Total visitors (adults + children + babies) per day.
- **Column Chart:** Number of visitors per country.
- **Sparkline Chart 1:** Total number of adult visitors.
- **Sparkline Chart 2:** Total number of children visitors.

## Design

### User Interface
- **Single-page React App:**
  - A date picker at the top to select a date range.
  - Charts displayed below the date picker.
  - Data dynamically updates based on the selected date range.

## High-Level View

### Components

#### 1. **App**
- The main component that holds the dashboard layout and all chart components.

#### 2. **DateSelector**
- A component that allows users to select a date range.

#### 3. **TimeSeriesChart**
- Component for the time series chart showing total visitors per day (adults, children, babies combined).
  
#### 4. **ColumnChart**
- Component for the column chart displaying the number of visitors per country.

#### 5. **SparklineChart**
- Component for two sparkline charts:
  - Sparkline for total adult visitors.
  - Sparkline for total child visitors.

### State Management
- Use React’s `useState` and `useEffect` for managing:
  - The selected date range.
  - Chart data updates based on the selected range.

### Data Fetching
- **Data Filtering:**
  - Use JavaScript array methods like `filter`, `map` to process the dataset based on the selected date range.
  - Preprocess the dataset to calculate metrics like total visitors, visitors per country, etc.

### Version Control
- Use **Git** for version control.
- Write **meaningful commit messages**, e.g.:
  - `"Added date range filter functionality"`
  - `"Implemented time series chart for visitor data"`

## Low-Level Design

### DateSelector Component
- **Date Range Picker:** 
  - Implement using a date range picker (e.g., `react-datepicker`).
  - On date selection, filter the data and pass the selected range to child components.

### Chart Components
- **ApexCharts:**
  - Use ApexCharts to implement the different chart types.
  - Each chart should receive the filtered data as props and update dynamically based on the selected date range.
  
  #### Example Charts:
  - **TimeSeriesChart**: Displays visitors per day.
  - **ColumnChart**: Displays visitors by country.
  - **SparklineChart1 & SparklineChart2**: Display adult and children visitors as sparkline graphs.

---

### Tech Stack
- **Frontend:** React, ApexCharts, JavaScript, JSX.
- **State Management:** React Hooks (`useState`, `useEffect`).
- **Version Control:** Git.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
