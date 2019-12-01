import React, { Component } from 'react';
import {Form, Card, Row, Col, Button, Container} from 'react-bootstrap';
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      firstname: "",
      lastname: "",
      studentid: "",
      collegename: "",
      email: "",
      phone: "",
      track:"",
      base64: {},
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidUpdate(){
    console.log(this.state);
  }
  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleFileChange(e){
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        base64: reader.result
      });
    };
  }
  onSubmit(e){
    e.preventDefault();
    let data = {"email": this.state.email, "firstName": this.state.firstname, "lastName": this.state.lastname, "collegeId": this.state.studentid, "collegeName": this.state.collegename, "contactNumber": this.state.phone, "track": this.state.track, "image":(this.state.base64).split(",")[1]}
    console.log(data);
    axios.post('http://13.71.4.239:10013/', {headers:{
            'Content-Type': 'application/json'
        }}, JSON.stringify(data))
    .then(rslt=>{
      console.log(rslt);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  render() {
    return (
      <Container>
        <Card style={{ marginTop: "90px", marginLeft: "auto", marginRight: "auto", maxWidth: "800px"}}>
          <Card.Header style={{backgroundColor: "#59b3c4"}}><h5 style={{color: "white"}}>Your Info</h5></Card.Header>
          <Card.Body>
          <Form encType="multipart/form-data" onSubmit={this.onSubmit}>
            <Row style={{marginBottom: "20px"}}>
              <Col md="6">
                <Form.Control id="firstname" placeholder="First name" value={this.state.firstname} onChange={this.handleChange}/>
              </Col>
              <Col md="6">
                <Form.Control id="lastname" placeholder="Last name" value={this.state.lastname} onChange={this.handleChange}/>
              </Col>
            </Row>
            <Row style={{marginBottom: "20px"}}>
              <Col md="6">
                <Form.Control id="studentid" placeholder="Student ID" value={this.state.studentid} onChange={this.handleChange}/>
              </Col>
              <Col md="6">
                <Form.Control id="collegename" placeholder="College Name" value={this.state.collegename} onChange={this.handleChange}/>
              </Col>
            </Row>
            <Row style={{marginBottom: "20px"}}>
              <Col md="6">
                <Form.Control id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
              </Col>
              <Col md="6">
                <Form.Control id="phone" placeholder="Phone Number" value={this.state.phone} onChange={this.handleChange}/>
              </Col>
            </Row>
            <Row style={{marginBottom: "20px"}}>
              <Col md="6">
                <Form.Control id="track" as="select" onChange={this.handleChange}>
                  <option default>Select Track</option>
                  <option value="Java & MySQL">Java & MySQL</option>
                  <option value="Node & Mongo DB">Node & Mongo DB</option>
                  <option value="Frontend - React">Frontend - React</option>
                  <option value="Python">Python & ML</option>
                </Form.Control>
              </Col>
              <Col md="6">
                <Form.Control id="file" type="file" onChange={this.handleFileChange}/>
              </Col>
            </Row>
            <Row style={{marginBottom: "20px"}}>
              <Col md={12}>
                <Button type="submit" variant="outline-info" block>Submit</Button>
              </Col>
            </Row>
          </Form>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

