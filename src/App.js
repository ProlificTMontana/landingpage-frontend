import Header from "./components/Header";
import MarqueeSection from "./components/MarqueeSection";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import CustomTech from "./components/CustomTech";
import FAQs from "./components/FAQs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Explore from "./components/Explore";
import HeroSec from "./components/HeroSec";
import WhyChooseUs from "./components/whyChooseUs/WhyChooseUs";
import CaseStudiesBoard from "./components/caseStudies/CaseStudiesBoard";

function App() {

  return (
    <>
      <Header />

      <HeroSec />
      <MarqueeSection />
      <Services />
      <Explore />
      <WhyChooseUs />
      <AboutUs />
      <CustomTech />
      <CaseStudiesBoard />
      <FAQs />
      <ContactUs />

      <Footer />

    </>
  );
}

export default App;
