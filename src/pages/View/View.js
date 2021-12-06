import React, { useEffect, useState } from 'react'
import fireDb from '../../firebase';
import { Link } from "react-router-dom";
import { useParams } from 'react-router';
import './View.css'
const View = () => {

    const [anime,setAnime] = useState({});
    const {id} = useParams();
    useEffect(() => {
        fireDb.child(`Anime/${id}`).get().then((snapshot) => {
            if(snapshot.exists())
            {
                setAnime({...snapshot.val()});
            }
            else 
            {
                setAnime({});
            }
        });
    },[id]);
    console.log("anime",anime);
    return (
        <div style={{marginTop: "150px"}}>
            <div className="card">
                <div className="card-header">
                    <p><strong>Anime Detail</strong></p>
                    </div>
                    <div className="container">
                        
                        <strong>Anime Name: </strong>
                        <span>{anime.name}</span>
                        <br/>
                        <br/>

                        <strong>Anime Genre: </strong>
                        <span>{anime.genre}</span>
                        <br/>
                        <br/>

                        <strong>My Personal Rating: </strong>
                        <span>{anime.myPersonalRating}</span>
                        <br/>
                        <br/>
                      <Link to="/">
                          <button className="btn btn-view"> Head to Home</button>
                      </Link>
                    </div>
              </div>
              </div>
    )
}

export default View
