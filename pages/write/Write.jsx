import { useContext, useState } from 'react'
import './write.css'
import axios from 'axios';
import { Context } from '../../context/Context';

export default function Write() {
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [file,setFile]=useState(null);
  const [error, setError] = useState(null);
  const {user} =useContext(Context);
  const handleSubmit =async (e)=>{
    e.preventDefault();
    if (!user) {
      setError("User must be logged in to create a post.");
      return;
    }
    const newPost={
      username:user.username,
      title,
      desc,
    };
    if(file){
      const data=new FormData();
      const filename=Date.now()+file.name;
      data.append("name",filename);
      data.append("file",file);
      newPost.photo=filename;
      try{
        await axios.post("/upload",data);

      }catch(err){
        setError("File upload failed");
        return;
      }
    }
    try{
      const res=await axios.post("/posts",newPost);

      if (res.data._id) {
        window.location.replace("/post/" + res.data._id);
      } else {
        setError("Failed to create post. Please try again.");
      }

    }catch(err){
      setError("An error occurred while creating the post.");
    }
  }
  return (
    <div className='write'>
      {file && (
        <img className='writeImg' src={URL.createObjectURL(file)} alt='' onLoad={() => URL.revokeObjectURL(file)} />

      )}
        <form className='writeForm' onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor='fileInput'>
                    <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input type='file' id='fileInput' style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                    <input type='text' placeholder='Title' className='writeInput' autoFocus={true} onChange={(e)=>setTitle(e.target.value)}/>
                </div> 
                <div className="writeFormGroup">
                    <textarea placeholder='Tell your story' type="text" className='writeInput writeText' onChange={(e)=>setDesc(e.target.value)}></textarea>
                </div>
                <button className="writeSubmit" type='submit'>Publish</button>
                {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}
