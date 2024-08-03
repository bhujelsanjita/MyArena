import React from 'react'

const UserAuth = () => {
    if(localStorage.getItem("userLoginToken") != null){
        return true;
    }
    return false;

}
export default UserAuth;

