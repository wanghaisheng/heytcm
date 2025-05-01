import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import EcosystemPage from './pages/EcosystemPage';
import ResourcesPage from './pages/ResourcesPage';
import SupportPage from './pages/SupportPage';
import HelpPage from './pages/HelpPage';
import VisionPage from './pages/VisionPage';
import RoadmapPage from './pages/RoadmapPage';
import LeaderboardPage from './pages/LeaderboardPage';
import RingC1Page from './pages/RingC1Page';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* 默认不带语言前缀的路由 */}
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
          {/* <Route path="/products" element={<ProductsPage />} /> */}
          {/* <Route path="/ecosystem" element={<EcosystemPage />} /> */}
          {/* <Route path="/resources" element={<ResourcesPage />} /> */}
          <Route path="/support" element={<SupportPage />} />
          {/* <Route path="/help" element={<HelpPage />} /> */}
          {/* <Route path="/vision" element={<VisionPage />} /> */}
          {/* <Route path="/roadmap" element={<RoadmapPage />} /> */}
          {/* <Route path="/leaderboard" element={<LeaderboardPage />} /> */}
          {/* <Route path="/ring-c1" element={<RingC1Page />} /> */}

          {/* 带语言前缀的路由，支持 /zh 和 /en */}
          {/* <Route path=":lang" element={<HomePage />} /> */}
          {/* <Route path=":lang/about" element={<AboutPage />} /> */}
          {/* <Route path=":lang/products" element={<ProductsPage />} /> */}
          {/* <Route path=":lang/ecosystem" element={<EcosystemPage />} /> */}
          {/* <Route path=":lang/resources" element={<ResourcesPage />} /> */}
          <Route path=":lang/support" element={<SupportPage />} />
          {/* <Route path=":lang/help" element={<HelpPage />} /> */}
          {/* <Route path=":lang/vision" element={<VisionPage />} /> */}
          {/* <Route path=":lang/roadmap" element={<RoadmapPage />} /> */}
          {/* <Route path=":lang/leaderboard" element={<LeaderboardPage />} /> */}
          {/* <Route path=":lang/ring-c1" element={<RingC1Page />} /> */}

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;