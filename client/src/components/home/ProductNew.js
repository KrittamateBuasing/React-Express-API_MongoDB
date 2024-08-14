import React, { useState, useEffect } from 'react';
import { listby } from '../../Functions/product';
import { Button } from 'antd';
import CardProduct from '../card/CardProduct';
import CardLoading from '../card/CardLoading';

function ProductNew() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await listby(10, "createdAt", "desc");
            setProduct(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <div className='row' style={{ display: 'flex', flexWrap: 'wrap', margin: '-10px' }}>
                {
                    loading ? <CardLoading count={10} />
                    : product.map((item) => (
                        <div className='col' style={{ padding: '10px', boxSizing: 'border-box', flex: '0 0 25%' }}>
                            <CardProduct data={item} />
                        </div>
                    ))
                }
            </div>
            <footer style={{ padding: '40px', backgroundColor: '#f8f8f8', textAlign: 'center' }}>
                {/* You can add content here if needed */}
            </footer>
        </div>
    );
}

export default ProductNew;
