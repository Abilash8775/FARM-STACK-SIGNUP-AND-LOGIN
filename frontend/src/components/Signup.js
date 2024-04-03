import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Signup(props) {
    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [mobile, setmobile] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (name.length === 0) {
            alert("name has left Blank!");
        } else if (mobile.length === 0) {
            alert("mobile has left Blank!");
        } else if (email.length === 0) {
            alert("email has left Blank!");
        } else if (password.length === 0) {
            alert("password has left Blank!");
        } else {
            console.log('axios')
            axios.post('http://localhost:8000/post', {
                name: name,
                email: email,
                mobile: mobile,
                password: password
            })
                .then(function (response) {
                    console.log(response);
                    // alert(response.data['message'])
                    if (response.data === "Username Created Successfully") {
                        alert("Username created Successful")
                        navigate("/Login")
                    } else if (response.data === "Username not created") {
                        alert("Username not created")
                    }
                })
                .catch(function (error) {
                    alert(error, 'error');
                });
        }
    }
    return (
        <div>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card">
                                <div className="card-body p-5">
                                    <form>
                                        <div className="form-outline mb-4">
                                            <label className="form-label">NAME:</label>
                                            <input type="text" className="form-control form-control-lg" name="name"
                                                   id="name" value={name} onChange={(e) => setname(e.target.value)}/>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label">MOBILE:</label>
                                            <input type="number" className="form-control form-control-lg" name="name"
                                                   id="mobile" value={mobile}
                                                   onChange={(e) => setmobile(e.target.value)}/>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label">EMAIL:</label>
                                            <input type="email" className="form-control form-control-lg" name="name"
                                                   id="email" value={email} onChange={(e) => setemail(e.target.value)}/>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label">PASSWORD:</label>
                                            <input type="password" className="form-control form-control-lg"
                                                   name="password" id="password" value={password}
                                                   onChange={(e) => setPassword(e.target.value)}/>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <input disabled={mobile.length < 10} type="button"
                                                   className="btn btn-success btn-lg" name="submit" id="submit"
                                                   value="Signup" onClick={handleSubmit}/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
export default Signup;
