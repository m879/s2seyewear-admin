import React,{useState,useEffect} from 'react';
import './style.css';

import { Button, Form, Container, Row, Col, Card, } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {userlogin,logout} from '../actions/auth';
import { Redirect, Link } from 'react-router-dom';


 function Login({ auth,userlogin}) {

    const { isAuthenticated} = auth;

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const handleSubmit=()=>{
        let data={email,password};
        console.log(data);
        userlogin(data);
    }

    
    if(isAuthenticated){
        return <Redirect to='/dashboard' />;
    }

    return (
        <div className='div-center' style={{background:'#CC7549',height:'100vh'}}>
            <Container>
                <Row>
                    <Col lg={3}></Col>
                    <Col lg={6}>
                        <Card className='my-4'  style={{width: '100%',background:'#E5E5E5'}}>
                            <div className='px-4 mt-4'>
                                <h1 className="text-danger text-center">Eyewear Admin</h1>
                            </div>
                            <hr />
                            <div className='p-4'>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicemail">
                                        <Form.Label>email</Form.Label>
                                        <Form.Control type="email" placeholder="email" 
                                          name='email' value={email} 
                                          onChange={(e)=>setemail(e.target.value)}
                                          />
                                       
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" 
                                        placeholder="Password" 
                                        onChange={(e)=>setpassword(e.target.value)} value={password} name='password'
                                        />
                                    </Form.Group>
                                    <div  className="my-2">
                                        <Button className='btn1 border-0' style={{background: '#CC7549',width:'100%'}}
                                        onClick={()=>handleSubmit()}>Login</Button>
                                    </div>
                                </Form>
                            </div>
                        </Card>
                    </Col>
                    <Col lg={3}></Col>
                </Row>
            </Container>
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
export default connect(mapStateToProps, {userlogin})(Login);
  