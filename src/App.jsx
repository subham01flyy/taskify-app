import "./App.css";
import "./index.css"; // Import Tailwind styles here
import HomePage from "./components/HomePage";
import { ThemeProvider } from "./context/ThemeContext";
import { TasksProvider } from "./context/TasksContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskDetails from "./components/TaskDetails";

function App() {
  return (
    <>
      <Router>
        <ThemeProvider>
          <TasksProvider>
            <Routes>
              <Route path="/task-details/:title" element={<TaskDetails />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </TasksProvider>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
