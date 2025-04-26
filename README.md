
# RetailEye UI

**RetailEye UI** is the front-end application for the **[RetailEye API](https://github.com/develop1992/retaileye-api)**, designed to provide a comprehensive interface for managing employee safety, camera assignments, shift management, and incident reporting in retail environments. The UI integrates with the backend API to display and manage data related to employees, shifts, body cameras, incidents, and recordings.

## Features

- **Employee Management**: Add, update, delete, and view employees.
- **Shift Management**: Assign shifts to employees, view shift details, and track their working hours.
- **Body Camera Assignment**: Assign body cameras to employees during shifts and track their usage.
- **Incident Reporting**: Flag incidents detected during shifts, store and view incident details.
- **Recording Management**: Start/stop video recordings associated with employee shifts and incidents.
- **Real-time Data Interaction**: Fetch and display live data updates for employees, shifts, cameras, incidents, and recordings.

## Tech Stack

- **React**: A JavaScript library for building user interfaces, providing a responsive and dynamic SPA experience.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TanStack Table**: A powerful table library for managing complex data structures efficiently.
- **React Hook Form**: A form handling library with built-in validation to manage forms seamlessly.
- **React Router DOM**: For client-side routing between different pages in the application.
- **Vite**: A fast and efficient build tool for modern web applications.

## Folder Structure

```plaintext
retaileye-ui/
├── public/                       # Public-facing assets (e.g., index.html)
├── src/                          # Source code for the app
│   ├── assets/                   # Static assets like images, logos, etc.
│   ├── components/               # Reusable components (e.g., tables, forms, modals)
│   ├── pages/                    # Pages for various routes (e.g., Dashboard, Employees)
│   ├── hooks/                    # Custom hooks for API interaction, state management
│   ├── utils/                    # Utility functions for common tasks
│   ├── App.tsx                   # Main entry point for the app
│   └── index.tsx                 # React DOM render entry point
├── .env                           # Environment variables for configuration
├── .gitignore                     # Git ignore file
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration file
└── vite.config.js                 # Vite configuration for bundling
```

## Setup & Installation

### Prerequisites

- **Node.js**: Version 16 or higher.
- **npm**: Node package manager.

### Steps to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/develop1992/retaileye-ui.git
   cd retaileye-ui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the backend API URL:

   ```env
   REACT_APP_API_URL=http://localhost:8080
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:5173`.

### Build for Production

To build the project for production, run:

```bash
npm run build
```

This will create an optimized build in the `dist/` folder.

## API Integration

The UI communicates with the **[RetailEye API](https://github.com/develop1992/retaileye-api)** for various operations like managing employees, shifts, cameras, incidents, and recordings. The API is expected to be running on **`http://localhost:8080`** (or the URL specified in `.env`).

## Components

The UI is built with a component-based architecture. Major components include:

- **EmployeeForm**: A form for adding/editing employee details.
- **EmployeeTable**: A table displaying a list of employees.
- **ShiftForm**: A form for assigning shifts to employees.
- **IncidentForm**: A form for reporting incidents during shifts.
- **RecordingPlayer**: A component to stream and view recordings.

## Future Enhancements

- **Real-Time Data Updates**: Implement real-time updates for shifts, cameras, incidents, and recordings using WebSockets or polling.
- **Role-Based Access**: Add user authentication and role-based access (e.g., Admin, Manager, Employee).
- **Incident Analytics**: Provide advanced analytics and reporting for incidents, camera usage, and employee behavior trends.
- **Improved Notifications**: Implement push notifications or in-app alerts for new incidents or updates to employee shifts.
- **Manager Dashboard**: Create an enhanced dashboard for managers to view employee performance, incident statistics, and body camera usage.