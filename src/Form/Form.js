// ES-Lint disable
import React, { useEffect, useState } from "react";
import "./Form.css";
import playerimg from "../icons/marathon-man.png";
import axios, { Axios } from "axios";
export default function Form() {

    const [player, setPlayer] = useState({
        _id: "0",
        participantName: "",
        units: "",
        location: "",
        type: "",
        date: "",
        points: 0,
    });
    const [btnState, setBtnstate] = useState(false)
    const [players, setPlayers] = useState([]);
    useEffect(() => {
        axios.get(`http://127.0.0.1:3000/api/players/`).then((response) => {
            console.log(response.data);
            console.log(typeof (player.points))
            setPlayers(response.data);


        });
    }, [])
    function handleSubmit(e) {
        e.preventDefault();

        // console.log(players);
        if(player){
        setBtnstate(true)
        }
        
        
         axios
                .post('http://127.0.0.1:3000/api/players', {

                    participantName: player.participantName,
                    units: player.units,
                    location: player.location,
                    points: player.points,
                    type_: player.type,
                    selectedDate: player.date,

                })
                .then((response) => {
                    setPlayers([...players, response.data]);
                });
            setPlayer({

                participantName: "",
                units: "",
                location: "",
                points: "",
                type: "",
                date: "",
            })
           
    };
    function deletePlayer(id) {
        axios
            .delete(`http://127.0.0.1:3000/api/players/${id}`)
            .then(() => {
                alert("Post deleted!");
                let updatedPlayers = players.filter(playerval => playerval._id !== id)
                setPlayers(updatedPlayers)

            });


    }
    function incrementPoints(id, points) {
        axios.put(`http://127.0.0.1:3000/api/players/incrementpoints/${id}`, {
            points,
        }).then((res) => {

            setPlayers(res.data);

        })
    }
    function decrementPoints(id, points) {

        axios.put(`http://127.0.0.1:3000/api/players/decrementpoints/${id}`, {
            points,
        }).then((res) => {
            setPlayers(res.data);
        })
    }
    return (<>

        <h1 className="main-heading"> <img src={playerimg} width={"40px"} height={"40px"} className="img-fluid" />FullStack Player Board Application</h1>
        <div className="create-player-form container">

            <form>
                <div className="form-group w-50 m-auto">


                    <label >Name</label>
                    <input required value={player.participantName} onChange={(e) => { setPlayer({ ...player, participantName: e.target.value }) }} type="text" className="form-control" />
                </div>

                <div className="form-group w-50 m-auto">
                    <label >Location</label>
                    <input required value={player.location} onChange={(e) => { setPlayer({ ...player, location: e.target.value }) }} type="text" className="form-control" />
                </div>
                <div className="form-group w-50 m-auto">
                    <label >Units</label>
                    <input required value={player.units} onChange={(e) => { setPlayer({ ...player, units: e.target.value }) }} type="text" className="form-control" />
                </div>
                <div className="form-group w-50 m-auto">
                    <label >Points</label>
                    <input required value={player.points} onChange={(e) => { setPlayer({ ...player, points: e.target.value }) }} type="number" className="form-control" />
                </div>
                <div className="form-group w-50 m-auto">
                    <label >Type</label>
                    <input required value={player.type} type="text" onChange={(e) => { setPlayer({ ...player, type: e.target.value }) }} className="form-control" />
                </div>
                <div className="form-group w-50 m-auto">
                    <label >Date</label>
                    <input required type="date" value={player.date} onChange={(e) => { setPlayer({ ...player, date: e.target.value }) }} className="form-control" />
                </div>

                <br />
                {btnState==true?<button  type="submit" onClick={handleSubmit} className="btn  d-flex m-auto">Add Player</button>:<button disabled type="submit" onClick={handleSubmit} className="btn  d-flex m-auto">Add Player</button>}

            </form>
        </div>
        <div className="container">
            <div className="row">
                {players.map((data, key) => {

                    return (<div key={key} className="d-flex m-auto">

                        <div className="col-xl-12" style={{ width: "320px",marginBottom:"40px" }}>
                            <div className="card mt-4">
                                <div className="card-body">

                                    <p>Name:{data.participantName}</p>
                                    <p>Location:{data.location}</p>
                                    <p>Units:{data.units + "km"}</p>
                                    <p>Points:&nbsp;&nbsp;<button onClick={() => { incrementPoints(data._id, data.points) }} className="btn  rounded-pill ">+</button>&nbsp;{data.points}&nbsp;<button className="btn rounded-pill" onClick={() => decrementPoints(data._id, data.points)}>-</button></p>
                                    <p>Type:{data.type_}</p>
                                    <p>Date:{data.selectedDate}</p>
                                    <button onClick={() => { deletePlayer(data._id) }} className="btn">Delete</button>

                                </div>

                            </div>
                        </div>
                    </div>)

                })}

            </div>
        </div>

<p className="text-center">Design and developed by Naba Zehra </p>
    </>)
}