import React from "react";
import headerBackgroundImage from "../../assets/images/AboutUsHeaderBackground.svg";
import AboutUsFeature1 from "../../assets/images/AboutUsFeature1.png";
import AboutUsFeature2 from "../../assets/images/AboutUsFeature2.png";
import AboutUsFeature3 from "../../assets/images/AboutUsFeature3.png";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import { Stack } from "@mui/material";
import Footer from "../../components/Footer/Footer";

const features = [
  {
    title: "Personalized Reading\nEnvironment",
    description:
      "Our platform allows users to customize the interface with adjustable text sizes, color themes, and brightness levels, ensuring a comfortable and distraction-free reading experience tailored to individual needs.",
    imageUrl: AboutUsFeature1,
    imagePosition: "right",
  },
  {
    title: "Enhanced Focus\nTools",
    description:
      "With features like text-to-speech, content summarization, and text highlighting, we make it easier for users to absorb and retain information, overcoming common challenges associated with ADHD.",
    imageUrl: AboutUsFeature2,
    imagePosition: "left",
  },
  {
    title: "Integrated Relaxation\nSupport",
    description:
      "The website includes break reminders and a relaxing zone with calming visuals and timers, helping users balance their reading time and maintain sustained focus without feeling overwhelmed.",
    imageUrl: AboutUsFeature3,
    imagePosition: "right",
  },
];

const AboutUs = () => {
  return (
    <Stack sx={styles.aboutUs}>
      <div
        style={{
          width: "90%",
          minHeight: "60vh",
          backgroundImage: `url(${headerBackgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          borderRadius: "20px",
          marginTop: "2%",
        }}
      >
        <div
          style={{
            paddingLeft: "10%",
            paddingRight: "10%",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ fontSize: "36px", color: "white", fontWeight: "bold" }}>
            About Us
          </h1>
          <p style={{ fontSize: "24px", color: "white" }}>
            We are dedicated to empowering individuals with ADHD by providing an
            innovative online reading platform that fosters focus,
            accessibility, and a love for learning.
          </p>
        </div>
      </div>
      <section style={styles.aboutUsFeatures}>
        <h2 style={{ color: "black" }}>Key Features of Our Website</h2>
        <div style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>
      <div style={{ width: "100vw" }}>
        <Footer />
      </div>
    </Stack>
  );
};

export default AboutUs;

const styles = {
  aboutUs: {
    overflowX: "hidden",
    overflowY: "auto",
    width: "100vw",
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
};
