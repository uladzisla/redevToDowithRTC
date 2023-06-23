import { ToDo } from "./pages/ToDo";
import { LogIn } from "./pages/LogIn";
import { RegistrationForm } from "./pages/Registr";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./component/hoc/PrivateRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />}></Route>
      <Route path="/LogIn" element={<LogIn />}></Route>
      <Route
        path="/todo"
        element={
          <PrivateRoute>
            <ToDo />
          </PrivateRoute>
        }
      ></Route>

      <Route path="/RegistrationForm" element={<RegistrationForm />}></Route>
    </Routes>
  );
}

export default App;
