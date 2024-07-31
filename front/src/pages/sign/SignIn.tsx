import AuthService from "@/services/authService";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthService.signin(formData) ;
      if (res.userInfo.accessToken) {
          console.log("🚀 ~ handleSubmit ~ res:", res)
          console.log("User signed in successfully!");
          toast.success("User signed in successfully!")
           window.location.href = "dashboard" // Example: Redirect to the dashboard page
        
      }else{
        toast.error("Error signing in "  );
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Error signing in: " + error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen  ">
      
      
        <div className="flex h-screen bg-white flex-col justify-center items-center gap-8 py-7 w-full max-w-lg shadow-2xl bg-base-100">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign in here!</h1>
          </div>
          <form onSubmit={handleSubmit} className="w-100 space-y-5">
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="input p-2 input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                className="w-full p-2 input input-bordered"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full"
              >
                Sign in
              </button>
            </div>
            <h1>
              Don't have an account yet,{" "}
              <a className="text-blue-700" href="/sign-up">
                Sign up
              </a>{" "}
              here
            </h1>
          </form>
        </div>
      
       
    </div>
  );
};

export default SignIn;
