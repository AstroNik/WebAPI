import React, {Component} from "react";
import {connect} from "react-redux";
import {getPlantData} from "../../store/Actions/PlantAction";
import {Card, Row} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {Button, TextField} from '@material-ui/core';

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
            <Card className="col-lg-9 col-md-9 col-sm-10 col-10 mx-auto">
                <div>

                    <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        <h4 className="left-align">Find a Plant</h4>
                        <Row className="input-field justify-content-between">
                            <TextField fullWidth InputProps={{disableUnderline: true}} id="plantName" label="Plant Name"
                                       onChange={this.handleChange}/>
                            <Button variant="contained" color="primary">
                                Find
                            </Button>
                        </Row>
                    </form>
                </div>
                <div>
                    <h5> Botanical Name - </h5> <h5> {plant.botanicalName} </h5>
                    <h5> Common Name(s) - </h5> <h5> {plant.commonName} </h5>
                    <h5> Plant Type - </h5> <h5> {plant.plantType} </h5>
                    <h5> Mature Size - </h5> <h5> {plant.matureSize} </h5>
                    <hr/>
                    <h4> Care </h4>
                    <h5> Light Level - </h5> <h5> {plant.care.lightLevel} </h5>
                    <h5> Humidity - </h5> <h5> {plant.care.humidity} </h5>
                    <h5> Duration - </h5> <h5> {plant.care.duration} </h5>
                    <h5> Direction - </h5> <h5> {plant.care.direction} </h5>
                </div>
            </Card>
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
