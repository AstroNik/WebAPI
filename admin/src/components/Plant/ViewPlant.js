import React, {Component} from "react";
import {connect} from "react-redux";
import {getPlantData} from "../../store/Actions/PlantAction";
import {Redirect} from "react-router-dom";

class ViewPlants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plantName: '',
        }
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

    render() {
        const {auth, plant} = this.props
        if (!auth.uid) {
            return <Redirect to='/signin'/>
        }

        return (
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h4 className="center-align">Sign In</h4>

                        <div className="input-field col s6">
                            <input type="name" className="validate" id="plantName" onChange={this.handleChange}/>
                            <label htmlFor="plantName">Plant Name</label>
                        </div>
                        <button type="submit" className="btn waves-effect waves-light">Find</button>
                    </form>
                </div>
                <div>
                    <h3> Botanical Name - </h3> <h3> {plant.botanicalName} </h3>
                    <h3> Common Name - </h3> <h3> {plant.commonName} </h3>
                    <h3> Plant Type - </h3> <h3> {plant.plantType} </h3>
                    <h3> Mature Size - </h3> <h3> {plant.matureSize} </h3>
                    <h3> Light Level - </h3> <h3> {plant.care.lightLevel} </h3>
                    <h3> Humidity - </h3> <h3> {plant.care.humidity} </h3>
                    <h3> Duration - </h3> <h3> {plant.care.duration} </h3>
                    <h3> Direction - </h3> <h3> {plant.care.direction} </h3>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        plant: state.plant.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantData: () => dispatch(getPlantData())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewPlants)
