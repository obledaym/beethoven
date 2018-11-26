import React, { Component } from 'react';
import '../../../App.css';
import {connect} from 'react-redux'

import {InputGroup, InputGroupAddon, InputGroupText, Input, Button, Label} from 'reactstrap'
import { Container, Col, Row, Table } from 'reactstrap';

import {MdMessage} from 'react-icons/md'
import {FaTrash} from 'react-icons/fa'

import {getMessagesList, addMessage, deleteMessage} from '../../../actions'
class AdminImagesContent extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      title : "",
      text : ""
    }

  }
  componentWillMount()
  {
    const {getMessagesList} = this.props;
    getMessagesList();

  }



   _handleImageChange(e) {
     e.preventDefault();

     let reader = new FileReader();
     let file = e.target.files[0];

     reader.onloadend = () => {
       this.setState({
         file: file,
         imagePreviewUrl: reader.result
       });
     }

     reader.readAsDataURL(file)
   }


  render() {
    const {sessionId, username, messages} = this.props

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }



    return(
      <div
        className ="AdminPanel"
        >
        {sessionId!== null && username !== null ?

          <Container fluid>
            <Row >
              <Col xs='12'>  <br></br>

                <h2>Interface Admin - Gestion des Images</h2>
                <br></br>
              </Col>
            </Row>

            <Row>

            </Row>
            <Row >
              <Col xs={{size:12}} lg={{size:6, offset:3}}>
              <div className="previewComponent">
                <form>

                <input className="fileInput"
                type="file"
                onChange={(e)=>this._handleImageChange(e)} />

                <Button
                  style={{marginRight : '5px'}}
                  onClick = {()=>{

                    //addMessage(this.state.title, this.state.text)

                  }}
                  >
                  Envoyer
                </Button>
                </form>
              </div>
              </Col>
            </Row>
        </Container>
          :""

        }
      </div>
    )
  }
}

let mapStateToProps = (state)=>{
  return{
    //MyVar : state.location.MyVar || defaultValue
    sessionId : state.cas.sessionId || null,
    username : state.cas.username || null,
    messages : state.webTV.messages || null,
  };
}


let mapDispatchToProps = (dispatch)=>{
  return{
    //myfunction : ()=> dispatch(myfunction())
    getMessagesList : ()=>dispatch(getMessagesList()),
    addMessage : (title, text)=>dispatch(addMessage(title, text)),
    deleteMessage : (idMessage)=>dispatch(deleteMessage(idMessage))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(AdminImagesContent);
