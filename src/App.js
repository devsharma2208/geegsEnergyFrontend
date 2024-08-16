import "./App.css";
import LoginForm from "./login";
import RegistrationForm from "./registration";
import HomePage from "./HomePage";
import { Route, Routes } from "react-router";
import Header from "./Header";

function App() {
  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/registration/:id" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
