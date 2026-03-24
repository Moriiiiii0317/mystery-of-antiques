import React from 'react';
import { HashRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { Characters, CharacterDetail } from './pages/Characters';
import { Antiques, AntiqueDetail } from './pages/Antiques';
import { TrajectoryMap } from './pages/TrajectoryMap';
import { RelationshipNetwork } from './pages/RelationshipNetwork';

const CharacterDetailWrapper = () => {
  const { id } = useParams();
  return <CharacterDetail id={id} />;
};

const AntiqueDetailWrapper = () => {
  const { id } = useParams();
  return <AntiqueDetail id={id} />;
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetailWrapper />} />
          <Route path="/antiques" element={<Antiques />} />
          <Route path="/antiques/:id" element={<AntiqueDetailWrapper />} />
          <Route path="/map" element={<TrajectoryMap />} />
          <Route path="/relation" element={<RelationshipNetwork />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
