import { createContext, useState } from 'react';
import { AuthContext } from '~/auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, SideBar } from '~/layouts';
import { Home, Livros, Leitores } from '~/pages';

export const PageContext = createContext();

function App() {

  const [page, setPage] = useState(1);
  const [menu, setMenu] = useState(true);

  return (
    <PageContext.Provider value={[ page, setPage ]}>
      <AuthContext>
        <Router>
          <Header openMenu={ () => setMenu(!menu) }/>
          <div className='body'>
            <SideBar menuClose={ menu }/>
            <div className="main">
              <Routes>
                <Route path='/' element={ <Home/> }/>
                <Route path='/livros' element={ <Livros/> }/>
                <Route path='/leitores' element={ <Leitores/> }/>
              </Routes>
            </div>
          </div>
        </Router>
      </AuthContext>
    </PageContext.Provider>
  )
}

export default App;
