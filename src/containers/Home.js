import React , {useState,useEffect} from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Card,Spinner } from 'react-bootstrap';
import {DashboardData} from '../actions/API';

function Home() {

    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        DashboardData().then((data)=>{
            if(data){
                console.log(data);
                setStats(data.stats);
                setLoading(false);
            }
        })
    }, [])


    const data = [
        {total:`${stats.total_orders}`,text:'Total Number of Orders',route:'/'}, 
        {total:`₹ ${stats.total_worth_of_sale}`,text:'Total Worth of Sale',route:'/'}, 
        {total:`${stats.total_canceled_order}`,text:'Total Orders Cancelled',route:'/'}, 
        {total:`${stats.total_delivered_order}`,text:'Total Orders Delivered',route:'/'}, 
        {total:`${stats.total_products}`,text:'Total Products on Sale',route:'/'}, 
    ]

    return (
        <div>
            {
                loading?
                    <div className='div-center' style={{height:'65vh',width:'100%'}}>
                         <Spinner animation="border" role="status" style={{color:'#CC7549'}}></Spinner>
                    </div>               
                :
                    <Container fluid>
                        <section className='page'>
                            <Row>
                                {
                                    data.map((row,index) => (
                                        <Col lg={4} xs={12} className='my-4'>
                                            <Card className='dashboard-card text-center'>
                                                <h3 className='heading1 m-0'>{row.total}</h3>
                                                <h6 className='my-2 text1'>{row.text}</h6>
                                                {/* <NavLink to={`${row.route}`} style={{textDecoration:'none'}}>
                                                    <p className='dashboard-btn mt-2'>VIEW MORE</p>
                                                </NavLink> */}
                                            </Card>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </section>
                    </Container>
            }
        </div>
    )
}
export default Home;
