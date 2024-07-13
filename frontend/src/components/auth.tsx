import { ChangeEvent } from 'react'
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import Quote from './quote'
import { UserSignupSchema } from '@himanshuchaudhari/mediumwebsite-common'
import axios from 'axios'
import {useSetRecoilState} from "recoil"
import {userName} from "../App"

export default function Auth({type}:{type:'Sign Up' | 'Sign In'}){
    const setUserName = useSetRecoilState(userName)
    const navigate=useNavigate()
    const [postInput,setpostInput]=useState<UserSignupSchema>({
        email : "",
        name : "",
        password : ""
    })
    const sendSignupRequest= async ()=>{
        try{
            const response=await axios.post(`${process.env.BACKEND_URL}/api/v1/user/${type ==='Sign Up'?'signup':'signin'}`, postInput)
            const jwt=response.data.token
            if(!jwt){
                alert("Check Your Credentials")
            }else{
                localStorage.setItem('token',jwt)
                alert("Loged In Successfuly")
                setUserName(postInput.name)
                navigate("/blogs");
            }
        }catch(error:any){
            if(error.response.status==400){
                alert("Check Your Credentials")
            }
            if(error.response.status==500){
                type ==='Sign Up'?alert("Please use different email"):alert("Check Your Credentials")
            }
        }
    }
  return (
    <div className="grid  grid-cols-1 lg:grid-cols-2 ">
            <div>
                <div className="flex flex-col items-center justify-center h-screen w-full">
                    <div className="space-y-12 m-auto">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="font-semibold text-3xl leading-7 text-gray-900">{type == 'Sign In' ? 'Get logged in here' : 'Create An Account'}</h2>
                            <p className=" mt-5 text-sm text-center leading-6 text-gray-600">{type == 'Sign In' ? 'Don\'t have an account' : 'Already Have an account ?'} <Link className="pl-2 underline" to={type == 'Sign In' ? '/signup' : '/signin'} >{type == 'Sign In' ? 'Signup' : 'Signin'}</Link> </p>
                            <div className="mt-10 grid grid-cols-1  gap-y-8 ">
                                <LabbeledInput placeholder=" Himanshu Chaudhari" type="string" label = "Username" onChange = {(e)=>{
                                    setpostInput({
                                        ...postInput,
                                        name : e.target.value
                                    })  
                                }}></LabbeledInput>
                                <LabbeledInput placeholder="himanshuchaudhari@gmail.com" type="email" label = "Email" onChange = {(e)=>{
                                    setpostInput({
                                        ...postInput,
                                        email : e.target.value
                                    })  
                                }} ></LabbeledInput>
                                <LabbeledInput placeholder="min(8) max(15) characters"  label = "Password" type="password" onChange = {(e)=>{
                                    setpostInput({
                                        ...postInput,
                                        password : e.target.value
                                    })  
                                }} ></LabbeledInput>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button 
                                className="w-full rounded-md bg-slate-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={()=>{
                                    sendSignupRequest()
                                }}>
                                {type == 'Sign In' ? 'Sign In' : 'Sign Up'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block">
                <Quote></Quote>
            </div>
        </div>
  )
}

interface LabbeledInputtype{
    placeholder : string ;
    label : string ;
    type ? : string;
    onChange : (e: ChangeEvent <HTMLInputElement> )=>void;
}

const LabbeledInput=( {placeholder, label,type ,onChange} : LabbeledInputtype )=>{
    return (<div className="sm:col-span-3">
        <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
            {label}
        </label>
        <div className="mt-2">
            <input
                type={type ? type:'string' }
                name={label}
                id={label}
                placeholder={placeholder}
                onChange={onChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
    </div>
    )
}
