import React,{useState,useEffect} from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Card,Button,Table,Form,Spinner} from 'react-bootstrap';
import {GetOrderDetails,updateStatus} from '../actions/API';


const data = [
    {},
    {}
]

function Home() {


    const [orderDetail,setOrderDetail]=useState([]);
    const [products,setProducts]=useState([]);

    const [loading, setLoading] = useState(true);

    const [status, setstatus] = useState('');
    // console.log("status",status);

    useEffect(() => {
        GetOrderDetails().then((data)=>{
            if(data){
                setOrderDetail(data.order);
                setProducts(data.order.products);
                setLoading(false);
            }
        })
    }, [status])

    const handleUpdateStatus=(id)=>{
        console.log("handleUpdateStatus",status)
        updateStatus(id,status);
    }



    return (
        <div>
            <Container fluid>
                <section className='page'>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <p className='mb-0'>Order ID : <strong>{orderDetail.oid}</strong></p>
                    <p className='mb-0'>{orderDetail.date} </p>
                </div>
                <hr/>
                <Row>
                    <Col lg={5}>
                        <p>Shipping Address</p>
                        <p><strong>{orderDetail.address}</strong></p>
                    </Col>
                    <Col lg={1} xs={12}></Col>
                    <Col lg={3}>
                        <p>Buyer's Name</p>
                        <p><strong>{orderDetail.Buyers_name}</strong></p>
                    </Col>
                    <Col lg={3}>
                        <p>Purchsed worth</p>
                        <p><strong>₹ {orderDetail.total_price}</strong></p>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col lg={2} xs={12}>
                        <p>Items : <strong>{products.length}</strong></p>
                    </Col>
                    <Col lg={1} xs={12}></Col>
                    <Col lg={3} xs={12}>
                        <p>Purchsed worth : <strong>₹ {orderDetail.total_price}</strong></p>
                    </Col>
                    <Col lg={6} xs={12}></Col>
                </Row>
                <Table responsive className='font-weight-bold' style={{fontWeight:'bold'}}>
                        <thead>
                            <tr>
                                <th className='py-4'>Product</th>
                                <th className='py-4'>Price</th>
                                <th className='py-4'>Quantity</th>
                                <th className='py-4'>Subtotal</th>
                            </tr>
                        </thead>
                     
                            <tbody style={{ borderTop: 'none' }}>
                                {
                                    products.map((row) => (
                                        <tr style={{borderBottom:'1px solid black'}}>
                                            <td className='p-3'>
                                                <div style={{ display: 'flex',alignItems:'center' }}>
                                                    <img src={row.product_details.image_urls} 
                                                    style={{ width: '80px', height: '80px' }}></img>
                                                    <div className='mx-3' style={{width:'200px'}}>
                                                        <p className='product-feature-text'>{row.product_details.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='product-feature-text'>₹ {row.product_details.after_sale_price}</td>
                                            <td className='product-feature-text'>{row.order_details.quantity}</td>
                                            <td className='product-feature-text'>₹ {row.order_details.price}</td>
                                            <hr />
                                        </tr>
                                    ))
                                }
                            </tbody>
                    </Table>
                    <div className='my-4'>
                        <Row>
                            <Col lg={8} xs={6} className='my-4'>
                                <div>
                                  <p><strong>Status : </strong>{orderDetail.order_status}</p>
                                </div>
                                <Form.Select aria-label="Default select example"
                                onChange={(e)=>setstatus(e.target.value)}>
                                  <option value="On the way">On the way</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Canceled">Canceled</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} xs={6} className='my-4'>
                                <Button className='btn1 border-0'  onClick={()=>handleUpdateStatus(orderDetail.uid)}
                                style={{background: '#CC7549',width:'100%'}}>Update Status</Button>
                            </Col>
                        </Row>
                    </div>
                </section>
            </Container>
        </div>
    )
}
export default Home;
