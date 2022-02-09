import React,{useState,useEffect} from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import Img1 from '../assets/Item.png';
import Img2 from '../assets/upload.png';
import CloseImg from '../assets/close.png';
import EditImg from '../assets/edit.png';
import {AddBanner,GetAllBanner,DeleteBanner} from '.././actions/API';
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

    const [image, setimage] = useState(null);
    const [allBanner, setallBanner] = useState([]);
    
    useEffect(() => {
        GetAllBanner().then((res)=>{
            if(res){
                setallBanner(res.banners);
            }
        })
    }, [openAlert])


    const handleChangeImage=(e)=>{
        setimage(e.target.files[0]);
    }

    const handleSubmit=()=>{
         let form_Data=new FormData();
         form_Data.append("image",image);
         AddBanner(form_Data).then((res)=>{
            if(res){
                setOpenAlert(true);
                setErrMsg("Banner Added Successfully");
                setimage(null);
            }
        });
    }

    const handleDelete=(id)=>{
        DeleteBanner(id).then((res)=>{
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
                            style={{textDecoration:'underline',fontSize:'40px',fontWeight:'300'}}>Add a BANNER</h3>
                        </div>
                    </div>

                    <section>
                        <div style={{marginTop:'50px'}}>
                            {
                                openAlert && <AlertComponent alertStatus={openAlert} alertMsg={errMsg} status={setOpenAlert}/>
                            }
                       { allBanner.length <6 &&  
                        <div style={{ marginTop: '50px' }}>
                           <div>
                           { image && <img src={URL.createObjectURL(image)} style={{ width: '200px', height: "150px" }}></img>}
                           </div>
                            <Form.Group className="mt-3" controlId="formBasicEmail">
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Form.Label>Add a New Banner</Form.Label>
                                    <Form.Label style={{ width: '200px' }}>
                                        <div className='btn1 border-0 my-4 px-4 py-3' 
                                        style={{ background: '#CC7549', width: '200px' }}>
                                            Upload Image
                                        </div>
                                    </Form.Label>
                                </div>
                                <Form.Control onChange={(e) => handleChangeImage(e)}
                                    type="file" style={{ display: 'none', width: '200px' }} />
                            </Form.Group>
                            <Button className='btn1 border-0'  onClick={()=>handleSubmit()}
                                style={{background: '#CC7549'}}>Add Banner</Button>
                        </div>
                        }
                        </div>
                        <div style={{marginTop:'50px'}}> 
                            <h3  className='text-center dashboard-heading text-uppercase text-black'
                            style={{textDecoration:'underline'}}>REMOVE BANNER</h3>
                        </div>
                        <div>
                            <Row>
                            {
                                allBanner.map((row)=>(
                                    <Col lg={6} xs={12} className='mt-2'>
                                        <div className='p-3 d-flex justify-content-between' style={{background:'#CC7549',color:'white'}}>
                                            <img src={row.b_url} style={{width:'100%',height:'200px'}}></img>
                                            <div>
                                                <img src={CloseImg} onClick={()=>handleDelete(row.bid)}></img>
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
