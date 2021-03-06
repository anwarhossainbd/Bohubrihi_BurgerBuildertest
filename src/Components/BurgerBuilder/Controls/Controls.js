import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button } from 'reactstrap';
import "../../../App.css"

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const BuildControl = props => {
    return (
        <div className="d-flex content">
            <div className="mr-auto ml-5" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{props.label}</div>
            <div>
                <button className="btn btn-danger btn-sm m-1" onClick={props.removed}>Less</button>
                <button className="btn btn-success btn-sm m-1" onClick={props.added}>More</button>
            </div>

        </div>
    )
}


const Controls = props => {
    return (
        <div className="container ml-md-5" style={{ textAlign: "center" }}>
            <Card style={{
                marginTop: "30px",
                marginBottom: "30px",
                textAlign: "center"
            }}>
                <CardHeader style={{
                    backgroundColor: "#D70F64",
                    color: "white"
                }}><h4>Add Ingredients</h4></CardHeader>
                <CardBody>
                    {
                        controls.map(item => {
                            return <BuildControl
                                label={item.label}
                                type={item.type}
                                key={Math.random()}
                                added={()=>props.addIngredientHandle(item.type)}
                                removed={()=>props.removeIngredientHandle(item.type)}
                            />
                        })
                    }
                </CardBody>
                <CardFooter><h5>Price: <b>{props.price}</b>  BDT</h5></CardFooter>
                <Button disabled={!props.purchasable} style={{ backgroundColor:"#D70F64"}} onClick={props.toggleModal}>Order Now</Button>
            </Card>
        </div>
    )
}

export default Controls;