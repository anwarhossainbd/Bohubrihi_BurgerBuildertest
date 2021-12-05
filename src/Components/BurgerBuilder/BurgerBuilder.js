import React, {Component} from 'react';
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import Summary from "./Summary/Summary";


const INGREDIENT_PRICES ={
    salad:10,
    cheese:20,
    meat:50
}




class BurgerBuilder extends Component {
    constructor() {
        super();
        this.state={
            ingredients:[
                {type:"salad",amount:0},
                {type:"cheese",amount:0},
                {type:"meat",amount:0},
            ],
            totalPrice:80,
            modalOpen: false,
            purchasable: false,
        }
    }

    toggleModal=()=>{
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }



    handleCheckout = () => {
        this.props.history.push('/checkout');
    };

    updatePurchasable = ingredients => {
        const sum = ingredients.reduce((sum, element) => {
            return sum + element.amount;
        }, 0);
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandle=(type)=>{
       const ingredients=[...this.state.ingredients];
       const newPrice=this.state.totalPrice +INGREDIENT_PRICES[type]
       for (let item of ingredients){
           if (item.type===type){
               item.amount++;
           }
       }
       this.setState({ingredients:ingredients,totalPrice:newPrice})
        this.updatePurchasable(ingredients);
    }

    removeIngredientHandle=(type)=>{
        const ingredients=[...this.state.ingredients];
        const newPrice=this.state.totalPrice -INGREDIENT_PRICES[type]
        for (let item of ingredients){
            if (item.type===type){
                if (item.amount<=0){
                    return ;
                }else {
                    item.amount--;
                }
            }
        }
        this.setState({ingredients:ingredients,totalPrice:newPrice})
        this.updatePurchasable(ingredients);
    }



    render() {
        return (
           <div>
               <div className="d-flex flex-md-row flex-column " style={{marginTop:"20px"}}>
                   <Burger  ingredients={this.state.ingredients}/>
                   <Controls
                       addIngredientHandle={this.addIngredientHandle}
                       removeIngredientHandle={this.removeIngredientHandle}
                       price={this.state.totalPrice}
                       toggleModal={this.toggleModal}
                       purchasable={this.state.purchasable}
                   />
               </div>

               <Modal isOpen={this.state.modalOpen}>
                   <ModalHeader>Your Order Summary</ModalHeader>
                   <ModalBody>
                       <h5>Total Price: {this.state.totalPrice.toFixed(0)} BDT</h5>
                       <Summary ingredients={this.state.ingredients}/>
                   </ModalBody>
                   <ModalFooter>
                       <Button color="success" onClick={this.handleCheckout}>Continue to Checkout</Button>
                       <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                   </ModalFooter>
               </Modal>

           </div>
        );
    }
}





export default BurgerBuilder;