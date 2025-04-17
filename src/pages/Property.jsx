import { useEffect, useState } from "react";
// import {s1} from "../assets/Images/s1.jpg"
// import {s2} from "../assets/Images/s2.jpg"
// import {s3} from "../assets/Images/s3.jpg"
// import {s4} from "../assets/Images/s4.jpg"
// import {s5} from "../assets/Images/s5.jpg"
// import {s6} from "../assets/Images/s6.jpg"
// import {s7} from "../assets/Images/s7.jpg"
// import {s8} from "../assets/Images/s8.jpg"

import React from "react";
import "../cssFiles/PropertyPage.css"; // Import your CSS file for styling
const Property = () => {
  // Mock data for the property
  const propertyData = {
    title: "Luxury Villa with Ocean View",
    price: "$2,500,000",
    location: "Malibu, California",
    description:
      "This stunning contemporary villa offers breathtaking ocean views from nearly every room. The property features 5 bedrooms, 6.5 bathrooms, and approximately 7,500 square feet of living space. The open floor plan includes a gourmet kitchen with top-of-the-line appliances, a spacious great room with floor-to-ceiling windows, and a luxurious master suite with a private balcony. Outdoor amenities include an infinity pool, spa, outdoor kitchen, and landscaped gardens. Located in a prestigious neighborhood with 24/7 security.",
    features: [
      "5 Bedrooms",
      "6.5 Bathrooms",
      "7,500 Sq Ft",
      "Infinity Pool",
      "Smart Home System",
      "Private Beach Access",
    ],
    images: [
      // s1,s2,s3,s4,s5,s6,s7,s8,s9
      "https://cdn.pixabay.com/photo/2025/04/07/21/29/nature-9520131_1280.jpg",
      "https://cdn.pixabay.com/photo/2024/08/11/19/24/sunset-8962131_1280.jpg",
      "https://cdn.pixabay.com/photo/2023/11/06/11/23/cottage-8369444_1280.jpg",
      "https://cdn.pixabay.com/photo/2024/01/17/02/56/house-8513467_1280.jpg",
      "https://cdn.pixabay.com/photo/2023/04/04/19/48/houses-7900142_1280.jpg",
      "https://cdn.pixabay.com/photo/2013/11/13/21/14/san-francisco-210230_1280.jpg",
      "https://cdn.pixabay.com/photo/2023/06/11/13/14/boathouse-8055954_1280.jpg",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    video: "https://www.youtube.com/embed/9xwazD5SyVg",
    walkthrough: "https://my.matterport.com/show/?m=5A7ZyW6G3oD",
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [tourError, setTourError] = useState(false);

  // Auto slide functionality
  useEffect(() => {
    // console.log("useEffect called with currentSlide:");

    let slideInterval;
    if (isAutoPlaying) {
      slideInterval = setInterval(() => {
        setCurrentSlide((prev) =>
          prev === propertyData.images.length - 1 ? 0 : prev + 1
        );
      }, 3000); // Change slide every 3 seconds
    }
    return () => clearInterval(slideInterval);
  }, [isAutoPlaying, propertyData.images.length]);

  const goToSlide = (index) => {
    console.log("gotoSlide called with index:", index);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto play after manual interaction
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToPrevSlide = () => {
    console.log("gotoPrevSlide called");
    setCurrentSlide((prev) =>
      prev === 0 ? propertyData.images.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNextSlide = () => {
    console.log("gotoNextSlide called");
    setCurrentSlide((prev) =>
      prev === propertyData.images.length - 1 ? 0 : prev + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div className="property-page">
      <section className="property-detail-image-section">
        <div className="property-card">
          <div className="card-header">
            <div className="agency-info">
              <h1>AASHRAY REALTY CONSULTANCY</h1>
              <p className="tagline">From Your Dream to Your Home</p>
            </div>
            <div className="property-code">
              <p>
                Property Code: <span>ANGGKSSF001</span>
              </p>
              <p>
                Ad Date: <span>09/04/2025</span>
              </p>
            </div>
          </div>
          <h2 className="property-name">Arsh Royale</h2>
          <div className="property-details-galary-box">
            <div className="property-details">
              <div className="detail-row">
                <div className="detail-column">
                  <p>
                    <strong>Property Type:</strong> Flat
                  </p>
                  <p>
                    <strong>Flat Area:</strong> 1600 sq. ft.
                  </p>
                  <p>
                    <strong>Condition:</strong> New Launch
                  </p>
                </div>
                <div className="detail-column">
                  <p>
                    <strong>Floor:</strong> 1 to 7
                  </p>
                  <p>
                    <strong>Facing:</strong> East, West
                  </p>
                </div>
              </div>

              <div className="address-section">
                <p>
                  <strong>Address:</strong>
                </p>
                <p>188, Near Gokulpeth Market, Gokulpeth, Nagpur</p>
              </div>

              <div className="amenities-section">
                <p>
                  <strong>Amenities:</strong>
                </p>
                <div className="amenities-grid">
                  <span>Power Backup</span>
                  <span>Lift</span>
                  <span>Parking</span>
                  <span>Security</span>
                  <span>Water Supply</span>
                  <span>Garden</span>
                </div>
              </div>
            </div>
            <div className="property-images">
              {/* <h2>Property Gallery</h2> */}
              <div className="image-slider-container">
                <div
                  className="image-slider-track"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {propertyData.images.map((image, index) => (
                    <div key={index} className="slide">
                      <img src={image} alt={`Property view ${index + 1}`} />
                    </div>
                  ))}
                </div>

                {propertyData.images.length > 1 && (
                  <>
                    <button className="slider-btn prev" onClick={goToPrevSlide}>
                      &#10094;
                    </button>
                    <button className="slider-btn next" onClick={goToNextSlide}>
                      &#10095;
                    </button>

                    <div className="slider-dots">
                      {propertyData.images.map((_, index) => (
                        <button
                          key={index}
                          className={`dot ${
                            index === currentSlide ? "active" : ""
                          }`}
                          onClick={() => goToSlide(index)}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="price-section">
              <p className="price-label">Price:</p>
              <p className="price-value">1.5 Cr</p>
            </div>
            <div className="contact-section">
              <p className="contact-label">Contact:</p>
              <p className="contact-name">GYAAT</p>
              <p className="contact-tagline">Let's find solutions</p>
              <button className="contact-button">Enquire Now</button>
            </div>
          </div>
        </div>
      </section>

      <section className="property-video-walkthrough">
        {/* Section 3: Property Video */}
        <div className="property-video">
          <h2>Video Tour</h2>
          <div className="video-container">
            <iframe
              width="560"
              height="315"
              src={propertyData.video}
              title="Property video tour"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Section 4: 3D Walkthrough */}
        <div className="property-walkthrough">
          <h2>3D Virtual Tour</h2>
          <div className="walkthrough-container">
            <iframe
              src="https://videos.ctfassets.net/icnj41gkyohw/6sb0vVHFI4dO3KytmWDWqg/cdf4c5620537dbe0f34c975cae6f2750/homepage-ai-3.mp4"
              title="3D Virtual Walkthrough"
              allow="xr-spatial-tracking"
              allowFullScreen
            ></iframe>
          </div>
        </div>
         {/* <div className="property-walkthrough">
      <h2>3D Virtual Tour</h2>
      <div className="walkthrough-container">
        {tourError ? (
          <div className="tour-error">
            <div className="error-content">
              <p>Oops, we couldn't load the 3D tour.</p>
              <p>Please try again later or contact us for assistance.</p>
              <div className="matterport-fallback">
                <img 
                  src="https://matterport.com/wp-content/themes/matterport/assets/images/logo.svg" 
                  alt="Matterport logo" 
                  className="matterport-logo"
                />
                <p>Matterport 3D Tour Not Available</p>
              </div>
              <button 
                className="retry-button"
                onClick={() => setTourError(false)}
              >
                Retry Loading Tour
              </button>
            </div>
          </div>
        ) : (
          <iframe 
            src={propertyData.walkthrough}
            title="3D Virtual Walkthrough"
            allow="xr-spatial-tracking; fullscreen"
            allowFullScreen
            onError={handleTourError}
            loading="lazy"
          />
        )}
      </div>
    </div> */}
      </section>
    </div>
  );
};

export default Property;
