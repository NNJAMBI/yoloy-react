import React, { Component } from 'react';
import axios from 'axios';

//component imports
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import NewProductForm from './NewProductForm';
import ProductDetail from './ProductDetails';
import EditProductForm from './EditProductForm';




class ProductControl extends Component {
    constructor(props){
        super(props);
        this.state ={
            productFormVisible: false,
            actualProductList: [], 
            selectedProduct: null,
            editProduct: false
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/products')
        .then(res =>{
            console.log(res.data)
            this.setState({
                actualProductList: res.data
            })
        })
    }

    handleEditProductClick = () =>{
        this.setState({
            editProduct: true
        })
    }
    handleClick = ()=>{
        if(this.state.editProduct){
            this.setState({
                editProduct: false
            })
        }else if(this.state.selectedProduct !=null){
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
    }
    handleEditingProduct = (editedProduct) =>{

        axios.put('http://localhost:5000/products/' + this.state.selectedProduct._id, editedProduct)
            .then(res =>console.log(res.data))
        
        this.setState({
            editProduct: false,
            formVisibleOnPage: false
        })
        window.location = '/';
    }
    render() {
        let currentVisibleState = null;
        let buttonText = null
        if(this.state.editProduct){
            currentVisibleState = <EditProductForm  product ={this.state.selectedProduct} onEditProduct = {this.handleEditingProduct} />
            buttonText = "Back to Product Detail "
        }else if(this.state.selectedProduct != null){
            currentVisibleState = <ProductDetail  product ={this.state.selectedProduct} onDeleteProduct = {this.handleDeletingProduct} onEditProductClick = {this.handleEditProductClick}/> //new code
            buttonText = 'Back to Product List '
        } else if (this.state.productFormVisible){
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