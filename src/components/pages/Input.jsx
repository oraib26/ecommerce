import React from "react";
import { InputGroup } from "react-bootstrap";

function Input({
  type = "text",
  id,
  title,
  icon,
  name,
  value,
  onChange,
  errors,
  onBlur,
  touched,
}) {
  //console.log(touched)
  return (
    <>
      <div className="input-group mb-3 ">
        <label className="w-100" htmlFor={id}>{title} </label>
        {icon && (
          <InputGroup.Text className="rounded-0 rounded-start-3 border-end-0">
            {icon}
          </InputGroup.Text>
        )}

        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={` form-control d-block input-field ${icon ? "rounded-0 rounded-end-3" : "rounded-3"}`}
        />
        {touched[name] && errors[name] && (
          <p className="text text-danger px-1 w-100">{errors[name]}</p>
        )}
        {/* بقدر ارسل الاسم باي اسم بدي ياه ف اتربيوت كومبونين الانبوت بس لما بدي احط لاله قيمة ف تاغ الانبوت بنجبر احط انه اسمه يساوي الاسم الي سميته ياه ياه بالكومبونيت */}
      </div>
    </>
  );
}

export default Input;
//
