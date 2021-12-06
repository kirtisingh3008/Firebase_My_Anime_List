import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import fireDb from '../../firebase';
import "./Home.css";

const Home = () => {

    const [data, setData] = useState({});

    const onDelete = (id) =>{
        if(window.confirm("Are you sure you want to delete it ?"))
        {
            // step to delete anime with particular id from database
            fireDb.child(`Anime/${id}`).remove((err) =>{
                if(err)
                {
                    toast.error(err);
                }
                else 
                {
                    toast.success("deleting from the database");
                }
            })
        }
    }

    // Putting data in the table from realtime database
    useEffect(() => {
        fireDb.child("Anime").on("value",(snapshot) => {
            if(snapshot.val() !== null)
            {
                setData({...snapshot.val()});
            }
            else
            {
                setData({});
            }
        });
        return () => {
            setData({});
        };
    },[]);

    return (
        <div style={{ marginTop: "100px"}}>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}> No</th>
                        <th style={{ textAlign: "center" }}> Name</th>
                        <th style={{ textAlign: "center" }}> Genere</th>
                        <th style={{ textAlign: "center" }}> MyPersonalRating</th>
                        <th style={{ textAlign: "center" }}> Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* maping the objects we have in database */}
                    {
                        Object.keys(data).map((id, index) => {
                            return (
                                    <tr key={id}>
                                        <th scope="row">
                                            {index+1}
                                        </th>
                                        <td>{data[id].name}</td>
                                        <td>{data[id].genre}</td>
                                        <td>{data[id].myPersonalRating}</td>
                                        <td>
                                            <Link to ={`/update/${id}`}>
                                                <button className="btn btn-edit">Edit</button>
                                            </Link>
                                                <button className="btn btn-delete" onClick={()=> onDelete(id)}>Delete</button>
                
                                            <Link to ={`/view/${id}`}>
                                                <button className="btn btn-view">View</button>
                                            </Link>
                                            </td>
                                    </tr>
                            );
                        }
                        )
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Home;
