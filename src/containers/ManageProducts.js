import React, { useState, useEffect } from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Form, Spinner, Modal } from 'react-bootstrap';
import Img1 from '../assets/Item.png';
import Img2 from '../assets/upload.png';
import DeleteImg from '../assets/delete.png';
import EditImg from '../assets/edit1.png';
import { GetAllProducts, AddProducts, EditProducts, DeleteProducts } from '../actions/API';
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

function ManageProduct() {

    const [openAlert, setOpenAlert] = useState(false);
    const [errMsg, setErrMsg] = useState(false);

    const [show, setShow] = useState(false);

    const [imageUpload, setImageUpload] = useState([]);

    const [allProducts, setallProducts] = useState([]);

    const [editProductID, setEditProductID] = useState(0);

    const [loading, setLoading] = useState(true);


    const handleGetAllProducts=()=>{
        GetAllProducts().then((data) => {
            if (data) {
                setallProducts(data.Products);
                setLoading(false);
            }
        });
    }

    useEffect(() => {
        handleGetAllProducts();
    }, [])

    const [formData, setformData] = useState({
        name:'',
        after_sale_price:'',
        actual_price:'',
        in_stock:'',
        description:'',
        Gender:'Men',
        Power:'SH-',
        cid:'2',
        top_selling:1,
        power_type:'faishon',
        filter:'solution'
    });

    const {name,after_sale_price,actual_price,in_stock,description,
        Gender,Power,cid,top_selling,power_type,filter} =formData;

     
    const onChange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
    }


    const handleAddProduct=()=>{
        console.log(formData);
        const product_data=new FormData();
        product_data.append('name',name);
        product_data.append('after_sale_price',parseInt(after_sale_price));
        product_data.append('actual_price',parseInt(actual_price));
        product_data.append('in_stock',parseInt(in_stock));
        product_data.append('description',description);
        product_data.append('Gender',Gender);
        product_data.append('cid',cid);
        product_data.append('top_selling',top_selling);
        product_data.append('power_type',power_type);
        product_data.append('filter',filter);
        if(power_type=='powered'){
            product_data.append('Power',Power);
        }else{
            product_data.append('Power','');
        }
        // product_data.append("images", imageSend);
        // product_data.append("images", imageUpload);
        for(let i=0;i<imageUpload.length;i++){
            product_data.append('images',imageUpload[i]);
        }

        AddProducts(product_data).then((res)=>{
            if(res){
                setOpenAlert(true);
                setErrMsg("Product Added Successfully");
                setformData({
                    name:'',
                    after_sale_price:'',
                    actual_price:'',
                    in_stock:'',
                    description:'',
                    Gender:'',
                    Power:'',
                    cid:'',
                    top_selling:'',
                    power_type:'',
                    filter:''
                });
                setImageUpload([]);
                handleGetAllProducts();
            }else{
                setOpenAlert(true);
                setErrMsg("Server Error. Try Again.");
            }
        });
       
    }

    const handleChangeImage = (e) => {
        // console.log(e.target.files);
        let allfiles = []
        for (let i = 0; i < e.target.files.length; i++) {
            allfiles.push(e.target.files[i]);
        }
        if (allfiles.length > 0) {
            setImageUpload(allfiles);
        }
        console.log("allfiles",  e.target.files);
    }


    const handleDelete = (id) => {
        DeleteProducts(id)
    }

    const handleOpenEdit=(data)=>{
        console.log("handleOpenEdit data",data);
        setformData({
            name:data.name,
            after_sale_price:data.after_sale_price,
            actual_price:data.actual_price,
            in_stock:data.in_stock,
            description:data.description,
            Gender:data.Gender,
            Power:data.power,
            cid:data.cid,
            top_selling:data.top_selling,
            power_type:data.power_type,
            filter:data.filter
        });
        setEditProductID(data.pid);
        setShow(true);
    }

    const handleCloseEdit=(data)=>{
        setformData({
            name:'',
            after_sale_price:'',
            actual_price:'',
            in_stock:'',
            description:'',
            Gender:'',
            Power:'',
            cid:'',
            top_selling:'',
            power_type:'',
            filter:''
        });
        setShow(false);
    }

    const handleEdit=()=>{
          const product_data={
              name:name,
              after_sale_price:parseInt(after_sale_price),
              actual_price:parseInt(actual_price),
              in_stock:parseInt(in_stock),
              description:description,
              Gender:Gender,
              Power:Power,
              cid:cid,
              top_selling:top_selling?1:0,
              filter:filter,
              power_type:power_type,
              pid:editProductID
          };

        EditProducts(product_data).then((data)=>{
             if(data){
                setShow(false);
             }
        });
    }


    const productForm = (
        <div>
            <Container>
                <Row>
                    <Col lg={6} xs={12}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Product Title</Form.Label>
                            <Form.Control type="text" name='name' value={name} 
                            onChange={(e)=>onChange(e)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Selling Price</Form.Label>
                            <Form.Control type="text" name="after_sale_price" value={after_sale_price}
                            onChange={(e)=>onChange(e)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Original Price</Form.Label>
                            <Form.Control type="text" name="actual_price" value={actual_price}
                            onChange={(e)=>onChange(e)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Stock Quantity</Form.Label>
                            <Form.Control type="text"  name="in_stock"  value={in_stock}
                            onChange={(e)=>onChange(e)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select aria-label="Default select example" 
                            name="Gender" value={Gender} onChange={(e)=>onChange(e)}>
                                <option value="">Select</option>
                                <option value="Men">Male</option>
                                <option value="Women">Female</option>
                                <option value="Kid">Kids</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col lg={6} xs={12}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Top Selling</Form.Label>
                            <Form.Select aria-label="Default select example"
                            name="top_selling" value={top_selling} onChange={(e)=>onChange(e)}> 
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example" 
                            name="cid" value={cid} onChange={(e)=>onChange(e)}>
                                <option value="">Select</option>
                                <option value="2">Eye Wear</option>
                                <option value="5">Sun Shades</option>
                                <option value="4">Contact Lenses</option>
                                <option value="3">Reading Wear</option>
                                <option value="1">Accessories</option>
                            </Form.Select>
                        </Form.Group>
                        {
                            cid==1 &&
                            // value="solution"
                            // value="accessories"
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Filter</Form.Label>
                                <Form.Select aria-label="Default select example"
                                name="filter" value={filter} onChange={(e)=>onChange(e)}>
                                    <option value="">Select</option>
                                    <option value="solution">Contact Lense Solution</option>
                                    <option value="accessories">Other Accessories</option>
                                </Form.Select>
                            </Form.Group>
                        }
                        {
                            cid==4 && 
                            <>
                             {/* value="faishon"  */}
                             {/* value="powered" */}
                             {/* value="solution" */}

                             {/* value="SH-"   */}
                             {/* value="SH+"   */}
                             {/* value="Cyl"   */}
                             {/* value="Toric" */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Power Type</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                    name="power_type" value={power_type} onChange={(e)=>onChange(e)}>
                                        <option value="">Select</option>
                                        <option value="faishon">Fashion (zero power contact lenses)</option>
                                        <option value="powered">Powered contact lenses</option>
                                        <option value="solution">Contact lens solution</option>
                                    </Form.Select>
                                </Form.Group>
                                {
                                power_type=='powered' &&
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Power</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                    name="Power" value={Power} onChange={(e)=>onChange(e)}>
                                        <option value="">Select</option>
                                        <option value="SH-">-SPH power(only sph)</option>
                                        <option value="SH+">+SPH power(only sph)</option>
                                        <option value="Cyl">Cyl power (cyl>0.75)(only cyl)</option>
                                        <option value="Toric">Toric power(sph+cyl)</option>
                                    </Form.Select>
                                </Form.Group>     
                                }
                            </>
                        }
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} 
                    name="description" value={description} onChange={(e)=>onChange(e)}/>
                </Form.Group>
            </Container>
        </div>
    )

    return (
        <div>
            <Container fluid>
                <section className='page'>
                    <div>
                        <div className='my-4'>
                            <h3 className='text-center dashboard-heading text-uppercase text-black'
                                style={{ textDecoration: 'underline', fontSize: '40px', fontWeight: '300' }}>Add an ITEM</h3>
                        </div>
                        <Row style={{ marginTop: '50px' }}>
                            {
                                imageUpload.map((row, index) => (
                                    <Col lg={3}>
                                        <img src={URL.createObjectURL(row)} style={{ width: '100%', height: "150px" }}></img>
                                    </Col>
                                ))
                            }
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <Col lg={5} xs={12}>
                                <div style={{ marginTop: '50px' }}>
                                    <Form.Group className="mt-3" controlId="formBasicEmail">
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Form.Label>Add a New Product Image</Form.Label>
                                            <Form.Label style={{ width: '200px' }}>
                                                <div className='btn1 border-0 my-4 px-4 py-3' style={{ background: '#CC7549', width: '200px' }}>
                                                    Upload Image
                                                </div>
                                            </Form.Label>
                                        </div>
                                        <Form.Control onChange={(e) => handleChangeImage(e)}
                                            type="file" style={{ display: 'none', width: '200px' }} multiple />
                                    </Form.Group>
                                    <p className='text2'>Add image with 1:1 ratio for best view  |  PNG,JPG,JPEG</p>
                                </div>
                            </Col>
                            <Col lg={1} xs={12}></Col>
                            <Col lg={6} xs={12}></Col>
                        </Row>
                    </div>

                    <section>

                        <div style={{ marginTop: '50px' }}>
                            {
                                openAlert && <AlertComponent alertStatus={openAlert} alertMsg={errMsg} status={setOpenAlert}/>
                            }
                            {productForm}
                            <div className='text-center'>
                                <Button variant="primary" onClick={()=>handleAddProduct()}
                                className='btn1 border-0 my-4' style={{ background: '#CC7549' }}>
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                        <div style={{ marginTop: '50px' }}>
                            <h3 className='text-center dashboard-heading text-uppercase text-black'
                                style={{ textDecoration: 'underline' }}>EDIT OR REMOVE an item</h3>
                        </div>
                        <div style={{ marginTop: '50px' }}>
                            <Row>
                                {
                                    allProducts.map((row) => (
                                        <Col lg={3} xs={12} className='mt-4'>
                                            <Card style={{ width: '100%', boxShadow: '0px 0px 44px -14px rgba(0, 0, 0, 0.25)' }}>
                                                <div>
                                                <Card.Img variant="top" src={row.image_urls[0]} style={{height:'150px'}}/>
                                                </div>
                                                <Card.Body>
                                                    <Card.Text className='text3'>{row.name}</Card.Text>
                                                    <Card.Title style={{ fontWeight: '600' }}>₹ {row.actual_price}</Card.Title>
                                                    <Button className='mt-4' onClick={() => handleOpenEdit(row)}
                                                        style={{ background: 'white', color: '#113B6B', fontWeight: '600', border: 'none', boxShadow: 'none' }}>
                                                        <img src={EditImg} style={{ marginRight: '10px' }}></img>EDIT ITEM</Button>
                                                    <hr />
                                                    <Button onClick={() => handleDelete(row.pid)}
                                                        style={{ background: 'white', color: '#E33636', fontWeight: '600', border: 'none', boxShadow: 'none' }}>
                                                        <img src={DeleteImg} style={{ marginRight: '10px' }}></img>DELETE ITEM</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </div>
                    </section>

                </section>
            </Container>

            <Modal show={show} size='lg' onHide={() => handleCloseEdit()} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productForm}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseEdit()}>Cancel</Button>
                    <Button variant="primary" onClick={() =>handleEdit()}>Save </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default ManageProduct;
