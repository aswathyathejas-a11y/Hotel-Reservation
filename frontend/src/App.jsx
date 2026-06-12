import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/hotels"
          element={<Hotels />}
        />

        <Route
          path="/rooms/:hotelId"
          element={<Rooms />}
        />

        <Route
          path="/rooms"
          element={<Rooms />}
        />

        <Route
          path="/booking"
          element={<Booking />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;