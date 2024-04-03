import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
export default function Login(){
    const navigate=useNavigate();
    const[mobile,setmobile]=useState('');
    const[otp,setotp]=useState('');
    const[disabled,setdisabled]=useState(false)
    const Generateotp=()=>{
        if(mobile.length ===0){
            alert("Mobile has left Blank!");
        } else if(mobile.length!==10){
            alert("Invalid Mobile Number!")
        }
        else{
            // console.log('axios')
            axios.post('http://localhost:8000/login', {
                mobile:mobile,
            })
            .then(function(response){
                console.log(response);
                // alert(response.data['message'])
                if(response.data['message'] ==='Username Exists'){
                    alert("OTP GENERATED")
                    // alert(`Welcome ${response.data['name']}`)
                    setdisabled(true)
                }else if(response.data ==='User not found'){
                    alert("User not found")
                    alert("Login Failed")
                }
            })
            .catch(function(error) {
                alert(error, 'error');
            });
        }
    }
    const enterotp=()=>{
        if(otp.length===0){
            alert("OTP has left blank")
        }
        axios.post('http://localhost:8000/otp', {
                otp:otp,
            })
            .then(function(response){
                console.log(response);
                // alert(response.data['message'])
                if(response.data['message'] ==='Login Successful'){
                    alert("LOGIN SUCCESSFUL")
                    alert(`Welcome ${response.data['name']}`)
                    navigate('/profile');
                }else if(response.data['message'] !=='login failed'){
                    alert("INVALID OTP")
                    setotp("")

                }
            })
            .catch(function(error) {
                alert(error, 'error');
            });
    }
    const resendotp=()=>{
        if(mobile.length ===0){
            alert("Mobile has left Blank!");
        }
        else{
            // console.log('axios')
            axios.post('http://localhost:8000/login', {
                mobile:mobile,
            })
            .then(function(response){
                console.log(response);
                // alert(response.data['message'])
                if(response.data['message'] ==='Username Exists'){
                    alert("OTP RESEND")
                    // alert(`Welcome ${response.data['name']}`)
                }else if(response.data ==='User not found'){
                    alert("User not found")
                    alert("Login Failed")
                }
            })
            .catch(function(error) {
                alert(error, 'error');
            });
        }
    }
    return(
        <div>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card">
                                <div className="card-body p-5">
                                    <form>
                                        <div className="form-outline mb-4">
                                            <label className="form-label">MOBILE:</label>
                                            <input maxLength={10} disabled={disabled} type="number" className="form-control form-control-lg" name="mobile"
                                                   id="mobile" value={mobile}
                                                   onChange={(e) => setmobile(e.target.value)}/><br/>
                                            <input disabled={disabled}  type="button"
                                                   className="btn btn-success btn-lg" name="submit" id="submit"
                                                   value="GENERATE OTP" onClick={Generateotp}/>  <Link onClick={resendotp} className="btn btn-outline-success">RESEND OTP</Link>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label">OTP:</label>
                                            <input type="number" className="form-control form-control-lg" name="otp"
                                                   id="otp" value={otp}
                                                   onChange={(e) => setotp(e.target.value)}/>
                                        </div>
                                        <input disabled={otp.length !== 4} type="button"
                                               className="btn btn-success btn-lg" name="submit" id="submit"
                                               value="SUBMIT OTP" onClick={enterotp}/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}