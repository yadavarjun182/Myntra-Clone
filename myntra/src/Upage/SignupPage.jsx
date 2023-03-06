import { FormControl, FormErrorMessage, Checkbox, Input, Select, Button, Spinner, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import usergetdataaction from '../Redux/Auth/UserSignup/usergetdataaction'
import "./Signup.css"
import usersignupaction from '../Redux/Auth/UserSignup/usersignupaction'
import { Link, useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const init = {
    email: "",
    password: "",
    name: "",
    phonenumber: Number,
    token: null,
    cart: [],
    wish: []
  }
  const [data, setData] = useState(init)
  const toast = useToast()
  const dispatch = useDispatch()
  const userdata = useSelector(store => store.usergetdatareducer.userdata)
  const isloading = useSelector(store => store.usergetdatareducer.isloading)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(usergetdataaction())
  }, [])

  let emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const isValidEmail = (email) => {
    return emailRegex.test(email);
  }

  const handleChange =  (e) => {
    const { name } = e.target
    let val = e.target.value
    setData({ ...data, [name]: val })
  }


  const onSubmit = (e, data) => {
    e.preventDefault()
   
  
    
    let payload = { ...data, token: data.name }
    let getuseremai = userdata.filter(ele => ele.email === payload.email)
    if (getuseremai.length > 0) {
      toast({
        position: "center",
        title: 'This account already exist',
        // description: "Create a new ",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setData(init)
    }
    else {

      let val = data.email;
      if ( isValidEmail(`${val}`)) {
        dispatch(usersignupaction(payload))
        toast({
          position: "top",
          title: 'Account created succesfully',
          // description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setData(init)
        navigate("/login")
      } else {
        alert('Invalid email address');
      }
   }
  }


  if (isloading) {
    return <form className='form'>
      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />

    </form>
  }

  return (<>
    <form className='form' onSubmit={(e) => onSubmit(e, data)}>
      <h1>Create account here</h1>
      <FormControl className='form-controll'>

        <Input name='name' 
        value={data.name} 
        onChange={handleChange} 
        className='input' 
        type='text' 
        placeholder="Enter your name" />

        <Input name="email" 
        value={data.email} 
        onChange={handleChange} 
        className='input' 
        type='email' 
        placeholder="enter your email" />

        <Input type="number" 
        name="phonenumber" 
        value={data.phonenumber} 
        onChange={handleChange} 
        className='input' 
        placeholder="Enter your phone number" />

           {/* minlength="10" maxlength="10" */}


        <Input name="password" 
        value={data.password} 
        onChange={handleChange} 
        className='input' 
        type='password' 
        placeholder="Enter your password" />

      </FormControl>
      <Button colorScheme='teal' type='submit'>
        Submit
      </Button>
      <p>Already a user <Link to="/login">Login here</Link></p>
      <Link to="/adminlogin">Admin Login</Link>
    </form>

  </>
  )

}
export { SignupPage }