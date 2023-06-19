import React, { useEffect, useContext, useState, createContext } from "react";
import './Product.css';
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from 'react-redux';

const ProductCountContext = createContext(null);

const Product = (props) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [data, setData] = useState(null);
    const token = Cookies.get('user');
    const [productShow, setProductShow] = useState({});
    const [showOnlySelected, setShowOnlySelected] = useState(false);
    const [productCount, setProductcount] = useState(0);
    useEffect(() => {
        let mount = true;
        axios.get('http://localhost:8080/api/v1/products', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if(mount) {
                setData(response.data);
                console.log("data", response.data.length)
                setProductcount(response.data.length);
                localStorage.setItem("count", JSON.stringify(response.data.length));
            }
        });
        return () => {
            mount = false;
        };
    }, []);

    useEffect(
        () => {
            const showProductCount = Object.values(productShow).filter(value => value).length;
            localStorage.setItem('showProductCount', JSON.stringify(showProductCount));
        }, [productShow]
    )

    const updateProductShow = (productId) => {
        setProductShow(prevState => ({
            ...prevState,
            [productId]: !prevState[productId]
        }));
    }

    const toggleShowOnlySelected = () => {
        setShowOnlySelected(prevState => !prevState);
    }

    return (
        <React.Fragment>
            <main>
                {isAuthenticated ? null : props.history.push("/login")}
                <button onClick={toggleShowOnlySelected}>
                    {showOnlySelected ? 'Show All' : 'Show Selected'}
                </button>
                <ProductCountContext.Provider value={productCount} >
                    {data && data.map(i => {
                        if (showOnlySelected && !productShow[i.id]) {
                            return null; // Skip rendering if showOnlySelected is true and the product is not selected
                        }
                        return (
                            <section className="Product" key={i.id}>
                                <h1>{i.name}</h1>
                                <p>{i.price}</p>
                                <button onClick={() => updateProductShow(i.id)}>
                                    {productShow[i.id] ? 'Hide' : 'Show'}
                                </button>
                            </section>
                        );
                    })}
                </ProductCountContext.Provider>
            </main>
        </React.Fragment>
    );
}

export default Product;

export function getCount(){
    return useContext(ProductCountContext);
}