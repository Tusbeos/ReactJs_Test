# 1. Project Overview (Frontend)
- **Project:** Medical Appointment Booking System (Client Side).
- **Role:** Frontend Interface for Patients (Booking) and Admin/Doctors (Management).
- **Tech Stack:** React.js (Legacy Class Components).
- **Backend Connection:** Consumes RESTful APIs from Node.js Backend.

# 2. Architecture & Folder Structure Rules
- **Pattern:** Container - Component Pattern.
  - `src/components`: **Presentational Components** (UI only, reusable, receive `this.props`).
  - `src/containers`: **Container Components** (Pages, Business Logic, Connect to Redux).
  - `src/services`: **API Services** (All Axios calls MUST be defined here).
- **Key Modules:**
  - `src/containers/System`: Admin dashboard (Manage Users, Doctors, Clinics).
  - `src/containers/HomePage`: Public interface for Patients.
  - `src/services`: Contains files like `userService.js`, `doctorService.js`.
- **Styling:** SCSS (`.scss`). Each component has its own SCSS file.

# 3. Coding Style & Conventions (CLASS COMPONENT)
- **Component Type:** **ALWAYS use Class Components** (`class MyComponent extends Component`).
- **State Management:**
  - Use `this.state` and `this.setState`.
  - Use **Redux** (`connect`, `mapStateToProps`, `mapDispatchToProps`) for global state.
- **Naming:**
  - Components: **PascalCase** (e.g., `OutstandingDoctor.js`).
  - Functions: **camelCase** (e.g., `handleSaveUser`).
- **Comments/Explanation:** **Vietnamese (Tiếng Việt)**.
- **Bindings:** Use Arrow Functions for methods to avoid manual binding.

# 4. API Integration Rules (SERVICE PATTERN)
- **Strict Rule:** **NEVER** call `axios.get` or `axios.post` directly inside a Component.
- **How to implement:**
  1.  **Create Service:** Define the API call in `src/services` (e.g., `userService.js`).
      - *Example:* `export const getAllUsers = (inputId) => { return axios.get(...) }`
  2.  **Import Service:** Import the service function into the Container Component.
  3.  **Call Service:** Call the function inside `componentDidMount` or event handlers.
- **Data Flow:** Component -> Call Service Function -> Receive Promise -> `this.setState`.
- **Error Handling:** Check `response.errCode` from the backend before setting state.

# 5. Instructions for Copilot
- **Code Generation:**
  - When asked to create a feature involving API, **ALWAYS generate 2 parts**:
    1. The code for `src/services/xyzService.js`.
    2. The code for the Component using that service.
  - NEVER generate Functional Components or Hooks (useState, useEffect).
- **Integration:** Assume Backend returns JSON (`{ errCode: 0, data: ... }`).
- **Language:** Explain UI logic in Vietnamese.