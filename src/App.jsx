import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar  from './components/TopBar';
import Dashboard   from './pages/Dashboard';
import Societes    from './pages/Societes';
import Declarations from './pages/Declarations';
import Calendrier  from './pages/Calendrier';
import Documents   from './pages/Documents';
import Parametres  from './pages/Parametres';
import Depenses    from './pages/Depenses';
import Revenus     from './pages/Revenus';
import Factures    from './pages/Factures';
import Clients     from './pages/Clients';

const PAGES = {
  dashboard:    Dashboard,
  societes:     Societes,
  declarations: Declarations,
  calendrier:   Calendrier,
  documents:    Documents,
  parametres:   Parametres,
  depenses:     Depenses,
  revenus:      Revenus,
  factures:     Factures,
  clients:      Clients,
};

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [collapsed,  setCollapsed]  = useState(false);
  const [search,     setSearch]     = useState('');

  // Reset search when changing pages
  const navigate = (page) => {
    setActivePage(page);
    setSearch('');
  };

  const PageComponent = PAGES[activePage] ?? Dashboard;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        activePage={activePage}
        setActivePage={navigate}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar
          activePage={activePage}
          search={search}
          setSearch={setSearch}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-300 mx-auto px-6 py-7">
            <PageComponent
              search={search}
              setActivePage={navigate}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
