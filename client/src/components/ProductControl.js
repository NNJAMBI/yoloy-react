import React, { Component } from 'react';
import axios from 'axios';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import NewProductForm from './NewProductForm';
import ProductDetail from './ProductDetails';

import tshirt from '../images/products/tshirt.png';
import backpack from '../images/products/backpack.png';
import pants from '../images/products/pants.png';
import trekkingshoes from '../images/products/trekkingshoes.png';
import giacket from '../images/products/giacket.png';
import tshirt_ladies from '../images/products/tshirt_ladies.png';
import Default_image from '../images/product_image.jpeg/product_image.jpeg';

// ActualProductList
const actualProductList = [
    
   
    {
        name: 'T-Shirt',
        price: '599',
        photo: tshirt,
        id: "1"
    },
    {
        name: 'BackPack', 
        price: '1500',
        photo: backpack,
        id: "2"
    },
    {
        name: 'Pants', 
        price: '1000',
        photo: pants,
        id: '3'
    },
    {
        name: 'Trekking Shoes',
        price: '2000',
        photo: trekkingshoes,
        id: '4'
    },
    {
        name: 'Jacket',
        price: '1500',
        photo: giacket,
        id: '5'
    },
    {
        name:'T-Shirt Ladies',
        price: '650',
        photo: tshirt_ladies,
        id: '6'
    }
]



class ProductControl extends Component {
    constructor(props){
        super(props);
        this.state ={
            productFormVisible: false,
            actualProductList: actualProductList,
            selectedProduct: null
        }
    }

    handleClick = ()=>{
        if(this.state.selectedProduct !=null){
            this.setState({
                productFormVisible: false,
                selectedProduct: null
            })
        }else{
 
            this.setState((prevState)=>({
                productFormVisible: !prevState.productFormVisible
            }))
        }
    }

    // Method to handle adding a new product
   handleAddingNewProduct = (newProduct) =>{

    axios.post('http://localhost:5000/products', newProduct)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    this.setState({
        productFormVisible: false
    })
};
    // Method to handle click event on a product
    handleChangingSelectedProduct = (id) => {
        const selectedProduct = this.state.actualProductList.filter(product => product.id === id)[0];
        this.setState({selectedProduct: selectedProduct});
    };
    render() {
        let currentVisibleState = null;
        let buttonText = null
        if(this.state.selectedProduct != null){
            currentVisibleState = <ProductDetail  product ={this.state.selectedProduct} /> //new code
            buttonText = 'Back to Product List '
        } else if(this.state.productFormVisible){
            currentVisibleState = <NewProductForm  onNewProductCreation= {this.handleAddingNewProduct}/>
            buttonText = 'Go back to Product List'
        }else{
            currentVisibleState = <ProductList productList = {this.state.actualProductList} onProductSelection = {this.handleChangingSelectedProduct} /> // Because a user will actually be clicking on the Product in the Product component, we will need to pass our new handleChangingSelectedProduct method as a prop.
            buttonText = 'Add A Product'
        }

        return (
            <React.Fragment>
                
                <AddProduct 
                whenButtonClicked = {this.handleClick}
                buttonText = {buttonText} />
                
                {currentVisibleState}
            </React.Fragment>
        )
    }
}

export default ProductControl;