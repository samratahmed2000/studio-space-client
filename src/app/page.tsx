import AboutUs from "@/components/homepage/AboutUs";
import Hero from "@/components/homepage/Hero";
import HowItWorks from "@/components/homepage/HowItWorks";

const Homepage = () => {
  return (
    <main className="flex-1">
      <Hero />
      <HowItWorks />
      <AboutUs />
    </main>
  );
};

export default Homepage;
