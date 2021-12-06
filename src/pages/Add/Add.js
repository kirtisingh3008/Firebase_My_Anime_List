import React, { useState, useEffect } from 'react';
import fireDb from '../../firebase';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router';
import "./Add.css"

const intialstate = {
    name: "",
    genre: "",
    myPersonalRating: ""
}

const Add = () => {
    const [state, setState] = useState(intialstate);
    const [data, setData] =useState({});
    const { name, genre, myPersonalRating } = state;

    const {id} =useParams();
    // STEP -1 FIRST LETS POPULATE THE FORM IF DATA IS AVAILABLE and only if id is also there
    useEffect(() => {
      fireDb.child("Anime").on("value",(snapshot) =>
      {
          if(snapshot.val()!==null)
          {
              setData({...snapshot.val()});
          }
          else 
          {
              setData({});
          }
      });
      // CLEANUP
      return () => {
          setData({});
      };
    },[id]);

    useEffect(() => {
        if(id)
        {
           setState({...data[id]});
        }
        else 
        {
            setState({...intialstate});
        }
        return () =>{
            setState({...intialstate});
        };
    },[id,data]);

    const history = useHistory();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    // here is handlesubmit function where an event is passed
    const handleSubmit = (e) => {
        e.preventDefault();
        // validating if any of the fields is emepty than show an error with the use of toastify
        if (!name || !genre || !myPersonalRating) {
            toast.error("All Fields are mandatory")
        }
        else {
            // imp part to push the values in the database with checking the error also if not than display success
            if(!id)
            {
                fireDb.child("Anime").push(state, (err) => {
                    if (err) {
                        toast.error(err);
                    }
                    else {
                        toast.success("Added Successfully")
                    }
                });
            }
            // if already exsists and we want to modify it 
            else 
            {
                fireDb.child(`Anime/${id}`).set(state, (err) =>{
                   if(err){
                       toast.error(err);
                   }
                   else 
                   {
                       toast.success("Updated Successfully")
                   }
                }
                )
            }
        
            
            // here we are adding a delay of 3 sec and than redirectig it to home page after adding 
            setTimeout(() => history.push("/"), 300);
        }
    };
   // below is the form implementation of the three input fields which we are asking from the user
    return (
        <div style={{ marginTop: "100px" }}>
            <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" ,
            color: "brown"}}
                onSubmit={handleSubmit}> 
                <label htmlFor="name">Anime Name</label>
                <input type="text" id="name"
                    name="name"
                    placeholder="Anime Name"
                    value={name || ""}      // value can be empty or already there
                    onChange={handleInputChange} />

                <label htmlFor="genre">Genre</label>
                <input type="text" id="genre"
                    name="genre"
                    placeholder="Anime genre"
                    value={genre || ""}
                    onChange={handleInputChange} />

                <label htmlFor="MyPersonalRating">MyPersonalRating</label>
                <input type="number" id="myPersonalRating"
                    name="myPersonalRating"
                    placeholder="Rate It"
                    value={myPersonalRating || ""}
                    onChange={handleInputChange} />
                {/* If id is there than upadte otherwise save */}
                <input type="submit" value={id ? "update":"save"}/>  
            </form>
        </div>
    )
}

export default Add
