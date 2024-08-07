import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Editor from './pages/Editor.jsx';
import About from './pages/About.jsx';
import Pricing from './pages/Pricing.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import Contact from './pages/Contact.jsx';
import { Nbar as Navbar } from './components/Nbar.jsx';

import { useEffect, useState } from 'react';
import axios from 'axios';

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

  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.fruits);
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      
      
      <h1>Test</h1>
      <div>
        <p>hello world</p>
        {
          array.map((fruit, index) => (
            <div key={index}>
              <p>{fruit}</p>
              <br></br>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
