import React from 'react'
import './loading.css'

function Loading() {
    return (
        <div className=" vh-100 d-flex justify-content-center align-items-center ">
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>

    )
}

export default Loading