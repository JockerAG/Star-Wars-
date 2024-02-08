import React, { useContext, useState } from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router";


export const Vehicles = () => {
const {store, actions} = useContext(Context);
const [isFavorite, setIsFavorite] = useState();
const navigate = useNavigate()

const handleDetails = (id) => {
  actions.getVehicleDetails(id);
  navigate(`/vehicle-details/${id}`)
}
const getFavorite = (item) => {
  actions.addFavorites(item.name)
  setIsFavorite(!isFavorite);
}

const handleOnError = (e) =>{
  e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
}

    return (
        <div className="container-fluid">
            <div className="row">
                {store.vehicles.map((vhc, index) => (
                    <div key={index} className="col-lg-2 my-2">
                    <div className="card" style={{maxWidth: "18rem"}}>
                      <img src={`https://starwars-visualguide.com/assets/img/vehicles/${vhc.uid}.jpg`} className="card-img-top" alt="..." onError={handleOnError}/>
                      <div className="card-body">
                            <h4 className="card-title fw-bold">{vhc.name}</h4>
                          <div className="btns d-flex justify-content-md-between">
                                    <button onClick={() => handleDetails(vhc.uid)} className="btn btn-sm btn-outline-primary">Details</button>
                                   
                                   <button className="btn btn-sm btn-outline-danger" onClick={() => getFavorite(vhc)}><i className={ store.favorites.includes(vhc.name) ? "fa-solid fa-heart text-danger" : "fa-regular fa-heart text-danger" } ></i></button>
                          </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
        </div>
    )
}