import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addReview, forgetpassSchema } from "../validation/Validate.js";
import Input from "../../pages/Input";
import { Button, Form } from "react-bootstrap";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";

function AddReview() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const initialValues = {
    //اكتبيهن نفس ما بده الباك اند
    comment: "",
    rating: "",
  };

  const onSubmit = async (e, users) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/${productId}/review`,
        users,
        { headers: { Authorization: `Tariq__${token}` } }
      );

      console.log(data);

      if (data.message == "success") {
        toast.success("added review succesfully", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate(`/products/${productId}/reviews`);
        return data;
      }
    } catch (error) {
      toast.error("Failed Error", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
    // console.log(data)
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: addReview,
  });
  const inputs = [
    //داينمك

    {
      id: "comment",
      type: "text",
      name: "comment",
      title: "comment",
      value: formik.values.comment,
    },
    {
      id: "rating",
      type: "number",
      name: "rating",
      title: "rating",
      value: formik.values.rating,
    },

    // الفاليو الي بتنحط جوا الانبوت احنا بنحطها
  ];
  // console.log(formik.values)

  
  return (
    <>
      <div className="container py-5 ">
        {/* انك تايب طريقة تدعم تشفير الفايل  */}
        <Form onSubmit={onSubmit} className="w-50">
          <span className="text-danger ">
            * You can add your comment for this product only once if it has been
            delivered to you. . .
          </span>

          {
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                id="comment"
                name="comment"
                title="التعليق"
                placeholder="write your comment here .."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="shadow-none border-0"
              />
            </Form.Group>
          }
          <Form.Group controlId="formBasicRating" className="my-3">
            <div>
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    className="star fs-3 "
                    color={ratingValue <= rating ? "#ffc107" : "#aaaaaa"}
                    onClick={() => setRating(ratingValue)}
                  />
                );
              })}
            </div>
          </Form.Group>
          <Button className="bg-dark border-0 mb-2" type="submit">
          comment
          </Button>
        </Form>
      </div>
    </>
  );
}

export default AddReview;
