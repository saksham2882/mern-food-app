import React, { useContext, useState, useEffect } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Sign Up")
  const [animateKey, setAnimateKey] = useState(0)

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    setAnimateKey(prev => prev + 1);
  }, [currState]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message, {
          duration: 4000,
          position: 'top-center',
        });
        setShowLogin(false);
      } else {
        toast.error(response.data.message, {
          duration: 4000,
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        duration: 4000,
        position: 'top-center',
      });
    }
  }

  const onGuestLogin = async () => {
    const guestData = {
      email: "guest@gmail.com",
      password: "guest@123",
    };

    try {
      const response = await axios.post(`${url}/api/user/login`, guestData);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Logged in as Guest", {
          duration: 4000,
          position: 'top-center',
        });
        setShowLogin(false);
      } else {
        toast.error(response.data.message, {
          duration: 4000,
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error("Guest login failed. Please try again.", {
        duration: 4000,
        position: 'top-center',
      });
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>

        <div className="login-popup-content" key={animateKey}>
          <div className="login-popup-inputs">
            {currState === "Sign Up" && (
              <input
                type="text"
                name='name'
                onChange={onChangeHandler}
                value={data.name}
                placeholder='Your Name'
                required
              />
            )}
            <input
              name='email'
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder='Your Email'
              required
            />
            <input
              name='password'
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder='Your Password'
              required
            />
          </div>

          <button type='submit'>
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>

          <button type="button" className="guest-btn" onClick={onGuestLogin}>
            Continue as Guest
          </button>

          {currState === "Sign Up" && (
            <div className="login-popup-condition">
              <input type="checkbox" required />
              <p>
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
              </p>
            </div>
          )}

          <p>
            {currState === "Login" ? "Create a new account?" : "Already have an account?"}
            <span onClick={() => setCurrState(currState === "Login" ? "Sign Up" : "Login")}>
              {currState === "Login" ? " Sign Up" : " Login"}
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginPopup