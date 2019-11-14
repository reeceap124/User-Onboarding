import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field } from "formik";
import axios from 'axios';
import * as Yup from 'yup';


const UserForm = ({values, errors, touched, status, resetForm}) => {

    const [users, setUsers] = useState([])
    useEffect(()=>{
        status && setUsers(users => [...users, status])
    },[status])

    return (
        <div className='user-form'>
            <Form>
                <Field type='text' name='name' placeholder='Your Name'/>
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}
                <Field type='email' name='email' placeholder='Email pls'/>
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}
                <Field type='password' name='password' placeholder='Password'/>
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}
                <label>
                    Accept Terms of Service?
                    <Field type='checkbox' name='termsOfService' checked={values.termsOfService}/>
                </label>
                <button type='submit'>Welcome</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Sold Soul?: {`${user.termsOfService}`}</li>
                </ul>
            ))}
        </div>
    )
}
const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, termsOfService}) {
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            termsOfService: termsOfService || false
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
      }),

    handleSubmit(values, {setStatus, resetForm}) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        setStatus(res.data);
        console.log('Got a response: ',res);
        
      })
      .catch(err => console.log(err.response))
      .finally(resetForm())
    }
})(UserForm);


export default FormikUserForm;