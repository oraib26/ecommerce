import * as yup from 'yup';


export const registerschema = yup.object({
    userName:yup.string().required("user name is required").min(3,"must at least 3 characters").max(30,"max is 30 char"),
    email:yup.string().required("email is required").email(),
    password:yup.string().required("password is required").min(3,"must at least 3 characters").max(30,"max is 30 char"),

})

export const loginschema = yup.object({
    email:yup.string().required("email is required").email(),
   
    password:yup.string().required("password is required").min(3,"must at least 3 characters").max(30,"max is 30 char"),

})

export const resetPassSchema = yup.object({
    email:yup.string().required("email is required").email(),


})
export const forgetpassSchema = yup.object({
    email:yup.string().required("email is required").email(),
    password:yup.string().required("password is required").min(3,"must at least 3 characters").max(30,"max is 30 char"),
    code:yup.string().required("code is required").length(4,"must  4 characters")



})
export const sendOrder=yup.object({
    phone:yup.string().required("phone is required").min(9,"must at least 9 digits").max(11,"max is 11 char"),
    address:yup.string().required("address is required"),


})
export const addReview=yup.object({
    comment:yup.string().required("comment is required").min(4,"must at least 9 characters"),
    rating:yup.number().required("rating is required").min(0,"must at least 0").max(5,"max is 5"),


})



 