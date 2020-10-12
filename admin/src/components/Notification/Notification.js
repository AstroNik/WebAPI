import React, {Component} from "react";
import {updateNotification} from "../../store/Actions/NotificationActions";
import {connect} from "react-redux";
import {toast} from 'react-toastify';
import moment from "moment";

/*
Code Written By
Nikhil Kapadia
991495131
*/

class Notifications extends Component {
    state = {
        toastId: []
    }


    componentDidMount() {
        const {notification, devices} = this.props
        notification && notification.map((notif, index) => {
            if (notif !== null) {
                devices && devices.map((device) => {
                    if (notif.deviceId == device.Key) {
                        toast.success(<div><p
                            style={{marginBottom: "0px"}}>{device.Value} {notif.content} </p>{moment(notif.dateTime).local().format("lll").toString()}
                        </div>, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            onClose: () => {
                                this.props.updateNotification(notif.deviceId, index)
                            },
                            onClick: () => {
                                this.props.updateNotification(notif.deviceId, index)
                            },
                            toastId: index,
                        })
                    }
                    return (<></>)
                })
                this.state.toastId.push(index);
            }
            return (<></>)
        })
    }

    componentWillUnmount() {
        this.state.toastId && this.state.toastId.map((id) => {
            toast.dismiss(id)
            return (<></>)
        })
    }


    render() {
        return (
            <></>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNotification: (id, index) => dispatch(updateNotification(id, index))
    }
}

export default connect(null, mapDispatchToProps)(Notifications)
