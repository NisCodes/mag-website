import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

function Gallery() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const images = [
    "assets/img/gallery/gallery-1.jpg",
    "assets/img/gallery/gallery-2.jpg",
    "assets/img/gallery/gallery-3.jpg",
    "assets/img/gallery/gallery-4.jpg",
    "assets/img/gallery/gallery-5.jpg",
    "assets/img/gallery/gallery-6.jpg",
    "assets/img/gallery/gallery-7.jpg",
    "assets/img/gallery/gallery-8.jpg",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <section id="gallery" className="gallery section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Gallery</h2>
        <p>Some photos from Our Endeavour</p>
      </div>

      <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-0">
          {images.map((src, index) => (
            <div className="col-lg-3 col-md-4" key={index}>
              <div className="gallery-item">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPhotoIndex(index);
                    setIsOpen(true);
                  }}
                >
                  <img src={src} alt="" className="img-fluid" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </section>
  );
}

export default Gallery;
