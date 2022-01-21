import React, { useState, useEffect } from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Form, Spinner } from 'react-bootstrap';
import DeleteImg from '../assets/delete.png';
import { GetAllUser, DeleteUser } from '../actions/API';

const data = [
    {},
    {}
]

function Home() {

    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetAllUser().then((data) => {
            if (data) {
                console.log(data);
                setAllUsers(data.all_users);
                setLoading(false);
            }
        })
    }, []);


    const handleDeleteUser = (id) => {
        DeleteUser(id);
    }

    return (
        <div>
            <Container fluid>
                <section className='page'>
                    <div className='my-4'>
                        <h3 className='text-center dashboard-heading text-uppercase text-black'
                            style={{ textDecoration: 'underline', fontSize: '40px', fontWeight: '300' }}>All Users</h3>
                    </div>

                    {
                        loading ?
                            <div className='div-center' style={{ height: '65vh', width: '100%' }}>
                                <Spinner animation="border" role="status" style={{ color: '#CC7549' }}></Spinner>
                            </div>
                            :
                            <Table responsive className='font-weight-bold' style={{ fontWeight: 'bold' }}>
                                <thead>
                                    <tr>
                                        <th className='py-4'>S .No.</th>
                                        <th className='py-4'>Name</th>
                                        <th className='py-4'>Email</th>
                                        <th className='py-4'>Username</th>
                                        <th className='py-4'>Mobile No</th>
                                        <th className='py-4'>Action</th>
                                    </tr>
                                </thead>

                                <tbody style={{ borderTop: 'none' }}>
                                    {
                                        allUsers.map((row, index) => (
                                            <tr style={{ borderBottom: '1px solid black' }}>
                                                <td className='product-feature-text'>{index + 1}</td>
                                                <td className='product-feature-text'>{row.first_name} {row.last_name}</td>
                                                <td className='product-feature-text'>{row.email}</td>
                                                <td className='product-feature-text'>{row.username}</td>
                                                <td className='product-feature-text'>{row.telephone}</td>
                                                <td className='product-feature-text'>
                                                    <Button onClick={() => handleDeleteUser(row.uid)}
                                                        style={{ background: 'white', color: '#113B6B', fontWeight: '600', border: 'none', boxShadow: 'none' }}>
                                                        <img src={DeleteImg} ></img></Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                    }
                </section>
            </Container>
        </div>
    )
}
export default Home;
