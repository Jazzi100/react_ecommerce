// useFetchProduct.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchProduct = (id) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        const fetchProduct = async () => {
            try {
                let url = `http://localhost:5000/api/product/single-product/?id=${id}`;
                const response = await axios.get(url, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                setProduct(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return { product, loading, error };
};

export default useFetchProduct;
