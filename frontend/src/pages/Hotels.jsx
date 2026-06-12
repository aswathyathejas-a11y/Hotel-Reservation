import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/hotels.css";

function Hotels() {

  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchHotels = async () => {

      try {

        const token =
          localStorage.getItem("access");

        const response =
          await api.get(
            "hotels/",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setHotels(response.data);

      } catch (error) {

        console.log(
          error.response?.data
        );

        alert(
          "Failed to load hotels"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchHotels();

  }, []);

  const handleViewRooms = (
    hotelId
  ) => {

    navigate(
      `/rooms/${hotelId}`
    );

  };

  if (loading) {

    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontSize: "24px",
        }}
      >
        Loading Hotels...
      </div>
    );

  }

  return (

    <div className="hotels-container">

      <h1 className="hotels-title">
        Luxury Hotel Collection
      </h1>

      <div className="hotel-grid">

        {hotels.map((hotel) => (

          <div
            className="hotel-card"
            key={hotel.id}
          >

            <img
              src={`http://127.0.0.1:8000${hotel.image}`}
              alt={hotel.hotel_name}
              className="hotel-image"
            />

            <div className="hotel-info">

              <div className="hotel-header">

                <h2>
                  {hotel.hotel_name}
                </h2>

                <span className="rating-badge">
                  ⭐ {hotel.rating}
                </span>

              </div>

              <p className="hotel-location">
                📍 {hotel.location}
              </p>

              <p className="hotel-description">
                {hotel.description}
              </p>

              <button
                className="hotel-btn"
                onClick={() =>
                  handleViewRooms(
                    hotel.id
                  )
                }
              >
                View Rooms
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Hotels;