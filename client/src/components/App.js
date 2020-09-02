import React from 'react';
import '../styles/App.css';
import Header from './Header';
import AboutUs from './AboutUs';
import Footer from './Footer';
import ProductControl from './ProductControl';

function App() {
 return (
   <React.Fragment>
     <div className="container-fluid">
       <Header />
       <ProductControl />
       <AboutUs />
       <Footer />

     </div>
   </React.Fragment>   
 )
}

export default App;