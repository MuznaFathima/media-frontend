
import { Route, Router, Routes} from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

import Homepage from './pages/Homepage';
import Landingpage from './pages/Landingpage';
import Watchhistory from './pages/Watchhistory';





function App() {


  
  return (
    <>
      {/* here we are setting child view by placing their selectors  */}
      <Header />
      <div className="container m-5">
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path="/home" element={ <Homepage />}/>
        <Route path='/watchhistory' element={<Watchhistory/>}/>
         
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
