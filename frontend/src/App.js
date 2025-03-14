import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./Pages/About";
import Service from "./Pages/Service";
import Mechanic from "./Pages/Mechanic";
import FeedBack from "./Pages/Feedback";
import Payment from "./Pages/Payment";
import Chats from "./Pages/Chats";
import Profile from "./Pages/Profile";
import ServiceList from "./Pages/Service/servicelist";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/servicelist" element={<ServiceList />} />
          <Route path="/mechanic" element={<Mechanic />} />
          <Route path="/feedback/:mechanicId" element={<FeedBack />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/chatsupport" element={<Chats />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
