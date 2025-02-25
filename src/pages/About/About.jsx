import NavBar from "../../components/NavigationBar";
import PATH from "../../constants/path";
import React from "react";
import headerBackgroundImage from "../../assets/AboutUsHeaderBackground.svg";
import AboutUsFeature1 from "../../assets/AboutUsFeature1.png";
import AboutUsFeature2 from "../../assets/AboutUsFeature2.png";
import AboutUsFeature3 from "../../assets/AboutUsFeature3.png";
import FeatureCard from "../../components/FeatureCard";
import { Stack } from "@mui/material";

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
    <div style={styles.aboutUs}>
      <NavBar currentPage={PATH.about} />
      <div>
        <div style={styles.aboutUsHeader}>
          <img
            src={headerBackgroundImage}
            alt="header background"
            style={styles.headerBackgroundImage}
          />
          <div style={styles.aboutUsHeaderOverlay}>
            <h1 style={styles.aboutUsHeaderTitle}>About Us</h1>
            <p style={styles.aboutUsHeaderDescription}>
              We are a team of passionate developers dedicated to creating an
              inclusive reading platform that empowers individuals with ADHD to
              reach their full potential.
            </p>
          </div>
        </div>

        <div style={styles.features}>
          <h1>adadada</h1>
          <img src={AboutUsFeature1}></img>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

const styles = {
  aboutUs: {
    overflowX: "hidden",
    overflowY: "auto",
  },
};
