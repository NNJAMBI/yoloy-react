import React, { Component } from 'react';
import axios from 'axios';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import NewProductForm from './NewProductForm';
import ProductDetail from './ProductDetails';


class ProductControl extends Component {
    constructor(props){
        super(props);
        this.state ={
            productFormVisible: false,
            actualProductList: [],
            selectedProduct: null
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/products')
        .then(res =>{
            console.log(res)
            this.setState({
                actualProductList: res.data
            })
        })
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
handleDeletingProduct = (id) =>{
    axios.delete('http://localhost:5000/products/'+id)
        .then(res => console.log(res.data))
        .catch((error) =>{
            console.log(error)
        })
        this.setState({
            actualProductList: this.state.actualProductList.filter(product => product._id !== id),
            formVisibleOnPage: false,
            selectedProduct: null
        })
}
    // Method to handle click event on a product
    handleChangingSelectedProduct = (id) => {
        const selectedProduct = this.state.actualProductList.filter(product => product.id === id)[0];
        this.setState({selectedProduct: selectedProduct});
    };
    render() {
        let currentVisibleState = null;
        let buttonText = null
        if (this.state.selectedProduct != null) {
            currentVisibleState = <ProductDetail product = {this.state.selectedProduct} onDeleteProduct = {this.handleDeletingProduct}
         />
            buttonText = "Back to product list";
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