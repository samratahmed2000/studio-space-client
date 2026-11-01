import FeaturedStudios from "@/components/featured-studio/FeaturedStudios";
import AboutUs from "@/components/homepage/AboutUs";
import Hero from "@/components/homepage/Hero";
import HowItWorks from "@/components/homepage/HowItWorks";
import StudioCategories from "@/components/studio-category/StudioCategories";

const Homepage = () => {
  return (
    <main className="flex-1">
      <Hero />
      <StudioCategories />
      <FeaturedStudios />
      <HowItWorks />
      <AboutUs />
    </main>
  );
};

export default Homepage;
