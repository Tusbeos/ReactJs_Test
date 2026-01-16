# 1. Project Overview (Frontend)
- **Project:** Medical Appointment Booking System (Client Side).
- **Role:** Frontend Interface for Patients (Booking) and Admin/Doctors (Management).
- **Tech Stack:** React.js (Single Page Application).
- **Backend Connection:** Consumes RESTful APIs from Node.js Backend.

# 2. Architecture & Folder Structure Rules
- **Pattern:** Container - Component Pattern.
  - `src/components`: **Presentational Components** (UI only, reusable, receive Props, no complex logic).
  - `src/containers`: **Container Components** (Pages, Business Logic, Connect to Redux/State, Call APIs).
- **Key Modules:**
  - `src/containers/System`: Admin dashboard (Manage Users, Doctors, Clinics).
  - `src/containers/HomePage`: Public interface for Patients.
  - `src/containers/Patient`: Booking flow & Email verification.
- **Styling:** SCSS (`.scss`). Each component has its own SCSS file.

# 3. Coding Style & Conventions
- **Language:** JavaScript (ES6+).
- **Naming:**
  - Components: **PascalCase** (e.g., `OutstandingDoctor.js`).
  - Variables/Functions: **camelCase** (e.g., `handleSaveUser`, `isLoggedIn`).
- **Comments/Explanation:** **Vietnamese (Tiếng Việt)**.
- **State Management:** Use React Hooks (`useState`, `useEffect`) or Redux (if configured).

# 4. API Integration Rules
- **Format:** Use Axios for HTTP requests.
- **Error Handling:** Always catch errors and display Notifications/Toasts (e.g., `CustomToast`).
- **Data Flow:**
  - Call API in `componentDidMount` or `useEffect`.
  - Store data in State -> Render to UI.

# 5. Instructions for Copilot
- **Context:** When I ask for a feature (e.g., "Show Doctor List"), generate both the logic (Container) and the UI (Component).
- **Integration:** Assume the Backend returns JSON data (Standard: `{ errCode: 0, data: ... }`).
- **Styling:** When writing JSX, suggesting corresponding SCSS class names (BEM naming preferred).
- **Language:** Explain the UI logic in Vietnamese.