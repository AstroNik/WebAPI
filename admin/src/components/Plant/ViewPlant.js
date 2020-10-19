import React, {Component} from "react";
import {connect} from "react-redux";
import {getPlantData} from "../../store/Actions/PlantAction";
import {Card} from "react-bootstrap";
import {Redirect} from "react-router-dom";

/*
Code Written By
Nikhil Kapadia
991495131
*/

class ViewPlants extends Component {
    state = {
        plantName: "",
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.getPlantData(this.state)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.plant !== this.props.plant) {
            this.setState({
                plant: this.props.plant
            })
        }
    }

    render() {
        const {auth, plant} = this.props
        if (!auth.uid) {
            return <Redirect to='/signin'/>
        }

        return (
            <div className="page-containers">
                <Card className="col-lg-9 col-md-9 col-sm-10 col-10 mx-auto" style={{backgroundColor:"rgb(219, 219, 219)"}}>
                    <div>
                        <form noValidate autoComplete="off">
                            <h4 className="left-align">Find a Plant</h4>
                            <div className="row input-field">
                                <div className="input-field col s6 w-75">
                                    <input type="text" className="validate" id="plantName" onChange={this.handleChange}/>
                                    <label htmlFor="text">Plant Name</label>
                                </div>
                                <button type="submit" style={{backgroundColor: "#8c9e75"}} onClick={this.handleSubmit} className="right w-25 btn waves-effect waves-light">Find Plant</button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <div className="row">
                            <div className="col-6">
                                <span> Botanical Name - </span>
                                <span> {plant.botanicalName} </span>
                            </div>
                            <div className="col-6">
                                <span> Common Name(s) - </span>
                                <span> {plant.commonName} </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <span> Plant Type - </span>
                                <span> {plant.plantType} </span>
                            </div>
                            <div className="col-6">
                                <span> Mature Size - </span>
                                <span> {plant.matureSize} </span>
                            </div>
                        </div>

                        <hr/>
                        <h5> Care </h5>
                        <br/>

                        <div className="row">
                            <div className="col-6">
                                <span> Light Level - </span>
                                <span> {plant.care.lightLevel} </span>
                            </div>
                            <div className="col-6">
                                <span> Humidity - </span>
                                <span> {plant.care.humidity} </span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <span> Duration - </span>
                                <span> {plant.care.duration} </span>
                            </div>
                            <div className="col-6">
                                <span> Direction - </span>
                                <span> {plant.care.direction} </span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        plant: state.plant.plant
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantData: (data) => dispatch(getPlantData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPlants)
