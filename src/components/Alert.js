import React ,{useState,useEffect}from 'react';
import { Container, Row, Col, Button,Form,InputGroup,FormControl,Alert} from 'react-bootstrap';

function AlertComponent(props) {

    
    const [openAlert, setOpenAlert] = useState(false);
    console.log("openAlert =  " ,openAlert);
    
    useEffect(()=>{
       if(props.alertStatus){
        setOpenAlert(true);
       }else{
        setOpenAlert(true);
       }
    },[props.alertStatus]);

    useEffect(() => {
        const timeId = setTimeout(() => {
          setOpenAlert(false);
          props.status(false);
        }, 4000)
        return () => {
          clearTimeout(timeId)
        }
      }, [openAlert]);

    return (
        <div>
            {
               openAlert?
                <Alert variant={'danger'}>{props.alertMsg}</Alert>
                :null
            }
        </div>
    )
}

export default AlertComponent;

