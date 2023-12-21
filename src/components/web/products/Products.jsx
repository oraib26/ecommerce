import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import ReactPaginate from 'react-paginate';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import Loading from '../../loading/Loading';
import StarRating from './StarRating';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



function Products() {
    const [products, setProducts] = useState([]);
    const [pageCount, setPagesCount] = useState(1);
    const [rating, setrating] = useState();
    //let [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    let pageParam = parseInt(queryParams.get('page')) || 1;
    let limit = parseInt(queryParams.get('limit')) || 4;
    let sort = queryParams.get('sort') || 'default';
    const [searchName, setSearchName] = useState('');
    const [searchPrice, setSearchPrice] = useState();
    const [charOper, setCharOper] = useState('');

    let currentPage = 1;

    const getProducts = async (page, limit, sort) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
                params: {
                    page: page,
                    limit: limit,
                    sort: sort,

                },
            });

            setProducts(data.products);
            const total = data.total;
            setPagesCount(Math.ceil(total / limit));

            queryParams.set('page', page);
            queryParams.set('limit', limit);
            queryParams.set('sort', sort);

            navigate({ search: queryParams.toString() });

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };


    useEffect(() => {

        currentPage = pageParam;
        getProducts(pageParam, limit, sort);


    }, []);


    const handlePageClick = async (selectedPage) => {
        currentPage = (selectedPage.selected) + 1

        console.log((selectedPage.selected) + 1)
        console.log(currentPage);

        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
                params: {
                    page: currentPage,
                    limit: limit,
                    sort: sort,

                },
            });
            pageParam = currentPage;

            setProducts(data.products);
            getProducts(pageParam, limit, sort);


        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleSort = async (sortBy) => {


        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
                params: {
                    page: currentPage,
                    limit: limit,
                    sort: sortBy,

                },
            });

            setProducts(data.products);
            getProducts(pageParam, limit, sortBy);



        } catch (error) {
            console.error("Error fetching products:", error);
        }

    }
    const handleOperChange = async (oper) => {

    };

    return (

        <div className='container py-5'>
            <div className="btns mb-2 ">
                
                <Form>
                    
                    <InputGroup className='my-3 w-50'>

                        <Form.Control
                            onChange={(e) => setSearchName(e.target.value)}
                            placeholder='Search product name'
                        />
                        <select
                         
                            onChange={(e) => setCharOper(e.target.value)}
                            className='border ms-2 rounded-start'
                        >
                            <option value="=">{'='}</option>
                            <option value="&lt;">{'>'}</option>
                            <option value="&lt;=">{'>='}</option>
                            <option value="&gt;=">{'<='}</option>
                            <option value="&gt;">{'<'}</option>
                        </select>

                        <Form.Control
                            onChange={(e) => setSearchPrice(e.target.value)}
                            placeholder='Search product price'
                            className='border-start-0'
                        />
                      
                        

                    </InputGroup>
                </Form>


            </div>



            <div className="row mb-3 ">
                {products.length ? products.filter((product) => {
                    return (
                        (searchName.toLowerCase() === '' ||
                          product.name.toLowerCase().includes(searchName)) 
                          &&
                        (searchPrice === '' ||
                          (charOper === '='
                            ? product.price == searchPrice
                            : charOper === '<'
                            ? product.price < searchPrice
                            : charOper === '<='
                            ? product.price <= searchPrice
                            : charOper === '>'
                            ? product.price > searchPrice
                            : charOper === '>='
                            ? product.price >= searchPrice
                            : product)
                            
                            )
                      );
                }).map((product, index) =>

                    <div className="card col-md-2 w-25 grid gap-2  " key={index}>
                        <img src={product.mainImage.secure_url} className="card-img-top img-fluid" alt="productImg" />
                        <div className="card-body border-top ">
                            <p className="card-text text text-center fw-bold h-25">{product.name}</p>
                            <p className="card-text text text-center fs-4 text-danger fw-bolder">${product.price}</p>
                            {/* <p className="card-text text text-center">{product.ratingNumbers}</p> */}
                            <StarRating rating={product.avgRating} />

                            <button className='btn  p-1 d-flex justify-content-center m-auto '>  <Link className=' text-decoration-none' to={`/products/${product._id}`} >Buy now</Link></button>
                        </div>
                        {console.log(product)}


                    </div>

                ) : 'no products'}
            </div>
            <ReactPaginate
                breakLabel={"..."}
                nextLabel={"next >"}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={"< previous"}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}


            />
        </div>

    )
}

export default Products