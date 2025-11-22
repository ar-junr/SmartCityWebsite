import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/layout/Header'
import Navbar from './components/layout/Navbar'
import ScrollToTop from './components/layout/ScrollToTop'
import Footer from './components/layout/Footer'
import HomePage from './pages/Home/HomePage'
import CityProfile from './pages/Home/CityProfile'
import SmartCityDef from './pages/Home/SmartCityDef'
import MissionAbout from './pages/Home/MissionAbout'
import MissonChallenge from './pages/Home/MissionChallenge'
import MissonVision from './pages/Home/MissionVision'
import ProjectMilestone from './pages/Home/ProjectMilestone'
import CityHighlight from './pages/Home/ExploreCity/CityHighlight'
import CityOverview from './pages/Home/ExploreCity/CityOverview'
import CityProject from './pages/Home/ExploreCity/CityProject'
import ABDArea from './pages/Home/ExploreCity/ABDArea'
import TenderTable from './pages/Tenders/TenderTable'
import EnteKeralam from './pages/Events/EnteKeralam'
import GovernmentOrders from './pages/Downloads/GovernmentOrders'
import ProjectPage from './pages/Project/ProjectPage'
import ContactUs from './pages/Contact/ContactUs'
import RegisterComplaint from './pages/Contact/RegisterComplaint'
import Poll from './pages/Contact/Poll'
import RTI from './pages/Contact/RTI'
import Careers from './pages/Career/Careers'
import Internship from './pages/Career/Internship'
import TulipInternship from './pages/Career/TulipInternship'
import PhotoGallery from './pages/Gallery/PhotoGallery'
import VideoGallery from './pages/Gallery/VideoGallery'
import ABDProject from './pages/Project/ABDProject'
import SCTLProject from './pages/Project/SCTLProject'
import OngoingProject from './pages/Project/OngoingProject'
import CompletedProject from './pages/Project/CompletedProject'
import PancityProject from './pages/Project/PancityProject'
import MPR from './pages/Project/MPR'
import Financials from './pages/SCTL/Financials'
import CITIIS from './pages/Project/CITIIS'
import ProjectFunds from './pages/SCTL/ProjectFunds'
import Consultant from './pages/SCTL/Consultant'
import Anniversary from './pages/Events/Anniversary'
import Conclave from './pages/Events/Conclave'
import Inauguration from './pages/Events/Inauguration'
import News from './pages/Events/News'
import Terms from './components/layout/Terms'
import Privacy from './components/layout/Privacy'
import Disclaimer from './components/layout/Disclaimer'
import ScrollToTopButton from './components/layout/ScrollToTopButton'
import ConvergenceProject from './pages/Project/ConvergenceProject'
import Covid from './pages/Covid19/Covid'
import Search from './components/layout/SearchResults'
import SpecialPurposeVehicle from './pages/SCTL/SpecialPurposeVehicle'
import Documents from './pages/Downloads/Documents'
import BenefiaciaryDetails from './pages/Project/BeneficiaryDetails'
import SmartCity from './pages/SCTL/SmartCity'
import Event from './pages/Events/Event'
import GalleryPage from './pages/Gallery/GalleryPage'
import NotFound from './components/layout/NotFound'
import NewsDetail from './pages/Events/NewsDetail'
import TenderDetail from './pages/Tenders/TenderDetail'
import CareerDetail from './pages/Career/CareerDetail'
import VideoDetail from './pages/Gallery/VideoDetail'
import GovernmentOrderDetail from './pages/Downloads/GovernmentOrderDetail'
import DocumentsDetail from './pages/Downloads/DocumentDetail'
import InternshipDetail from './pages/Career/InternshipDetail'
import FooterNewsDetail from './components/footer/FooterNewsDetail'
import FooterEventDetail from './components/footer/FooterEventDetail'
import DynamicPage from './components/layout/DynamicPage'
import PageView from './components/layout/PageView'
import ChatbotFinalDemo from "./components/ChatbotFinalDemo";
const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-light">
      <Header />
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow w-full mt-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/city-profile" element={<CityProfile />} />
          <Route path="/smart-city-def" element={<SmartCityDef />} />
          <Route path="/mission-about" element={<MissionAbout />} />
          <Route path="/misson-challenge" element={<MissonChallenge />} />
          <Route path="/misson-vision" element={<MissonVision />} />
          <Route path="/abd-project" element={<ABDProject />} />
          <Route path="/convergence-project" element={<ConvergenceProject />} />
          <Route path="/sctl-project" element={<SCTLProject />} />
          <Route path="/ongoing-project" element={<OngoingProject />} />
          <Route path="/completed-project" element={<CompletedProject />} />
          <Route path="/mpr" element={<MPR />} />
          <Route path="/pancity-project" element={<PancityProject />} />
          <Route path="/citiis" element={<CITIIS />} />
          <Route path="/funds" element={<ProjectFunds />} />
          <Route path="/pmc-consultant" element={<Consultant />} />
          <Route path="/financials" element={<Financials />} />
          <Route path="/project-milestone" element={<ProjectMilestone />} />
          <Route path="/city-highlights" element={<CityHighlight />} />
          <Route path="/smart-city-overview" element={<CityOverview />} />
          <Route path="/project-area" element={<CityProject />} />
          <Route path="/abd-area" element={<ABDArea />} />
          <Route path="/photo-gallery" element={<PhotoGallery />} />
          <Route path="/video-gallery" element={<VideoGallery />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/tenders" element={<TenderTable />} />
          <Route path="/news" element={<News />} />
          <Route path="/conclave" element={<Conclave />} />
          <Route path="/anniversary" element={<Anniversary />} />
          <Route path="/inauguration" element={<Inauguration />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/register-complaint" element={<RegisterComplaint />} />
          <Route path="/poll" element={<Poll />} />
          <Route path="/rti" element={<RTI />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/internships" element={<Internship />} />
          <Route path="/tulip-internship" element={<TulipInternship />} />
          <Route path="/ente-keralam" element={<EnteKeralam />} />
          <Route path="/government-orders" element={<GovernmentOrders />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/covid" element={<Covid />} />
          <Route path="/search" element={<Search />} />
          <Route path="/spv" element={<SpecialPurposeVehicle />} />
          <Route path="/downloads" element={<Documents />} />
          <Route path="/benefiaciary-details" element={<BenefiaciaryDetails />} />
          <Route path="/sctl" element={<SmartCity />} />
          <Route path="/events" element={<Event />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/tenders/:id" element={<TenderDetail />} />
          <Route path="/careers/:id" element={<CareerDetail />} />
          <Route path="/videos/:id" element={<VideoDetail />} />
          <Route path="/government-orders/:id" element={<GovernmentOrderDetail />} />
          <Route path="/downloads/:id" element={<DocumentsDetail />} />
          <Route path="/internships/:id" element={<InternshipDetail />} />
          <Route path="/footer-news/:id" element={<FooterNewsDetail />} />
          <Route path="/footer-event/:id" element={<FooterEventDetail />} />
          <Route path="/:slug" element={<DynamicPage />} />
          <Route path="/pages/:id" element={<PageView />} />
    
        </Routes>
            {/* your existing routes/layout */}
      <ChatbotFinalDemo />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default App;