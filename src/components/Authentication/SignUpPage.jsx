import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

import "./SignUpPage.css"
import user from "../../assets/user.webp";
import { getUser, signup } from '../../services/userServices';
import { Navigate } from 'react-router-dom';

const schema = z.object({
    name: z.string().min(3, {message: "Name should be at least 3 characters."}),
    email: z.string().email({message: "Please enter valid email address."}).min(3),
    password: z.string().min(8, {message: "Password should be at least 8 characters."}),
    confirm_password: z.string(),
    address: z.string().min(15, {message: "Address should be at least 15 characters."})
}).refine(data => data.password === data.confirm_password, {
    message: "Confirm password doesn't match Password",
    path: ["confirm_password"]
})

const SignUpPage = () => {
    const {
        register, 
        handleSubmit,   
        formState: {errors}
    } = useForm({resolver: zodResolver(schema)});

    const [profilePic, setProfilePic] = useState(null)
    const [formError, setFormError] = useState("")

    const onSubmit = async (formData) => {
        try{
            await signup(formData, profilePic);
            window.location = "/";

        } catch (err){
            if(err.response && err.response.status === 400) {
                setFormError(err.response.data.message)
            }
        }
    }

    if(getUser()) {
        return <Navigate to="/" />
    }
  return (
    <section className='align_center form_page'>
        <form className="authentication_form signup_form" onSubmit={handleSubmit(onSubmit)}>
            <h2>SignUp Form</h2>

            <div className='image_input_section'>
                <div className='image_preview'>
                    <img src={profilePic ? URL.createObjectURL(profilePic) : user} id='file-ip-1-preview' />
                </div>
                <label htmlFor='file-ip-1' className='image_label'>
                    Upload Image
                </label>
                <input type='file' id='file-ip-1' className='image_input' onChange={e => setProfilePic(e.target.files[0])} />
            </div>

            <div className="form_inputs signup_form_input">
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" className="form_text_input" placeholder='Enter your name'
                    {...register("name")}/> 
                    {errors.name &&  <em className='form_error'>{ errors.name.message }</em>}

                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" className="form_text_input" placeholder='Enter your email'
                    {...register("email")}/> 
                    {errors.email &&  <em className='form_error'>{ errors.email.message }</em>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" className="form_text_input" placeholder='Enter your password'
                    {...register("password")}/> 
                    {errors.password &&  <em className='form_error'>{errors.password.message}</em>}
                    
                    <label htmlFor="confirm_password">Confirm password</label>
                    <input id="confirm_password" type="password" className="form_text_input" placeholder='Enter confirm password'
                    {...register("confirm_password")}/>                     
                    {errors.confirm_password &&  <em className='form_error'>{errors.confirm_password.message}</em>}
                </div>
                <div className='signup_textares_section'>
                    <label htmlFor="address">Delivery address</label>
                    <input id="address" type="text" className="input_textarea" placeholder='Enter delivery address'
                    {...register("address")}/> 
                    {errors.address &&  <em className='form_error'>{errors.address.message}</em>}
                </div>
            </div>
            { formError && <em className='form_error'>{formError}</em>}
            <button type="submit" className='search_button form_submit'>Submit</button>
        </form>
    </section>
  )
}

export default SignUpPage