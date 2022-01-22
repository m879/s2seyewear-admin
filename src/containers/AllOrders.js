import React, { useState, useEffect } from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import RightArrow from '../assets/rightarrow.png';
import { GetAllOrder } from '../actions/API';

const data = [
    {},
    {},
    {},
    {},
    {},
    {}
]

function Home() {

    const [allOrder, setAllOrder] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetAllOrder().then((data) => {
            if (data) {
                setAllOrder(data.all_order);
                setLoading(false);
            }
        })
    }, [])

    return (
        <div>
            {
                loading ?
                    <div className='div-center' style={{ height: '65vh', width: '100%' }}>
                        <Spinner animation="border" role="status" style={{ color: '#CC7549' }}></Spinner>
                    </div>
                    :
                    <Container fluid>
                        <section className='page'>
                            {
                                allOrder.map((row) => (
                                    <Card className='dashboard-card mt-4 p-4'>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <p className='mb-0'>Order ID : <strong>{row.oid}</strong></p>
                                            {/* <p className='mb-0'>8-October, 2021  | 13:53</p> */}
                                            <p className='mb-0'>{row.date}</p>
                                        </div>
                                        <hr />
                                        <Row>
                                            <Col lg={4}>
                                                <p>Buyer’s Name :<strong>{row.Buyers_name}</strong></p>
                                            </Col>
                                            <Col lg={4}>
                                                <p>Purchsed worth : <strong>₹ {row.total_price}</strong></p>
                                            </Col>
                                            <Col lg={4}>
                                                <p>Items : <strong>{row.Total_products}</strong></p>
                                            </Col>
                                        </Row>
                                        <div>
                                            <NavLink to={`/details/${row.oid}`}>
                                                <Button className='text-uppercase'
                                                    style={{ float: 'right', background: 'white', border: 'none', boxShadow: 'none', color: '#106894', fontWeight: '600' }}>
                                                    more details
                                                    <img src={RightArrow} className='mx-3'></img>
                                                </Button>
                                            </NavLink>
                                        </div>
                                    </Card>
                                ))
                            }
                        </section>
                    </Container>
            }
        </div>
    )
}
export default Home;
