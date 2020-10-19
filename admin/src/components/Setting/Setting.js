import React, {Component} from "react";
import {Button} from "@material-ui/core";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {updateUserData} from "../../store/Actions/AuthActions";
import {Modal} from "react-bootstrap";

/*
Code Written By
Nikhil Kapadia
991495131
*/

class Setting extends Component {
    state = {
        email: this.props.user.email,
        newPassword: "",
        oldPassword: "",
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        devices: [],
        modalShow: false,
        modalShown: false,
        modalShow2: false,
    }


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        if (this.state.modalShown === false) {
            this.setState({modalShow: true})
            this.setState({modalShown: true})
        }
        if (this.state.modalShow === true && this.state.modalShown === true) {
            this.props.updateUserData(this.state)
            this.setState({modalShow: false})
            this.setState({modalShown: false})
            this.setState({newPassword: ""})
            this.setState({modalShow2: true})
        }
    }

    render() {
        const {auth} = this.props

        if (!auth.uid) {
            return <Redirect to='/signin'/>
        }
        return (
            <div className="page-containers">
                <div className="card z-depth-0 w-75 ml-auto mr-auto mt-3 h-auto" style={{backgroundColor:"rgb(219, 219, 219)"}}>
                    <div className="pl-3 pr-3 pb-3">
                        <h4> Settings </h4>
                        <form>
                            <input style={{borderBottom:"1px solid #8c9e75"}} type="email" id="email" value={this.state.email} onChange={this.handleChange}/>
                            <label style={{color:"#8c9e75"}}> Email</label>
                            <input style={{borderBottom:"1px solid #8c9e75"}} type="password" id="newPassword" onChange={this.handleChange}/>
                            <label style={{color:"#8c9e75"}}> Password </label>
                            <input style={{borderBottom:"1px solid #8c9e75"}} type="text" id="firstName" value={this.state.firstName}
                                   onChange={this.handleChange}/>
                            <label style={{color:"#8c9e75"}}> First Name</label>
                            <input style={{borderBottom:"1px solid #8c9e75", }} type="text" id="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                            <label style={{color:"#8c9e75"}} > Last Name </label>

                            <Button style={{backgroundColor:"#8c9e75"}} className="right" variant="contained" color="primary"
                                    onClick={this.handleSubmit}>
                                Save Changes
                            </Button>
                        </form>
                    </div>
                </div>
                <Modal
                    show={this.state.modalShow}
                    onBackdropClick={() => {
                        this.setState({modalShow: false})
                        this.setState({modalShown: false})
                    }}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    style={{backgroundColor: "transparent", width: "100%", height: "100%", maxHeight: "100%"}}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Re-Authenticate
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Password</h5>
                        <input type="password" id="oldPassword" onChange={this.handleChange}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({modalShow: false})}>Close</Button>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={this.state.modalShow2}
                    onBackdropClick={() => {
                        this.setState({modalShow2: false})
                    }}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    style={{backgroundColor: "transparent", width: "100%", height: "100%", maxHeight: "100%"}}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Sign Out in Progress
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p> You will be signed out shortly </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({modalShow2: false})}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        user: state.auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserData: (user) => dispatch(updateUserData(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Setting)
