// useFetchProduct.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchProducts = ({categoryId, userId, productId}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        const fetchProduct = async () => {
            try {
                let url = `http://localhost:5000/api/cart/get-cart`;
                const params = new URLSearchParams();
                
                if (categoryId) params.append('categoryId', categoryId);
                if (userId) params.append('userId', userId);
                if (productId) params.append('productId', productId);
                
                const queryString = params.toString();
                if(queryString) url += `?${queryString}`

                const response = await axios.get(url, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                setProducts(response.data.cart);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [categoryId, userId, productId]);

    return { products, loading, error };
};

export default useFetchProducts;
