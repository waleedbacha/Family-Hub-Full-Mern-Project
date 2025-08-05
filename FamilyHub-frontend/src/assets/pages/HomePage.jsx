// LandingPage.js
import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Link as ScrollLink,
  Element,
  animateScroll as scroll,
} from "react-scroll";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "../App.css";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [animatedNumbers, setAnimatedNumbers] = useState({
    families: 0,
    donations: 0,
    scholarships: 0,
  });
  const statsRef = useRef(null);

  const handleProtectedRoute = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      toast.error("You must be Logged in to continue");
      navigate("/login");
    }
  };

  // Animate numbers when stats section comes into view
  useEffect(() => {
    const animateValue = (start, end, duration, callback) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        callback(start + progress * (end - start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateValue(0, 1237, 2000, (val) =>
            setAnimatedNumbers((prev) => ({
              ...prev,
              families: Math.floor(val),
            }))
          );
          animateValue(0, 89425, 2000, (val) =>
            setAnimatedNumbers((prev) => ({
              ...prev,
              donations: Math.floor(val),
            }))
          );
          animateValue(0, 428, 2000, (val) =>
            setAnimatedNumbers((prev) => ({
              ...prev,
              scholarships: Math.floor(val),
            }))
          );
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <div
      className="landing-page"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Updated Navbar */}
      {/* <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{
          backgroundColor: "#274c77",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div className="container">
          <a
            className="navbar-brand fw-bold fs-3"
            style={{ fontFamily: "Playfair Display, serif", color: "#fff" }}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scroll.scrollToTop();
            }}
          >
            FamilyHub
          </a>

          <button className="navbar-toggler" type="button" onClick={toggleNav}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav ms-auto">
              {[
                "Home",
                "About",
                "Mission",
                "What We Do",
                "Marketplace",
                "Donation",
                "Scholarship",
                "Contact",
              ].map((item) => (
                <li className="nav-item" key={item}>
                  <ScrollLink
                    to={item.toLowerCase().replace(" ", "")}
                    smooth={true}
                    duration={800}
                    offset={-70}
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsNavOpen(false)}
                  >
                    {item}
                  </ScrollLink>
                </li>
              ))}
              <li className="nav-item">
                <a href="/login" className="btn btn-outline-light btn-sm mx-2">
                  Login
                </a>
                <a href="/register" className="btn btn-warning btn-sm">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <Element name="home">
        <header
          className="hero-section d-flex align-items-center text-white text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1505455184862-554165e5f6ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGVscGluZyUyMGhhbmR8ZW58MHx8MHx8fDA%3D')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            padding: "8rem 1rem 4rem",
          }}
        >
          <div className="content" style={{ zIndex: 2, width: "100%" }}>
            <h1
              className="display-3 fw-bold mb-3 animate-slide-up"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Legacy of Love, Generations of Hope
            </h1>
            <p
              className="lead mb-5 animate-fade-in"
              style={{ maxWidth: "700px", margin: "0 auto" }}
            >
              Empowering families through education, support, and shared legacy.
              Join us in building a brighter future together.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <ScrollLink
                to="donation"
                smooth={true}
                duration={1000}
                offset={-70}
                className="btn btn-success btn-lg px-5 animate-pop"
                style={{ cursor: "pointer" }}
              >
                Donate
              </ScrollLink>
              <ScrollLink
                to="scholarship"
                smooth={true}
                duration={1000}
                offset={-70}
                className="btn btn-outline-light btn-lg px-5 animate-pop"
                style={{ cursor: "pointer" }}
              >
                Apply for Scholarship
              </ScrollLink>
            </div>
          </div>
        </header>
      </Element>

      {/* About Section */}
      <Element name="about">
        <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0 animate-slide-left">
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Family Together"
                  className="img-fluid rounded shadow"
                />
              </div>
              <div className="col-lg-6 animate-slide-right">
                <h2
                  className="fw-bold mb-4"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: "#274c77",
                  }}
                >
                  About FamilyHub
                </h2>
                <p className="fs-5">
                  We are a community-driven platform dedicated to preserving
                  family legacies and uplifting future generations through
                  education, financial support, and shared stories.
                </p>
                <p>
                  From scholarships to family history archives, we help families
                  thrive across generations with dignity, opportunity, and love.
                </p>
                <div className="d-flex gap-3 mt-4">
                  <i
                    className="bi bi-people-fill"
                    style={{ fontSize: "2rem", color: "#274c77" }}
                  ></i>
                  <div>
                    <h5>Community First</h5>
                    <p>Building stronger families through shared purpose</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* Mission Section */}
      <Element name="mission">
        <section className="py-5" style={{ backgroundColor: "#e0e7ef" }}>
          <div className="container text-center">
            <h2
              className="fw-bold mb-5"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#274c77",
              }}
            >
              Our Mission
            </h2>
            <div className="row g-4">
              {[
                {
                  icon: "bi-lightbulb",
                  title: "Empower Education",
                  desc: "Providing scholarships to students from underprivileged families.",
                  color: "#f5c33aff",
                },
                {
                  icon: "bi-heart",
                  title: "Uplift Families",
                  desc: "Supporting family legacies through financial aid and emotional support.",
                  color: "#4b709bff",
                },
                {
                  icon: "bi-journal-richtext",
                  title: "Preserve Legacy",
                  desc: "Documenting family stories and history for future generations.",
                  color: "#7d941eff",
                },
              ].map((item, i) => (
                <div className="col-md-4" key={i}>
                  <div
                    className="p-4 h-100 animate-fade-in"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <i
                      className={`bi ${item.icon}`}
                      style={{ fontSize: "3rem", color: item.color }}
                    ></i>
                    <h4 style={{ color: item.color }}>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Element>

      {/* What We Do */}
      <Element name="whatwedo">
        <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="container">
            <h2
              className="text-center fw-bold mb-5"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#274c77",
              }}
            >
              What We Do
            </h2>
            <div className="row g-4">
              <div className="col-md-4 text-center animate-slide-up">
                <div className="p-4 bg-white rounded shadow h-100">
                  <i className="bi bi-coin fs-1 text-success mb-3"></i>
                  <h5>Donation Hub</h5>
                  <p>
                    Secure donations that directly support scholarships and
                    family welfare.
                  </p>
                </div>
              </div>
              <div
                className="col-md-4 text-center animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="p-4 bg-white rounded shadow h-100">
                  <i className="bi bi-award fs-1 text-warning mb-3"></i>
                  <h5>Scholarship Program</h5>
                  <p>
                    Merit- and need-based scholarships for students across
                    disciplines.
                  </p>
                </div>
              </div>
              <div
                className="col-md-4 text-center animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="p-4 bg-white rounded shadow h-100">
                  <i className="bi bi-book-half fs-1 text-primary mb-3"></i>
                  <h5>Legacy Archive</h5>
                  <p>
                    Preserve your family’s history, photos, and stories forever.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* Marketplace Section */}
      <Element name="marketplace">
        <section className="py-5" style={{ backgroundColor: "#e0e7ef" }}>
          <div className="container text-center">
            <h2
              className="fw-bold mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#274c77",
              }}
            >
              Family Marketplace
            </h2>
            <p className="lead mb-5">
              Discover gently used items for your family — clothes, shoes,
              cosmetics, and household essentials.
            </p>

            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              breakpoints={{
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 4 },
              }}
              className="product-swiper mb-4"
            >
              {[
                {
                  img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                  title: "Shoes",
                  price: "$15",
                  category: "Footwear",
                },
                {
                  img: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhYnklMjBjbG90aGVzfGVufDB8fDB8fHww",
                  title: "Baby Clothes",
                  price: "$12",
                  category: "Apparel",
                },
                {
                  img: "https://plus.unsplash.com/premium_photo-1679046947934-d9c13d67fae8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2tpbmNhcmV8ZW58MHx8MHx8fDA%3D",
                  title: "Skincare Set",
                  price: "$25",
                  category: "Cosmetics",
                },
                {
                  img: "https://plus.unsplash.com/premium_photo-1680382578857-c331ead9ed51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D",
                  title: "Kitchen Tools",
                  price: "$30",
                  category: "Household",
                },
                {
                  img: "https://images.unsplash.com/photo-1706765779494-2705542ebe74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ludGVyJTIwY29hdHN8ZW58MHx8MHx8fDA%3D",
                  title: "Winter Coats",
                  price: "$40",
                  category: "Apparel",
                },
                {
                  img: "https://images.unsplash.com/photo-1574621100236-d25b64cfd647?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpciUyMGNhcmV8ZW58MHx8MHx8fDA%3D",
                  title: "Hair Care",
                  price: "$18",
                  category: "Cosmetics",
                },
              ].map((product, i) => (
                <SwiperSlide key={i}>
                  <div className="text-center">
                    <div className="position-relative">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="img-fluid rounded mb-2"
                        style={{
                          height: "300px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                      <span className="badge bg-primary position-absolute top-0 end-0 m-2">
                        {product.category}
                      </span>
                    </div>
                    <h5>{product.title}</h5>
                    <p className="text-success fw-bold">{product.price}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <a
              href="/products"
              className="btn btn-lg btn-dark px-5 animate-pop"
            >
              View Marketplace
            </a>
          </div>
        </section>
      </Element>

      {/* Image Carousel */}
      <Element name="carousel">
        <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="container">
            <h2
              className="text-center fw-bold mb-5"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#274c77",
              }}
            >
              Success Stories
            </h2>

            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              breakpoints={{
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 3 },
              }}
              className="mySwiper mb-4"
            >
              {[
                {
                  img: "https://images.unsplash.com/photo-1604336480714-ed7fa506014e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2Nob2xhcnNoaXB8ZW58MHx8MHx8fDA%3D",
                  title: "Sarah's Journey",
                  desc: "First in her family to attend university with our support. Now pursuing a degree in Computer Science.",
                  name: "Sarah M.",
                  category: "Education",
                },
                {
                  img: "https://media.istockphoto.com/id/2167617586/photo/university-student-studying-with-laptop-in-bright-hallway.webp?a=1&b=1&s=612x612&w=0&k=20&c=H1xVfh-fu64ozlM-A2-X8c0KINu6DN20mLZ8ovMCvGw=",
                  title: "David's Dream",
                  desc: "Overcame financial hardship to study engineering. Now building a better future for his family.",
                  name: "David L.",
                  category: "Engineering",
                },
                {
                  img: "https://media.istockphoto.com/id/2162644435/photo/walking-happy-and-girl-with-friends-at-university-for-learning-bonding-and-talking-with-fun.webp?a=1&b=1&s=612x612&w=0&k=20&c=VZoYUAK9OGQEcbcdEedhWbYZVPbp96WWD-Hmfd6XHGc=",
                  title: "The Smith Family",
                  desc: "Preserved three generations of legacy through our archive. A story of resilience and love.",
                  name: "Smith Family",
                  category: "Legacy",
                },
                {
                  img: "https://media.istockphoto.com/id/1988207742/photo/woman-university-student-and-books-in-portrait-outdoor-and-pride-for-learning-knowledge-or.jpg?s=612x612&w=0&k=20&c=WLj6SN8A0D92VFA8R1MY94Pn3L5x0euvqwoSPeDySkY=",
                  title: "Maria's Return",
                  desc: "A mother of two returned to school at 42. Now a certified nurse and community leader.",
                  name: "Maria T.",
                  category: "Career Change",
                },
                {
                  img: "https://plus.unsplash.com/premium_photo-1682284079685-657fb4f33de5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNjaG9sYXJzaGlwfGVufDB8fDB8fHww",
                  title: "James & His Scholarship",
                  desc: "Used his award to launch a small business. Now employs five others in his community.",
                  name: "James R.",
                  category: "Entrepreneurship",
                },
              ].map((slide, i) => (
                <SwiperSlide key={i}>
                  <div
                    className="d-flex justify-content-center"
                    style={{ padding: "0 10px" }}
                  >
                    <div
                      className="card shadow-sm h-100"
                      style={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        width: "100%",
                        maxWidth: "300px",
                        transition: "transform 0.3s, box-shadow 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.03)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      {/* Image */}
                      <div style={{ height: "180px", overflow: "hidden" }}>
                        <img
                          src={slide.img}
                          alt={slide.title}
                          className="img-fluid"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div
                        className="card-body d-flex flex-column"
                        style={{ gap: "8px" }}
                      >
                        <span
                          className="badge bg-primary bg-gradient"
                          style={{
                            width: "fit-content",
                            fontSize: "0.75rem",
                            padding: "0.5em 0.8em",
                          }}
                        >
                          {slide.category}
                        </span>
                        <h5
                          className="card-title mb-1"
                          style={{ fontSize: "1.1rem", color: "#274c77" }}
                        >
                          {slide.title}
                        </h5>
                        <p
                          className="card-text text-muted mb-1"
                          style={{ fontSize: "0.9rem", lineHeight: "1.4" }}
                        >
                          {slide.desc}
                        </p>
                        <small
                          className="text-muted mt-auto"
                          style={{ fontStyle: "italic" }}
                        >
                          — {slide.name}
                        </small>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* View All Stories Button */}
            <div className="text-center mt-4">
              <a
                href="/stories"
                className="btn btn-lg px-5"
                style={{
                  backgroundColor: "#274c77",
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "30px",
                  boxShadow: "0 6px 12px rgba(39, 76, 119, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#1e3a5f";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#274c77";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                View Our Success
              </a>
            </div>
          </div>
        </section>
      </Element>

      {/* Stats Section */}
      <Element name="stats">
        <section
          className="py-5 text-white"
          style={{ backgroundColor: "#274c77" }}
          ref={statsRef}
        >
          <div className="container text-center">
            <h2
              className="fw-bold mb-5"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Our Impact
            </h2>
            <div className="row g-4">
              <div
                className="col-md-4 animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="p-4">
                  <i className="bi bi-people fs-1 mb-3"></i>
                  <h3>{animatedNumbers.families.toLocaleString()}</h3>
                  <p className="lead">Families Supported</p>
                </div>
              </div>
              <div
                className="col-md-4 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="p-4">
                  <i className="bi bi-coin fs-1 mb-3"></i>
                  <h3>${animatedNumbers.donations.toLocaleString()}</h3>
                  <p className="lead">Donations Received</p>
                </div>
              </div>
              <div
                className="col-md-4 animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="p-4">
                  <i className="bi bi-award fs-1 mb-3"></i>
                  <h3>{animatedNumbers.scholarships}</h3>
                  <p className="lead">Scholarships Awarded</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* Donation Section */}
      <Element name="donation">
        <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="container text-center">
            <h2
              className="fw-bold mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#274c77",
              }}
            >
              Support a Dream
            </h2>
            <p
              className="lead mb-5"
              style={{ maxWidth: "700px", margin: "0 auto" }}
            >
              Your donation helps students pursue education and families
              preserve their legacy.
            </p>
            <div className="row justify-content-center">
              <div className="col-md-7">
                <img
                  src="https://media.istockphoto.com/id/1406888053/photo/a-group-of-cheerful-people-at-graduation-holding-diplomas-or-certificates-up-together-and.jpg?s=612x612&w=0&k=20&c=8LRkx77cpb1clqj2tHqOY--uO8Mj6DB8Qd1Y3RdDRyQ="
                  alt="Donate"
                  className="img-fluid rounded mb-4 shadow"
                />
                <a
                  href="#"
                  className="btn btn-lg btn-success px-5 animate-pop"
                  onClick={() => handleProtectedRoute("/form1")}
                  style={{ cursor: "pointer" }}
                >
                  Donate Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* Scholarship Section */}
      <Element name="scholarship">
        <section className="py-5" style={{ backgroundColor: "#e0e7ef" }}>
          <div className="container text-center">
            <h2
              className="fw-bold mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#274c77",
              }}
            >
              Apply for Scholarship
            </h2>
            <p className="lead mb-5">
              We believe every dream deserves a chance. Apply today and take the
              first step toward your future.
            </p>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Scholarship"
                  className="img-fluid rounded mb-4 shadow"
                />
                <a
                  href="#"
                  className="btn btn-lg btn-warning px-5 animate-pop"
                  onClick={() => handleProtectedRoute("/form2")}
                  style={{ cursor: "pointer" }}
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* Family History Section */}
      <Element name="familyhistory">
        <section
          className="py-5"
          style={{
            backgroundColor: "#f9f5f0",
            backgroundImage: `url('https://images.unsplash.com/photo-1601050690597-e091df8792c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="container"
            style={{
              backgroundColor: "rgba(255, 254, 250, 0.92)",
              borderRadius: "16px",
              padding: "40px 20px",
            }}
          >
            <div className="text-center mb-5">
              <h2
                className="fw-bold"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#5d4037",
                  fontSize: "2.5rem",
                }}
              >
                Family History & Legacy
              </h2>
              <p
                className="lead text-muted"
                style={{ maxWidth: "700px", margin: "0 auto" }}
              >
                Honor your roots. Preserve your family’s story for generations
                to come.
              </p>
            </div>

            {/* Vintage Family Tree Visualization */}
            <div className="text-center mb-4">
              <div
                className="d-inline-block position-relative"
                style={{
                  width: "90%",
                  maxWidth: "800px",
                  border: "8px solid #8d6e63",
                  borderRadius: "12px",
                  padding: "20px",
                  backgroundColor: "#fffaf4",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                }}
              >
                {/* Top: Grandparents */}
                <div className="mb-3" style={{ position: "relative" }}>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "10px 18px",
                      backgroundColor: "#5d4037",
                      color: "white",
                      borderRadius: "8px",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    }}
                  >
                    🏡 Grandparents
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "30px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "2px",
                      height: "30px",
                      backgroundColor: "#5d4037",
                    }}
                  ></div>
                </div>

                {/* Middle: Parents */}
                <div
                  className="d-flex justify-content-center gap-4 mb-3"
                  style={{ position: "relative" }}
                >
                  <div
                    style={{
                      padding: "10px 15px",
                      backgroundColor: "#8d6e63",
                      color: "white",
                      borderRadius: "8px",
                      minWidth: "120px",
                      fontSize: "1rem",
                      textAlign: "center",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    👨‍👩‍👧 Father & Mother
                  </div>
                  <div
                    style={{
                      padding: "10px 15px",
                      backgroundColor: "#a1887f",
                      color: "white",
                      borderRadius: "8px",
                      minWidth: "120px",
                      fontSize: "1rem",
                      textAlign: "center",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    👨‍🦱 Uncle
                  </div>
                  <div
                    style={{
                      padding: "10px 15px",
                      backgroundColor: "#bcaaa4",
                      color: "white",
                      borderRadius: "8px",
                      minWidth: "120px",
                      fontSize: "1rem",
                      textAlign: "center",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    👩‍🦳 Aunt
                  </div>
                </div>

                {/* Vertical Line */}
                <div
                  style={{
                    width: "2px",
                    height: "30px",
                    backgroundColor: "#5d4037",
                    margin: "0 auto",
                  }}
                ></div>

                {/* Bottom: Children */}
                <div
                  className="d-flex justify-content-center gap-3 mt-3"
                  style={{ flexWrap: "wrap" }}
                >
                  {[
                    { name: "You", emoji: "👦", color: "#4e342e" },
                    { name: "Sister", emoji: "👧", color: "#3e2723" },
                    { name: "Brother", emoji: "🧒", color: "#4e342e" },
                    { name: "Cousin", emoji: "👧‍🦱", color: "#6d4c41" },
                  ].map((person, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "10px 12px",
                        backgroundColor: person.color,
                        color: "white",
                        borderRadius: "8px",
                        fontSize: "0.95rem",
                        textAlign: "center",
                        minWidth: "90px",
                        boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
                      }}
                    >
                      {person.emoji} <br />
                      <small>{person.name}</small>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Divider */}
              <div
                style={{
                  margin: "30px auto",
                  width: "80%",
                  borderTop: "2px solid #8d6e63",
                  opacity: 0.6,
                }}
              ></div>

              {/* Old-World Quote */}
              <blockquote
                className="text-center mx-auto"
                style={{
                  maxWidth: "600px",
                  fontStyle: "italic",
                  color: "#5d4037",
                  fontSize: "1.1rem",
                  borderLeft: "4px solid #8d6e63",
                  paddingLeft: "20px",
                }}
              >
                "A family's history is its greatest treasure, not kept in
                vaults, but in hearts."
              </blockquote>
            </div>

            {/* View History Button */}
            <div className="text-center mt-4">
              <a
                href="/family-history"
                className="btn btn-lg px-5"
                style={{
                  backgroundColor: "#5d4037",
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "30px",
                  boxShadow: "0 6px 12px rgba(93, 64, 55, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 16px rgba(93, 64, 55, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 6px 12px rgba(93, 64, 55, 0.3)";
                }}
              >
                View Family History
              </a>
            </div>
          </div>
        </section>
      </Element>

      {/* Contact Section */}
      <Element name="contact">
        <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="container text-center">
            <h2
              className="fw-bold mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#274c77",
              }}
            >
              Get in Touch
            </h2>
            <p className="mb-5">Have questions? We’d love to hear from you.</p>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <form>
                  <div className="mb-3 text-start">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3 text-start">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="mb-3 text-start">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows="4"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* Footer */}
      <footer
        className="text-white text-center py-4"
        style={{ backgroundColor: "#274c77" }}
      >
        <div className="container">
          <h5>FamilyHub</h5>
          <p>Preserving Legacy. Empowering Futures.</p>
          <div className="d-flex justify-content-center gap-3 mb-3">
            <a href="#" className="text-white">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-white">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="text-white">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
          <small>&copy; 2025 FamilyHub. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
