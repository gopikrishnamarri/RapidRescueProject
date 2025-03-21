import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import style from "../../Css/home.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { Typography } from "@mui/material";
import homesecondimg from "../../Images/homesecond.png";
import aboutsndimg from "../../Images/aboutscndimg.png"
export default function About() {
  return (
    <>
      <Header />
      <section className={style.about_banner}></section>
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <div>
              <img src={homesecondimg} alt="Mechanic" />
            </div>
          </Col>
          <Col md={6}>
            <Typography
              variant="h6"
              sx={{ fontSize: "24px", fontWeight: "600", textAlign: "left" }}
            >
              What is Lorem Ipsum?
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: "18px", fontWeight: "500", textAlign: "left" , lineHeight:"21px"}}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </Col>
        </Row>
        <Row className="mt-5">
        <Col md={6}>
            <Typography
              variant="h6"
              sx={{ fontSize: "24px", fontWeight: "600", textAlign: "left" }}
            >
              What is Lorem Ipsum?
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: "18px", fontWeight: "500", textAlign: "left" , lineHeight:"21px"}}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </Col>
          <Col md={6}>
            <div>
              <img src={aboutsndimg} alt="Mechanic" />
            </div>
          </Col>
          
        </Row>
      </Container>
      <Footer />
    </>
  );
}
