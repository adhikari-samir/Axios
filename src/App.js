import "./App.css";
import { useEffect, useState } from "react";
import To_do from "./component/todo/to_do";
import Login from "./component/login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!user);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn ? (
          <To_do onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLoginSuccess} />
        )}
      </header>
    </div>
  );
}

export default App;
