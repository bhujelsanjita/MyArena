import React from 'react'

const venueownerauth = () => {
    if(localStorage.getItem("venueOwnerLoginToken") != null){
        return true;
    }
    return false;
}

export default venueownerauth
