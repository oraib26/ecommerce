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
    cosd:yup.string().required("code is required").min(4,"must at least 4 characters").max(4,"max is 4 char")



})


 