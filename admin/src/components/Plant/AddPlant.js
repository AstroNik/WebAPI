import React, {Component} from 'react'
import './AddPlant.css'

class AddPlant extends Component{
    state= {
        title:'',
        content: ''
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
    }

    render(){
        return(
            <div id="addPlant" className="container">
                <form onSubmit={this.handleSubmit}>
                    <h3>Add Plant</h3>

                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" id="title" placeholder="Enter title" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <label>Content</label>
                        <textarea  className="materialize-textarea" id="content" placeholder="Enter content" onChange={this.handleChange}/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Create</button>
                </form>
            </div>
        )
    }
}

export default AddPlant;