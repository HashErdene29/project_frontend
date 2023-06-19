import Cookies from "js-cookie";
import React, { useRef } from "react"
import axios from "axios";

const AddProduct = () => {
    const name =  useRef(null);
    const price = useRef(0);
    const token = Cookies.get('user');

    const saveNewProduct = () => {
        const data = {
            name: name.current.value,
            price: price.current.value
        }

        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/products',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: data
        })
        .then(response => {
                console.log("data", response.data)
                name.current.value = "";
                price.current.value = 0;
        });

    }

    return (
        <React.Fragment>
            <form>
                <label>Title</label>
                <input type='text' label={'name'} ref={name}/>

                <label>Author</label>
                <input type='text' label={'price'} ref={price} />
            </form>
            <button onClick={saveNewProduct}>Save</button>
        </React.Fragment>
    )
}

export default AddProduct;