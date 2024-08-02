import { HashRouter, Routes, Route, Link } from 'react-router-dom';

import Editor from './pages/Editor.jsx';
import { Nbar as Navbar } from './components/Nbar.jsx';


function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Editor />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
