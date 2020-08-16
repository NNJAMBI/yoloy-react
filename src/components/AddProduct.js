import React from 'react';
import '../styles/addProduct.css';

function AddProduct(props) { //add props as a parameter
    return (
        <React.Fragment>
            <div className="section-2">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-12 col-md-6"></div>
                        <div className="col-sm-12 col-12 col-md-6">
                            <div className="float-md-right">
                                {/* {addProductButton} */}
                                <button  className="see-all-products text-center mx-auto" onClick={props.whenButtonClicked} >{props.buttonText}</button>  
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddProduct;