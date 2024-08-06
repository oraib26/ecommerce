import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link, Outlet, useParams } from "react-router-dom";
import { format } from "date-fns";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import Loading from "../../loading/Loading.jsx";
function ProductReviews() {
  const { productId } = useParams();
  console.log(productId);

  const getProductReviews = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${productId}`
    );
    return data.product;
  };
  const { data, isLoading } = useQuery("product_Reviews", getProductReviews);
  if (isLoading) {
    return <Loading />;
  }
  console.log(data);
  // const formattedDate = format(new Date(review.createdAt), 'MM/dd/yyyy');

  return (
    <div className="py-5 border-top">
      <div className="d-flex justify-content-between w-50">
        <h3 className=" ">Comments :</h3>
        <Link className="btn  p-1 ms-2  " to="addreview">
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title></title>{" "}
              <g id="Complete">
                {" "}
                <g data-name="add" id="add-2">
                  {" "}
                  <g>
                    {" "}
                    <line
                      fill="none"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      x1="12"
                      x2="12"
                      y1="19"
                      y2="5"
                    ></line>{" "}
                    <line
                      fill="none"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      x1="5"
                      x2="19"
                      y1="12"
                      y2="12"
                    ></line>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        </Link>
      </div>

      <div className="">
        <Outlet />
      </div>

      {data?.reviews.length ? (
        data.reviews.map(
          (review, index) => (
            <div className="rounded bg-primar m-3 w-50 p-2">
              <img
                src={review.createdBy.image.secure_url}
                alt=""
                className="rounded-circle"
              />
              <div className=" d-inline position-absolute t-0 ms-1">
                {format(new Date(review.createdAt), "dd/MM/yyyy HH:mm:ss a")}
              </div>
              <div className="d-inline mx-3 ">
                <span className="secondaryFontFamily text-capitalize fs-">
                  <b> comment: {review.comment}</b>
                </span>
              </div>
              <span className=" d-block">
                <b className="mx-2 basicFontFamily">
                  {review.createdBy.userName}
                </b>
              </span>
              <Rating
                initialRating={review?.rating}
                readonly
                emptySymbol={<FaStar className="text-secondary" />}
                fullSymbol={<FaStar className="text-warning" />}
                className="fs-6 "
              />
            </div>
          )

          // <tr key={index}>
          //   <td>{index}</td>
          //   <td>{review.createdBy.userName}</td>
          //   <td>{review.comment}</td>
          //   <td>{review.rating}</td>

          // </tr>
        )
      ) : (
        <tr>no review yet ..</tr>
      )}
    </div>
  );
}

export default ProductReviews;
