import React from 'react'

// simple page that is opened when a user registers successfully.  Used to send them to the login page after confirming they registered successfully.
export default function Registersucess() {
    return (
        <div>
            <p>registered sucessfully</p>
            <meta http-equiv="refresh" content="3;url=http://localhost:3000/login" />
        </div>  
    )
}
