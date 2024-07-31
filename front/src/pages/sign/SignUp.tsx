import AuthService from "@/services/authService";
import { useState } from "react";
import img from "../../assets/authentication.gif";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const SignUp = () => {
  // const [formData, setFormData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   telephone: "",
  //   adresse: "",
  //   cin: "",
  //   nom: "",
  //   prenom: "",
  //   matricule: "",
  //   image: "",
  // });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });
  const navigate = useNavigate();

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      
      await AuthService.signup(formData);

      console.log("User registered successfully!");
      toast.success("User registered successfully!")
      navigate('/sign-in');

    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error signing up: " + error)
    }
  };

  return (
    <div>
      <div className="container h-screen bg-white">
        <div className=" flex flex-col lg:flex-row">
          <div className="flex-1 ">
            <img src={img} alt="" />
          </div>
          <div className="flex  h-screen flex-col justify-center items-center gap-5 px-7 pt-10 py-5 w-full max-w-lg shadow-2xl bg-base-100">
            <div className="  text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign up now!</h1>
            </div>
            <form onSubmit={handleSubmit} className="w-4/5">
              <div>
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your full name"
                  className="input  p-2 rounded input-bordered w-full"
                />
              </div>
             
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="input  p-2 rounded input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                   
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="input  p-2 rounded input-bordered w-full"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-transparent my-2  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full"
                >
                  Sign up
                </button>
              </div>
              <h1>
                Already have an account?{" "}
                <a className="text-blue-700 mt-2" href="/sign-in">
                  Sign in
                </a>{" "}
                here
              </h1>
           
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
