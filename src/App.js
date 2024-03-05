import React from "react";
import "./App.css";
import IntroSection from "./components/intro/Intro";
import ContactSection from "./components/contact-section/ContactSection";
import DisclaimerSection from "./components/disclaimer/Disclaimer";
import FooterSection from "./components/footer/Footer";
import Map from "./components/map/Map";

function App() {
  return (
    <div className="App">
      <IntroSection />
      <ContactSection />
      <Map />
      <DisclaimerSection />
      <FooterSection />
    </div>
  );
}

export default App;
