import React, { Component } from 'react'
import "antd/dist/antd.css";
import { List, Card } from "antd";
import axios, * as others from 'axios';
import { Typography } from 'antd';
import {Jumbotron, ListGroup} from 'react-bootstrap'

import { Button } from 'antd';

const { Title } = Typography;
class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            Details:'',
            speciality:'',
            suggestion:''

        }  

    }
    componentDidMount(){

        console.log("inside component didmount")   

        axios.get('http://localhost:3001/details',{headers:{
            'id':this.props.location.state.data 

        }})
        .then(response=>{
            if(response.data.status === 200){
                console.log(response.data.result_1[0])
                this.setState({
                    Details: response.data.result[0],
                    speciality:response.data.result_1,
                    suggestion:response.data.result_2
                })

            }
        })
    
        

    }
      componentWillMount(){
        console.log("inside component willmount")
      }

      onPress(data){
        console.log(data)
        axios.get('http://localhost:3001/details',{headers:{
            'id':data 

        }})
        .then(response=>{
            if(response.data.status === 200){
                console.log(response.data.result_1[0])
                this.setState({
                    Details: response.data.result[0],
                    speciality:response.data.result_1,
                    suggestion:response.data.result_2
                })

            }
        })
        this.props.history.push({
          
          pathname: '/Details',
          state:{
            data: data
          }
        })

        window.location.reload()
      }

    render() { 
        var q = Object.values(this.state.speciality)
        let arr = []
        console.log(q)
        q.forEach(function (arrayItem) {
            var x = arrayItem.name
            arr.push(x);
        });
        console.log(arr)
        var special = arr.map(item=>{
            return (
                <div>{item}</div>

            )

        
        })
        return ( 
            <div>

<Jumbotron>
  <h1>Doctor Details</h1>
  <ListGroup>
  <ListGroup.Item><b>Doctor ID:</b>  {this.state.Details.id}</ListGroup.Item>
  <ListGroup.Item><b>First name:</b>  {this.state.Details.first_name}</ListGroup.Item>
  <ListGroup.Item><b>Last name:</b>  {this.state.Details.last_name}</ListGroup.Item>
  <ListGroup.Item><b>Gender:</b>  {this.state.Details.gender}</ListGroup.Item>
  <ListGroup.Item><b>Location:</b>  {this.state.Details.location}</ListGroup.Item>
  <ListGroup.Item><b>Email:</b>  {this.state.Details.email}</ListGroup.Item>
  <ListGroup.Item><b>Speciality:</b> {special}</ListGroup.Item>
  <ListGroup.Item><b>review score:</b>  {this.state.Details.review_score}</ListGroup.Item>

</ListGroup>

  
</Jumbotron>
<h1>List of Suggested doctors</h1>
<Jumbotron>
<List
    grid={{
      gutter: 16,
      sm: 3,
      column:1
      
    }}
    dataSource={this.state.suggestion}
    
    renderItem={item => (
      <List.Item>
        <Card title={item.id} ><b>Doctor Name:</b> {item.first_name} {item.last_name} <b><br></br><br></br>Email ID: </b>{item.email}<br></br> <br></br><Button type="primary" icon="search" onClick={()=>this.onPress(item.id)}>
      Details
    </Button></Card>
        
      </List.Item>
    )}
  />
  </Jumbotron>
            </div>
         );
    }
}
 
export default Details;