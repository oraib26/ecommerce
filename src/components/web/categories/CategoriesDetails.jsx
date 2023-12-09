import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';


function CategoriesDetails() {
    const { categoryId } = useParams('categoryId');
    const getCategoriesDetails = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`)
        //console.log(data)
        return data;
    }
    const { data, isLoading } = useQuery('category_details', getCategoriesDetails);
    if (isLoading) {
        return <p>...Loading</p>
    }

    return (
        <div className='products '>
            {data?.products.length ? data?.products.map((product) =>
                <div className="product border text-center p-2 w-25 " key={product._id}>
                    <ReactImageMagnify {...{
                        smallImage: {
                            alt: product.name ,
                            isFluidWidth: true,
                            src: product.mainImage.secure_url
                        },
                        largeImage: {
                            src: product.mainImage.secure_url,
                            width: 1200,
                            height: 2000
                        },

                    }} />
                    {/* <img src={product.mainImage.secure_url} /> */}
                    <h2 className='fs-6 mt-3'>{product.name}</h2>
                    <Link to={`/products/${product._id}`}>details</Link>
                </div>

            ) : <h2>no products</h2>}

        </div>
    )
}

export default CategoriesDetails