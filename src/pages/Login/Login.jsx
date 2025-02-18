import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProviders";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async"; 
import Swal from 'sweetalert2' 



const Login = () => {
  // const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true); 
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location);
   
  const from = location.state?.from?.pathname || "/"
  console.log('state in the location login page', location.state);
    
 
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []); 

  //1.HandleLogin
  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    //Call signIn
    signIn(email, password).then(result => {
      const user = result.user;
      console.log(user); 
      // alert('Login successful') 
      Swal.fire({
        title: "User Login Successful",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        } 
      });
      navigate(from, {replace: true})
    });
  };
  // 2.HandleValidateCaptcha
  const handleValidateCaptcha = (e) => {
    // const user_captcha_value = captchaRef.current.value;
    const user_captcha_value = e.target.value;
    console.log(user_captcha_value);

    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Log In </title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex md:flex-row flex-col">
          <div className="text-center lg:text-left w-1/2 ">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card md:w-1/2 bg-base-100  max-w-sm shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <fieldset className="fieldset">
                <label className="fieldset-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="fieldset-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                />

                <div>
                  <label className="fieldset-label border">
                    <LoadCanvasTemplate />
                  </label>
                  <input 
                    onBlur={handleValidateCaptcha}
                    // ref={captchaRef}
                    type="text"
                    name="captcha"
                    className="input"
                    placeholder="Type The Captcha Above"
                  />
                  <button
                    // onClick={handleValidateCaptcha}
                    type="button" //Default type has submit that's why I have to change the type 
                    disabled={disabled}
                    className="btn btn-outline btn-xs mt-2"
                  >
                    Validate
                  </button>
                </div>

                <input 
                  // TODO: apply disable for recaptcha 
                  disabled={false} 
                  // disabled={disabled} 
                  className="btn btn-primary"
                  value="Login"
                  type="submit"
                />
              </fieldset>
            </form>

            <p>
              <small>New Here?</small>
              <Link to="/signup">Create a New Account</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
