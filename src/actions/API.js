import axios from 'axios';
import {baseURL } from '../config/config';
import { Token } from './auth';


export const DashboardData=()=>{
//    console.log("Dashboard = ",Token());
    const config={
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token()}`
          },
    }

    return axios.get(`${baseURL}/api/statics`,config)
    .then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const GetAllUser=()=>{
    const config={
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token()}`
          },
    }

   return axios.get(`${baseURL}/api/allusers`,config)
   .then((res)=>{
       return res.data;
   })
   .catch((err)=>{
       console.log(err);
   })
}


export const DeleteUser=(id)=>{
    const config={
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token()}`
          },
    }

   return axios.delete(`${baseURL}/api/delete_user/${id}`,config)
   .then((res)=>{
       return res.data;
   })
   .catch((err)=>{
       console.log(err);
   })
}

export const GetAllOrder=()=>{
    const config={
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token()}`
          },
    }

    return axios.get(`${baseURL}/api/allorders`,config)
    .then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        console.log(err);
    })
 }

 export const GetOrderDetails=(id)=>{
    const config={
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token()}`
          },
    }

    return axios.get(`${baseURL}/api/get_order_by_id/${id}`,config)
    .then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const updateStatus=(id,data)=>{
    const config={
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token()}`
          },
    }

    return axios.post(`${baseURL}/api/update_order_status?oid=${id}&&status=${data}`,{},config)
    .then((res)=>{
        console.log(res.data);
        return res.data;
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const GetAllProducts=()=>{
    const config={
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token()}`
          },
    }

    return axios.get(`${baseURL}/api/products`,config)
    .then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const AddProducts=(data)=>{
    const config={
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${Token()}`
          },
    }

    return axios.post(`${baseURL}/api/addProduct/`,data,config)
    .then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        console.log(err);
    })
}


export const EditProducts=(data)=>{
    const config={
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token()}`
          },
    }

    return axios.post(`${baseURL}/api/editProduct/`,data,config)
    .then((res)=>{
        return res.data.success;
    })
    .catch((err)=>{
        return false;
        console.log(err);
    })
}

export const DeleteProducts=(id)=>{
    const config={
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token()}`
          },
    }

    return axios.delete(`${baseURL}/api/deleteProduct/${id}`,config)
    .then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        console.log(err);
    })
}


export const GetAllCoupon=()=>{

    const config={
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token()}`
          },
    }

    return axios.get(`${baseURL}/api/admin/coupons`,config)
    .then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        console.log(err);
    })
}


export const AddCoupon=(data)=>{

    const config={
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token()}`
          },
    }

    return axios.post(`${baseURL}/api/admin/coupons`,data,config)
    .then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        console.log(err);
        return false;
    })
}


export const DeleteCoupon=(data)=>{
    
    const config={
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token()}`
          },
    }

    return axios.delete(`${baseURL}/api/admin/coupons?coupon_id=${data}`,config)
    .then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        console.log(err);
    })
}
