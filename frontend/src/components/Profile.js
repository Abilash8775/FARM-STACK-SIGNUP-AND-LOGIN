import React,{} from 'react';
import {Link} from "react-router-dom";
export default function Profile(props){
    return(
        <>
            <div style={{minHeight:800, marginTop:20}}>
                <h1>Profile Page</h1>
                <p>Hi this is your profile</p>
                <div>
                    {/*<button  type="button" className='btn btn-success btn-lg'>Sign Out</button>*/}
                    <Link to="/login" className="btn btn-success btn-lg">Sign Out</Link>
                </div>
            </div>

        </>
    )
}