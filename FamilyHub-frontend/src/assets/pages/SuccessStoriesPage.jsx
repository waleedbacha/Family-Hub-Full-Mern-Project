// SuccessStoriesPage.js

import "../../assets/App.css";
// import Navv from "./Navv";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Input,
  InputGroup,
  InputGroupText,
  Badge,
} from "reactstrap";
import { BiSearch, BiBookHeart, BiStar } from "react-icons/bi";

const SuccessStoriesPage = () => {
  const stories = [
    {
      id: 1,
      title: "Sarah's Journey to College",
      description:
        "Sarah, the first in her family to attend university, overcame financial hardship with our support. Now pursuing a degree in Computer Science.",
      scholarshipRewarded: "$2,500",
      image:
        "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "David Builds His Future",
      description:
        "David used his scholarship to study engineering. Today, he’s building a better future for his family and community.",
      scholarshipRewarded: "$3,000",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Maria Returns to School at 42",
      description:
        "A mother of two, Maria returned to school to become a nurse. Her determination inspires everyone around her.",
      scholarshipRewarded: "$2,200",
      image:
        "https://plus.unsplash.com/premium_photo-1682284548131-58cb47f6ab2b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Nob2xhcnNoaXB8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 4,
      title: "James Launches a Business",
      description:
        "James used his scholarship to start a small tech business. He now employs five others in his hometown.",
      scholarshipRewarded: "$1,800",
      image:
        "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      title: "The Smith Family Legacy",
      description:
        "Three generations of the Smith family have benefited from our programs. Education runs deep in their bloodline.",
      scholarshipRewarded: "$4,000",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      title: "Lena's Dream of Medicine",
      description:
        "Lena dreams of becoming a doctor. With our help, she’s one step closer to healing her community.",
      scholarshipRewarded: "$3,500",
      image:
        "https://plus.unsplash.com/premium_photo-1682284079664-c90a1603733b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNjaG9sYXJzaGlwfGVufDB8fDB8fHww",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="success-stories-page py-5"
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* <Navv /> */}
      {/* Header */}
      <Container className="text-center mb-5 mt-2">
        <BiBookHeart size={60} color="#274c77" className="mb-3" />
        <h1
          className="fw-bold"
          style={{
            color: "#274c77",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Success Stories
        </h1>
        <p className="lead text-muted">
          Read inspiring journeys of famliy members who turned dreams into
          reality.
        </p>

        {/* Search Bar */}
        <div className="mt-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <InputGroup size="lg">
            <InputGroupText
              style={{
                backgroundColor: "#274c77",
                color: "white",
                borderTopLeftRadius: "12px",
                borderBottomLeftRadius: "12px",
              }}
            >
              <BiSearch />
            </InputGroupText>
            <Input
              type="text"
              placeholder="Search stories by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                borderRadius: "0 12px 12px 0",
                borderColor: "#d0e1e9",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            />
          </InputGroup>
        </div>
      </Container>

      {/* Stories Grid */}
      <Container>
        {filteredStories.length === 0 ? (
          <div className="text-center py-5">
            <BiStar size={50} color="#adb5bd" className="mb-3" />
            <h5 className="text-muted">No stories match your search.</h5>
            <p className="text-secondary">Try a different keyword.</p>
          </div>
        ) : (
          <Row xs="1" md="2" lg="3" className="g-4">
            {filteredStories.map((story) => (
              <Col key={story.id}>
                <Card
                  className="h-100 shadow-sm border-0 story-card"
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
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
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img
                      src={story.image}
                      alt={story.title}
                      className="img-fluid w-100"
                      style={{
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <CardBody
                    className="d-flex flex-column"
                    style={{ gap: "8px" }}
                  >
                    <CardTitle
                      tag="h5"
                      style={{
                        color: "#274c77",
                        fontSize: "1.2rem",
                        fontWeight: "600",
                      }}
                    >
                      {story.title}
                    </CardTitle>
                    <CardText
                      className="text-muted"
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.5",
                        flex: 1,
                      }}
                    >
                      {story.description}
                    </CardText>
                    <div>
                      <Badge
                        color="warning"
                        style={{
                          fontSize: "0.9rem",
                          padding: "0.5em 0.8em",
                          fontWeight: "600",
                        }}
                      >
                        🎓 {story.scholarshipRewarded}
                      </Badge>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default SuccessStoriesPage;

// # Core React & Router
// npm install react-router-dom

// # Styling & UI
// npm install bootstrap
// npm install reactstrap react react-dom

// # Icons
// npm install react-icons

// # Carousel / Slider
// npm install swiper

// # Smooth Scroll (for landing page navigation)
// npm install react-scroll

// # Optional: Axios (if not already installed)
// npm install axios

// in index html
// <!-- Google Fonts -->
// <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">

// <!-- Bootstrap Icons -->
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css"></link>
