import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PriceCalculator from '@/components/PriceCalculator';
import AutomationShowcase from '@/components/AutomationShowcase';
import Portfolio from '@/components/Portfolio';
import Pricing from '@/components/Pricing';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';

function App() {
  return (
    <div dir="rtl" className="min-h-screen bg-stride-dark text-white overflow-x-hidden" style={{ direction: 'rtl' }}>
      <Header />
      <main>
        <Hero />
        <PriceCalculator />
        <AutomationShowcase />
        <Portfolio />
        <Pricing />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
