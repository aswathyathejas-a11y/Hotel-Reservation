import { useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import api from "../api";
import "../styles/booking.css";

function Booking() {

  const navigate = useNavigate();
  const location = useLocation();

  const roomId =
    location.state?.roomId;

  const roomType =
    location.state?.roomType;

  const roomPrice =
    Number(location.state?.roomPrice);

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const calculateNights = () => {

    if (!checkIn || !checkOut)
      return 0;

    const start =
      new Date(checkIn);

    const end =
      new Date(checkOut);

    const diffTime =
      end - start;

    const nights =
      diffTime /
      (1000 * 60 * 60 * 24);

    return nights > 0
      ? nights
      : 0;
  };

  const nights =
    calculateNights();

  const totalAmount =
    roomPrice * nights;

  const handleBooking =
    async () => {

      if (
        !checkIn ||
        !checkOut
      ) {

        alert(
          "Please select dates"
        );

        return;
      }

      if (
        nights <= 0
      ) {

        alert(
          "Invalid dates"
        );

        return;
      }

      try {

        const token =
          localStorage.getItem(
            "access"
          );

        const response =
          await api.post(
            "book-room/",
            {
              room: roomId,
              check_in: checkIn,
              check_out: checkOut,
              total_amount:
                totalAmount,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        alert(
          response.data.message ||
          "Booking Successful"
        );

        navigate(
          "/hotels"
        );

      } catch (error) {

        console.log(
          error.response?.data
        );

        alert(
          JSON.stringify(
            error.response?.data
          )
        );

      }
    };

  return (

    <div className="booking-container">

      <div className="booking-card">

        <h1 className="booking-title">
          Room Booking
        </h1>

        <div className="room-summary">

          <h2>
            {roomType}
          </h2>

          <p>
            Room Price :
            ₹{roomPrice}
            / night
          </p>

        </div>

        <div className="booking-row">

          <div>

            <label>
              Check In
            </label>

            <input
              type="date"
              value={checkIn}
              onChange={(e) =>
                setCheckIn(
                  e.target.value
                )
              }
            />

          </div>

          <div>

            <label>
              Check Out
            </label>

            <input
              type="date"
              value={checkOut}
              onChange={(e) =>
                setCheckOut(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        <div className="room-summary">

          <p>
            Nights :
            <strong>
              {" "}
              {nights}
            </strong>
          </p>

          <p>
            Price Per Night :
            <strong>
              ₹{roomPrice}
            </strong>
          </p>

        </div>

        <div className="total-price">

          Total Amount :
          ₹{totalAmount}

        </div>

        <button
          className="payment-btn"
          onClick={
            handleBooking
          }
        >
          Confirm Booking
        </button>

      </div>

    </div>

  );
}

export default Booking;