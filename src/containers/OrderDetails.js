import React,{useState,useEffect} from 'react';
import './style.css';
import { NavLink ,useParams} from 'react-router-dom';
import { Container, Row, Col, Card,Button,Table,Form,Spinner} from 'react-bootstrap';
import {GetOrderDetails,updateStatus} from '../actions/API';

import AlertComponent from '../components/Alert';

const data = [
    {},
    {}
]

function Home() {

    
    const id = useParams();
    const oid=id.id;

    const [orderDetail,setOrderDetail]=useState([]);
    const [products,setProducts]=useState([]);

    const [openAlert, setOpenAlert] = useState(false);
    const [errMsg, setErrMsg] = useState(false);


    const [loading, setLoading] = useState(true);

    const [orderStatus, setOrderStatus] = useState('');
    console.log("order_status status",orderStatus);

    useEffect(() => {
        GetOrderDetails(oid).then((data)=>{
            if(data){
                setOrderDetail(data.order);
                setOrderStatus(data.order.order_status);
                setProducts(data.order.products);
                setLoading(false);
            }
        })
    }, []);

    const handleUpdateStatus=(id)=>{
        console.log("handleUpdateStatus",orderStatus,id)
        updateStatus(id,orderStatus).then((res)=>{
            if(res){
                setOpenAlert(true);
                setErrMsg("Status updated successfully");
            }
        });
    }

    const  capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
                    <Col lg={6} xs={12}>
                        {orderDetail.coupon_discount && <p>Coupon Applied : <strong>{orderDetail.coupon_discount.toUpperCase()}</strong></p>
                        }
                    </Col>
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
                                                    <img src={row.product_details.image_urls[0]} 
                                                    style={{ width: '80px', height: '80px' }}></img>
                                                    <div className='mx-3' style={{width:'200px'}}>
                                                        <p className='product-feature-text'>{row.product_details.name}</p>
                                                       { row.order_details.power && <p className='product-feature-text m-0'>
                                                           Power : { capitalizeFirstLetter(row.order_details.power)}
                                                        </p>}
                                                       { row.order_details.power_type && <p className='product-feature-text m-0'>
                                                           Power Type: {capitalizeFirstLetter(row.order_details.power_type)}
                                                        </p>}
                                                       {
                                                        row.order_details.prescription &&
                                                        <a href={row.order_details.prescription}  target='_blank'>
                                                           <p className='product-feature-text m-0'>Prescription</p>
                                                        </a>
                                                        }
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
                        {
                        openAlert &&
                            <AlertComponent alertStatus={openAlert} alertMsg={errMsg} status={setOpenAlert}/>
                        }
                        <Row>
                            <Col lg={8} xs={6} className='my-4'>
                                <Form.Select aria-label="Default select example"
                                onChange={(e)=>setOrderStatus(e.target.value)} value={orderStatus} name="orderStatus">
                                  <option value="on the way">On the way</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="underprocess">Underprocess</option>
                                  <option value="canceled">Canceled</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} xs={6} className='my-4'>
                                <Button className='btn1 border-0'  onClick={()=>handleUpdateStatus(orderDetail.oid)}
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
