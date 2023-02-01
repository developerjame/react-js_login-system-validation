import { useState, useEffect } from "react"
import PWDRequisite from "./PWDRequisite";

export const Login = (props) => {
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [pwdRequisite, setPWDRequisite] = useState(false);
    const [checks, setChecks] = useState({
        capsLetterCheck: false,
        numberCheck: false,
        pwdLengthCheck: false,
        specialCharCheck: false,
    });

    const handleChange = (e) => {
        const { name, value } =e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleOnFocus = ()=>{
        setPWDRequisite(true);
    };

    const handleOnBlur = ()=>{
        setPWDRequisite(false);
    };

    const handleOnKeyUp = (e) =>{
        const { value } = e.target;
        const capsLetterCheck = /[A-Z]/.test(value);
        const numberCheck = /[0-9]/.test(value);
        const pwdLengthCheck = value.length >= 8;
        const specialCharCheck = /[!@#$%^&*]/.test(value);
        setChecks({
            capsLetterCheck,
            numberCheck,
            pwdLengthCheck,
            specialCharCheck,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    },[formErrors])

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email){
            errors.email = "Email is required!";
        }else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format";
        }
        if (!values.password){
            errors.password = "Password is required!"
        }else if (values.password < 4) {
            errors.password = "Password must be more than 4 characters";
        }
        return errors;
    };

    const [show, setShow] = useState(false);
    const handleShow = ()=>{
        setShow(!show)
    }

    return( 
        <div className="auth-form-container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="ui message success">Signed in successfully</div>) : (
            <div className="ui message success"></div>)}
            <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label for="email">email</label>
            <input type="email" 
                   placeholder="youremail@gmail.com" 
                   id="email" 
                   name="email" 
                   value={formValues.email} 
                   onChange={handleChange}/>
            <p style={{color: 'red'}}>{ formErrors.email }</p>
            <label for="password">password</label>
            <div className="input-field">
            <input type={show ? "text":"password"} 
                   placeholder="***********" 
                   id="password" 
                   name="password" 
                   value={formValues.password} 
                   onChange={handleChange}
                   onFocus={handleOnFocus}
                   onBlur={handleOnBlur}
                   onKeyUp={handleOnKeyUp}/>
            <span onClick={handleShow}>{show?"Hide":"Show"}</span>
            </div>
            <p style={{color: 'red'}}>{ formErrors.password }</p>
            {pwdRequisite? ( 
            <PWDRequisite 
                 capsLetterFlag={checks.capsLetterCheck ? "valid":"invalid"}
                 numberFlag={checks.numberCheck ? "valid":"invalid"}
                 pwdLengthFlag={checks.pwdLengthCheck ? "valid":"invalid"}
                 specialCharFlag={checks.specialCharCheck ? "valid":"invalid"}
                 />
                 ):null}
            <button>Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register</button>
    </div>
    )
}