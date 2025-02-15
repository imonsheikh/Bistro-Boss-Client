import { useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);

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
  };
  // 2.HandleValidateCaptcha
  const handleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    console.log(user_captcha_value);

    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    }
     else {
      setDisabled(true);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex md:flex-row flex-col">
        <div className="text-center lg:text-left w-1/2 ">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
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
                  ref={captchaRef}
                  type="text"
                  name="captcha"
                  className="input"
                  placeholder="Type The Captcha Above"
                />
                <button
                  onClick={handleValidateCaptcha}
                  className="btn btn-outline btn-xs mt-2"
                >
                  Validate
                </button>
              </div>

              <input
                disabled={disabled}
                className="btn btn-primary"
                value="Login"
                type="submit"
              />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
