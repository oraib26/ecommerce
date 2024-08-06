import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import ReactPaginate from "react-paginate";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User";
import Loading from "../../loading/Loading";
import StarRating from "./StarRating";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Products() {
  const [products, setProducts] = useState([]);
  const [pageCount, setPagesCount] = useState(1);
  const [rating, setrating] = useState();
  //let [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  let pageParam = parseInt(queryParams.get("page")) || 1;
  let limit = parseInt(queryParams.get("limit")) || 4;
  let sort = queryParams.get("sort") || "default";
  const [searchName, setSearchName] = useState("");
  const [searchPrice, setSearchPrice] = useState();
  const [charOper, setCharOper] = useState("");

  let currentPage = 1;

  const getProducts = async (page, limit, sort) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`,
        {
          params: {
            page: page,
            limit: limit,
            sort: sort,
          },
        }
      );

      setProducts(data.products);
      const total = data.total;
      setPagesCount(Math.ceil(total / limit));

      queryParams.set("page", page);
      queryParams.set("limit", limit);
      queryParams.set("sort", sort);

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
    currentPage = selectedPage.selected + 1;

    console.log(selectedPage.selected + 1);
    console.log(currentPage);

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`,
        {
          params: {
            page: currentPage,
            limit: limit,
            sort: sort,
          },
        }
      );
      pageParam = currentPage;

      setProducts(data.products);
      getProducts(pageParam, limit, sort);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSort = async (sortBy) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`,
        {
          params: {
            page: currentPage,
            limit: limit,
            sort: sortBy,
          },
        }
      );

      setProducts(data.products);
      getProducts(pageParam, limit, sortBy);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleOperChange = async (oper) => {};
  const { data, isLoading } = useQuery("products", getProducts);
  if (isLoading) {
    return <Loading />;
  }

 

  return (
    <div className="products22">
      <div className="container py-5 ">
        {products.length > 0 && (
          <div className="btns mb-2  ">
            <Form>
              <InputGroup className="my-3 w-50">
              <div className="bg-white rounded-start p-2 ">
              <svg
                  width="22px"
                  height="22px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
                <Form.Control
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Search product name"
                  className="shadow-none rounded-end"
                />
       
                <select
                  onChange={(e) => setCharOper(e.target.value)}
                  className="border ms-2 rounded-start "
                >
                  <option value="=">{"="}</option>
                  <option value="&lt;">{">"}</option>
                  <option value="&lt;=">{">="}</option>
                  <option value="&gt;=">{"<="}</option>
                  <option value="&gt;">{"<"}</option>
                </select>

                <Form.Control
                  onChange={(e) => setSearchPrice(e.target.value)}
                  placeholder="Search product price"
                  className="border-start-0 shadow-none"
                />
              </InputGroup>
            </Form>
          </div>
        )}

        <div className="row mb-3">
          {products.length > 0 ? (
            products
              .filter((product) => {
                return (
                  (searchName.toLowerCase() === "" ||
                    product.name.toLowerCase().includes(searchName)) &&
                  (searchPrice === "" ||
                    (charOper === "="
                      ? product.price == searchPrice
                      : charOper === "<"
                      ? product.price < searchPrice
                      : charOper === "<="
                      ? product.price <= searchPrice
                      : charOper === ">"
                      ? product.price > searchPrice
                      : charOper === ">="
                      ? product.price >= searchPrice
                      : product))
                );
              })
              .map((product, index) => (
                <div className="card col-md-2 mx-1 p-1 shadow  " key={index}>
                  <img
                    src={product.mainImage.secure_url}
                    className="card-img-top img-fluid"
                    alt="productImg"
                  />
                  <div className="card-body border-top ">
                    <p className="card-text text-capitalize text-center fw-bold h-25">
                      {product.name}
                    </p>
                    <p className="card-text text text-center secondaryFontFamily fs-5 text-danger fw-bold">
                      ${product.price}
                    </p>
                    {/* <p className="card-text text text-center">{product.ratingNumbers}</p> */}
                    <StarRating rating={product.avgRating} />

                    <button className="btn  p-1 d-flex justify-content-center m-auto ">
                      {" "}
                      <Link
                        className=" text-decoration-none basicTextColor fw-bold basicFontFamily buyNow"
                        to={`/products/${product._id}`}
                      >
                        Buy Now
                      </Link>
                    </button>
                  </div>
                  {console.log(product)}
                </div>
              ))
          ) : (
            <h2 className="d-flex justify-content-center align-text-center vh-100 basicFontFamily fw-bold my-5">
              No Products Found ...
            </h2>
          )}
        </div>
        {products.length > 0 && (
          <ReactPaginate
            breakLabel={"..."}
            nextLabel={"next >"}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={"< prev"}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link "}
            previousClassName={"page-item "}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          
          />
        )}
      </div>
    </div>
  );
}

export default Products;
