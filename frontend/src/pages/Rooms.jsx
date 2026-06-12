import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import "../styles/rooms.css";

function Rooms() {

  const navigate = useNavigate();
  const { hotelId } = useParams();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {

    const fetchRooms = async () => {

      try {

        const token =
          localStorage.getItem("access");

        const response =
          await api.get(
            `rooms/${hotelId}/`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setRooms(response.data);

      } catch (error) {

        console.log(error);

        alert("Failed to load rooms");

      }

    };

    fetchRooms();

  }, [hotelId]);

  const handleBooking = (room) => {

    navigate("/booking", {
      state: {
        roomId: room.id,
        roomType: room.room_type,
        roomPrice: room.price,
      },
    });

  };

  return (

    <div className="rooms-container">

      <h1 className="rooms-title">
        Available Rooms
      </h1>

      <div className="room-grid">

        {rooms.map((room) => (

          <div
            className="room-card"
            key={room.id}
          >

            <img
              src={`http://127.0.0.1:8000${room.image}`}
              alt={room.room_type}
              className="room-image"
            />

            <div className="room-info">

              <h2>
                {room.room_type}
              </h2>

              <p className="room-price">
                ₹{room.price} / night
              </p>

              <p
                className={
                  room.is_available
                    ? "available"
                    : "booked"
                }
              >

                {room.is_available
                  ? "Available"
                  : "Already Booked"}

              </p>

              {room.is_available ? (

                <button
                  className="room-btn book-btn"
                  onClick={() =>
                    handleBooking(room)
                  }
                >
                  Book Now
                </button>

              ) : (

                <button
                  className="room-btn disabled-btn"
                  disabled
                >
                  Not Available
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Rooms;