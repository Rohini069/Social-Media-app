import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth, SignUp } from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="App">
                <div className="blur" style={{ top: "-18%", right: "0" }}></div>
                <div
                  className="blur"
                  style={{ top: "36%", left: "-8rem" }}
                ></div>
                <Auth />
              </div>
            }
          />
          <Route
            path="profile"
            element={
              <div className="App">
                <div className="blur" style={{ top: "-18%", right: "0" }}></div>
                <div
                  className="blur"
                  style={{ top: "36%", left: "-8rem" }}
                ></div>
                <Profile />
              </div>
            }
          />
          <Route
            path="home"
            element={
              <div className="App">
                <div className="blur" style={{ top: "-18%", right: "0" }}></div>
                <div
                  className="blur"
                  style={{ top: "36%", left: "-8rem" }}
                ></div>
                <Home />
              </div>
            }
          />
          <Route
            path="signup"
            element={
              <div className="App">
                <div className="blur" style={{ top: "-18%", right: "0" }}></div>
                <div
                  className="blur"
                  style={{ top: "36%", left: "-8rem" }}
                ></div>
                <SignUp />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
