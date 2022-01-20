import React from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import Img1 from '../assets/Item.png';
import Img2 from '../assets/upload.png';
import CloseImg from '../assets/close.png';
import EditImg from '../assets/edit.png';

const data = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
]

function Home() {
    return (
        <div>
            <Container fluid>
                <section className='page'>
                    <div>
                        <div className='my-4'>
                            <h3 className='text-center dashboard-heading text-uppercase text-black'
                            style={{textDecoration:'underline',fontSize:'40px',fontWeight:'300'}}>Add a category</h3>
                        </div>
                        <Row style={{marginTop:'50px'}}>
                            <Col lg={5} xs={12}>
                                   <Form.Group className="my-3" controlId="formBasicEmail">
                                        <Form.Label style={{width:'100%'}}>
                                            <div className='category-file div-center p-4'>
                                                <div>
                                                   <img src={Img2}></img>
                                                   <p className='text-center my-4 dashboard-btn'>Upload Image</p>
                                                </div>
                                            </div>
                                        </Form.Label>
                                        <Form.Control type="file" style={{display:"none"}}/>
                                    </Form.Group>
                            </Col>
                            <Col lg={1} xs={12}></Col>
                            <Col lg={6} xs={12}>
                                <img src={Img1} style={{ width: '100%' }}></img>
                            </Col>
                        </Row>
                    </div>

                    <section>
                      
                        <div style={{marginTop:'50px'}}>
                        <Row>
                            <Col lg={8}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Category Name" />
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Button className='btn1 border-0' style={{background: '#CC7549',width:'100%'}}>Update Status</Button>
                            </Col>
                        </Row>
                        </div>
                        <div style={{marginTop:'50px'}}> 
                            <h3  className='text-center dashboard-heading text-uppercase text-black'
                            style={{textDecoration:'underline'}}>EDIT OR REMOVE CATEGORY</h3>
                        </div>
                        <div>
                            <Row>
                            {
                                data.map(()=>(
                                    <Col lg={3} xs={6} className='mt-2'>
                                        <img src={CloseImg} style={{position:'relative',top:'40px',left:'84%'}}></img>
                                        <div className='p-4' style={{background:'#CC7549'}}>
                                            <img src={Img1} style={{width:'100%',height:'150px'}}></img>
                                        </div>
                                        <img src={EditImg} style={{position:'relative',bottom:'40px',left:'84%'}}></img>
                                    </Col>
                                ))
                            }
                            </Row>
                        </div>
                    </section>
                   
                </section>
            </Container>
        </div>
    )
}
export default Home;
