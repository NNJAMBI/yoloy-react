import React from 'react';
import PropTypes from 'prop-types';

import '../styles/product.css'

function Product(props) {
    return (
        <React.Fragment>
           <div className="col-12 col-sm-12 col-md-4" >
               {/* We've added a div with an onClick function */}
               <div className="product" onClick = { () => props.whenProductIsClicked(props.id)} >
                   <div className="product-img">
                       <img
                       src= {props.photo}
                       className="img-fluid d-block mx-auto"
                       alt = {props.photo}/>
                   </div>
                   <div className="product-name-cost">
                       <h5 className="float-left gold">{props.name} </h5>
                       <h6 className="float-right font-weight-bold"> Ksh  {props.price}</h6>
                   </div>
                   <div >
                   </div>
               </div>
           </div>
       </React.Fragment>
    )
}

Product.propTypes ={
    name: PropTypes.string,
    size: PropTypes.string,
    Price: PropTypes.string
}

export default Product;
