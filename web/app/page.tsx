import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Courses from '@/components/Courses';
import WhyUs from '@/components/WhyUs';
import Results from '@/components/Results';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <About />
      <Courses />
      <WhyUs />
      <Results />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
