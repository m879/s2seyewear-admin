import React, { Fragment,useState,useEffect } from 'react'
import { connect } from 'react-redux';
import SideNav from '../components/SideNav';
import { Container, Col, Row } from 'react-bootstrap';
import NavBar from '../components/Navigation';


function Layout({auth,children }) {

    const { isAuthenticated} = auth;
    console.log("layout isAuthenticated",isAuthenticated);

    // const [auth, setauth] = useState(false);

    return (
        <Fragment >
            <Container className='p-0 m-0' fluid>
                {
                    isAuthenticated?
                    <Row className='p-0 m-0'>
                        <Col lg={2} xs={12} className='p-0 m-0'>
                            <SideNav />
                        </Col>
                        <Col lg={10} xs={12} className='p-0 m-0'>
                            <NavBar />
                            {children}
                        </Col>
                    </Row>
                    :
                    children
                }
            </Container>
        </Fragment>
    );
}

// export default Layout;

const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
export default connect(mapStateToProps, {})(Layout);
  