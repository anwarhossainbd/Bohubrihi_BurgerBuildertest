import React, {Component} from 'react';
import {Formik} from "formik";
import {Alert, Button} from "reactstrap";
import {auth} from "../../Redux/AuthActionCreators";
import {connect} from "react-redux";
import Spinner from "../Spinner/Spinner";


const mapDispatchToProps=dispatch=>{

    return{
        auth:(email,password,mode)=>dispatch(auth(email,password,mode))
    }
}
const mapStateToProps=state=>{
    return{
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg
    }
}

class Auth extends Component {

    constructor() {
        super();
        this.state={
            mode:"Sign Up"
        }
    }

    switchModeHandler=()=>{
        this.setState(
            {
                mode:this.state.mode ==="Sign Up"?"Login":"Sign Up"
            }
        )
    }


    render() {
        let err=null;
        if (this.props.authFailedMsg !==null){
            err=

                 <Alert color="danger">{this.props.authFailedMsg}</Alert>
        }



        let form =null;

        if (this.props.authLoading){
            form=<Spinner />
        }else {
            form=(

                <Formik initialValues={
                    {
                        email:"",
                        password:"",
                        passwordConfirm:"",
                    }
                }
                        onSubmit={
                            values => {
                                this.props.auth(values.email,values.password,this.state.mode)
                            }
                        }

                        validate={(values =>{

                            const errors = {};

                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Invalid email address';
                            }

                            if (!values.password) {
                                errors.password = 'Required';
                            } else if (values.password.length < 6) {
                                errors.password = 'Must be atleast 6 characters!';
                            }

                            if (this.state.mode==="Sign Up"){
                                if (!values.passwordConfirm) {
                                    errors.passwordConfirm = 'Required';
                                } else if (values.password !== values.passwordConfirm) {
                                    errors.passwordConfirm = 'Password field does no match!';
                                }
                            }


                            //console.log("Errors:", errors)
                            return errors;

                        } )}

                >
                    {({values,handleChange,handleSubmit,errors})=>(<div className="col-6 offset-3" style={{
                        border: "1px grey solid",
                        padding: "15px",
                        borderRadius: "7px",
                    }} >
                        <button className="btn btn-lg" onClick={this.switchModeHandler} style={{width:"100%",backgroundColor:"#D70F64"}}>Switch to {this.state.mode==="Sign Up"?"Login":"Sign Up"}</button> <br/> <br/>
                        <form onSubmit={handleSubmit}>
                            <input name="email" placeholder="Enter Your Email" className="form-control" value={values.email} onChange={handleChange} />
                            <span style={{ color: "red" }}>{errors.email}</span>
                            <br/>
                            <input name="password" placeholder="Enter Your Password" className="form-control" value={values.password} onChange={handleChange} />
                            <span style={{ color: "red" }}>{errors.password}</span>
                            <br/>
                            {this.state.mode==="Sign Up"?
                                <div>
                                    <input name="passwordConfirm" placeholder="Enter Your Confirm password " className="form-control" value={values.passwordConfirm} onChange={handleChange} />
                                    <span style={{ color: "red" }}>{errors.passwordConfirm}</span>
                                    <br/>
                                </div>:null
                            }

                            <Button type="submit" className="btn-success">{this.state.mode==="Sign Up"?"Sign Up":"Login"}</Button>

                        </form>
                    </div>)
                    }

                </Formik>

            )
        }


        return (
            <div className="mt-5">
              <div className="col-6 offset-3">
                  {err}
              </div>
                {form}
            </div>
        );
    }
}

export default  connect(mapStateToProps,mapDispatchToProps) (Auth);