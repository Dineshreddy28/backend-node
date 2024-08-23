import React,{useState} from 'react'
import { API_URL } from '../../Data/apiPath'

const Login = ({showfirmhandler}) => {
    const [email, setemail]=useState("")
    const [password, setpassword]=useState("")
    const loginhandle = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/vendor/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data);
                alert('Login successfully');
                localStorage.setItem('loginToken', data.token);
                showfirmhandler();
                setemail("");
                setpassword("");
                window.location.reload()
            } 
            const vendorId = data.vendorId
            console.log("VendorId:", vendorId)

            const vendorresponse= await fetch(`${API_URL}/vendor/get-vendor/${vendorId}`)
            const vendorData= await vendorresponse.json();
            if(vendorresponse.ok){
                const VendorFirmId= vendorData.VendorFirmId;
                console.log("VendorFirmId:", VendorFirmId);
                localStorage.setItem('firmId', VendorFirmId);
                window.location.reload()
            }
            
        } catch (error) {
            console.error('Error:', error);
        } 
    };

  return (
    <div className="loginsection">
        <form className='authForm' onSubmit={loginhandle}>
        <h2>Vendor Login</h2>
            <label>
                Email
            </label>
            <input type="text" name='email' value={email} onChange={(e) => setemail(e.target.value)} placeholder='Enter Email'></input><br/>
            <label>
                Password
            </label>
            <input type="password" name='password' value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Enter Password'></input>
    <div className="submitsection">
        <button type='submit'>Submit</button>
    </div><br/>
        </form>
    </div>
    
  )
}

export default Login
