import React, { useState, useEffect } from 'react';
import { Navbar, Button, Container, Nav} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

function Navigation({ auth, logout }) {

    const { isAuthenticated, user, token, authCategory } = auth;

    const handleLogout = () => {
        logout();
    }

    const todayDate=new Date();


   
    return (
        <div>
            <Button className='mt-4 mx-4' onClick={()=>handleLogout()}>Logout</Button>
            <Navbar   expand="lg" >
                    <div className='dashboard-heading text-center' style={{width:'100%'}}>
                        <h3 className='mt-4'>ADMIN PANEL</h3>
                        <h6 className='my-3'>8 JANUARY | SATURDAY</h6>
                        <p>{todayDate.getHours()}:{todayDate.getMinutes()}</p>
                    </div>
            </Navbar>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navigation);
