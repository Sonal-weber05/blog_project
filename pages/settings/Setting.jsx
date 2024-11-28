import { useContext, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './setting.css'
import { Context } from '../../context/Context'
import axios from 'axios';

export default function Setting() {
    const {user,dispatch} =useContext(Context);
  const [file,setFile]=useState(null);
  const [username,setUsername]=useState(user.username);
  const [email,setEmail]=useState(user.email);
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);
  const [success,setSuccess]=useState(false);
    const PF ="http://localhost:5000/images/";
  const handleSubmit =async (e)=>{
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    if (!user) {
      setError("User must be logged in to create a post.");
      return;
    }
    const updatedUser={
      userId:user._id,
      username,email,password,
    };
    if(file){
      const data=new FormData();
      const filename=Date.now()+file.name;
      data.append("name",filename);
      data.append("file",file);
      updatedUser.profilePic=filename;
      try{
        await axios.post("/upload",data);

      }catch(err){
        setError("File upload failed");
        return;
      }
    }
    try{
        const res = await axios.put("/users/"+user._id,updatedUser);
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });

    }catch(err){
        dispatch({type:"UPDATE_FAILURE"})
      setError("An error occurred while creating the post.");
    }
  }

  const handleAccountDelete = async () => {
    if (!user) {
      setError("User must be logged in to delete an account.");
      return;
    }

    try {
        // Send a DELETE request to delete the user
        await axios.delete(`/users/${user._id}`, {
            data: { userId: user._id },
        });

        // Dispatch the logout action once account is deleted
        dispatch({ type: "LOGOUT" });
        window.location.replace("/"); // Redirect to homepage or login page after deletion
    } catch (err) {
        setError("An error occurred while deleting your account.");
    }
};
  return (
    <div className='settings'>
        <div className="settingWrapper">
            <div className="settingTitle">
                <span className="settingUpdateTitle">Update Your Account</span>
                <span className="settingDeleteTitle" onClick={handleAccountDelete}>Delete Your Account</span>

            </div>
            <form className='settingForm' onSubmit={handleSubmit}>

                <label>Profile picture</label>
                <div className="settingPP">
                    <img src={file ? URL.createObjectURL(file): PF + user.profilePic} alt='' ></img>
                    <label htmlFor='fileInput'>
                    <i className="settingPPIcon fa-regular fa-circle-user"></i>
                    </label>
                    <input type="file" id='fileInput' style={{display:"none"}} onChange={(e)=>{setFile(e.target.files[0])}}/>
                </div>
                <label>Username</label>
                <input type='text' placeholder={username} onChange={(e)=>setUsername(e.target.value)}/>
                <label>Email</label>
                <input type='email' placeholder={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label>Password</label>
                <input type='password' onChange={(e)=>setPassword(e.target.value)}/>
                <button className='settingSubmit' type='submit'>Update</button>
                {error && <span style={{color:"green",textAlign:"center",marginTop:"20px"}}>{error}</span>}
                {success && <span style={{color:"green",textAlign:"center",marginTop:"20px"}}>Profile has been updated...</span>}
            </form>
            
        </div>
        <Sidebar />
    </div>
  )
}
