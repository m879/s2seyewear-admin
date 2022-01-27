import React,{useState,useEffect} from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import Img1 from '../assets/Item.png';
import Img2 from '../assets/upload.png';
import CloseImg from '../assets/close.png';
import EditImg from '../assets/edit.png';
import {GetAllCoupon,AddCoupon,DeleteCoupon} from '.././actions/API';
import AlertComponent from '../components/Alert';


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

    const [openAlert, setOpenAlert] = useState(false);
    const [errMsg, setErrMsg] = useState(false);

    
    const [coupon_id, setCoupon_id] = useState('');
    const [percentage, setPercentage] = useState(0);


    const [allCoupon, setallCoupon] = useState([]);

    useEffect(() => {
        GetAllCoupon().then((res)=>{
            console.log("COUPON = ",res);
            if(res){
                setallCoupon(res.Coupons);
            }
        })
    }, [openAlert])

    const handleSubmit=()=>{
        AddCoupon({coupon_id,percentage}).then((res)=>{
            if(res){
                setOpenAlert(true);
                setErrMsg("Coupon Added Successfully");
                setCoupon_id('');
                setPercentage('');
            }
        });
    }

    const handleDelete=(data)=>{
        DeleteCoupon(data).then((res)=>{
            if(res){
                setOpenAlert(true);
                setErrMsg("Coupon Deleted Successfully");
            }
        });
    }

    return (
        <div>
            <Container fluid>
                <section className='page'>
                    <div>
                        <div className='my-4'>
                            <h3 className='text-center dashboard-heading text-uppercase text-black'
                            style={{textDecoration:'underline',fontSize:'40px',fontWeight:'300'}}>Add a Coupon</h3>
                        </div>
                    </div>

                    <section>
                        <div style={{marginTop:'50px'}}>
                            {
                                openAlert && <AlertComponent alertStatus={openAlert} alertMsg={errMsg} status={setOpenAlert}/>
                            }
                        <Row>
                            <Col lg={4} xs={12}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Coupon Name" 
                                    onChange={(e)=>setCoupon_id(e.target.value)} value={coupon_id}/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} xs={12}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Discount" 
                                     onChange={(e)=>setPercentage(e.target.value)} value={percentage}/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} xs={12}>
                                <Button className='btn1 border-0'  onClick={()=>handleSubmit()}
                                style={{background: '#CC7549',width:'100%'}}>Add Coupon</Button>
                            </Col>
                        </Row>
                        </div>
                        <div style={{marginTop:'50px'}}> 
                            <h3  className='text-center dashboard-heading text-uppercase text-black'
                            style={{textDecoration:'underline'}}>REMOVE COUPON</h3>
                        </div>
                        <div>
                            <Row>
                            {
                                allCoupon.map((row)=>(
                                    <Col lg={3} xs={6} className='mt-2'>
                                        <div className='p-3 d-flex justify-content-between' style={{background:'#CC7549',color:'white'}}>
                                            <div>
                                                <p className='m-0'>{row.coupon_id}</p>
                                                <p className='m-0'>{row.percentage}</p>                                            
                                            </div>
                                            <div>
                                                <img src={CloseImg} onClick={()=>handleDelete(row.coupon_id)}></img>
                                            </div>
                                        </div>
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
