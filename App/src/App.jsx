import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Editor from './pages/Editor.jsx';
import About from './pages/About.jsx';
import Pricing from './pages/Pricing.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import Contact from './pages/Contact.jsx';
import { Nbar as Navbar } from './components/Nbar.jsx';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="editor" element={<Editor />}/>
        <Route path="home" element={<Home />}/>
        <Route path="about" element={<About />}/>
        <Route path="privacy" element={<Privacy />}/>
        <Route path="pricing" element={<Pricing />}/>
        <Route path="terms" element={<Terms />}/>
        <Route path="contact" element={<Contact />}/>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
