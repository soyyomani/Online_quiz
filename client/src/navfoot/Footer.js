import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const images = [
    "/images/pf0.jpg",
    "/images/pf1.jpg",  
    "/images/pf2.jpg",
    "/images/pf3.jpg",
    "/images/pf4.jpg"
  ];
  
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 1000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <footer className="footer">
      <div className="footer-images">
        <img src={images[currentImage]} alt="Transitioning" className="transition-image" />
      </div>
      <div className="footer-details">
        <h1 className="footer-title">Online Quiz Maker</h1>
        <div className="social_media">
          <div className="heading">Manikanta</div>
          <div className="heading">Contact Developer</div>
          <div className="div">Email: kumarmanikanta808@gmail.com</div>
          <div className="div">Phone: +91 8660089848</div>
          <div className="div">
            <address>National Institute Of Technology Delhi</address>
          </div>
          <div className="wrapper">
            <a href="https://www.facebook.com/profile.php?id=100071880831182&mibextid=LQQJ4d" className="icon facebook" target="_blank" rel="noopener noreferrer">
              <div className="tooltip">
                <span className="fab fa-facebook-f"></span>
                <span className="tooltiptext">Facebook</span>
              </div>
            </a>
            <a href="https://twitter.com/manikanta1922?s=11&t=VUKOrecp24SIw5wzyEGi1g" className="icon twitter" target="_blank" rel="noopener noreferrer">
              <div className="tooltip">
                <span className="fab fa-twitter"></span>
                <span className="tooltiptext">Twitter</span>
              </div>
            </a>
            <a href="https://instagram.com/soy_yo_manikanta?igshid=MzRlODBiNWFlZA==" className="icon instagram" target="_blank" rel="noopener noreferrer">
              <div className="tooltip">
                <span className="fab fa-instagram"></span>
                <span className="tooltiptext">Instagram</span>
              </div>
            </a>
            <a href="https://github.com/soyyomani" className="icon github" target="_blank" rel="noopener noreferrer">
              <div className="tooltip">
                <span className="fab fa-github"></span>
                <span className="tooltiptext">GitHub</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/manikanta-662b3322b/" className="icon linkedin" target="_blank" rel="noopener noreferrer">
              <div className="tooltip">
                <span className="fab fa-linkedin"></span>
                <span className="tooltiptext">LinkedIn</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
