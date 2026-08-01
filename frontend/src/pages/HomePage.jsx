import HeroSection from '../components/HeroSection';
import CardsSection from '../components/CardsSection';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F6EEDF]">
      <main className="flex-grow">
        <HeroSection />
        <CardsSection />
      </main>
    </div>
  );
};

export default HomePage;
