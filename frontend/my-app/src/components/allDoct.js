import React, { Component } from 'react'
import "antd/dist/antd.css";
import { List, Card } from "antd";
import axios, * as others from 'axios';
import { Typography } from 'antd';
import { Button } from 'antd';

const { Title } = Typography;



class Doctors extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          doctor:'',
          

         }
        this.onPress = this.onPress.bind(this)

    }

    componentDidMount(){
      console.log("inside component didmount")
      axios.get('http://localhost:3001/display/doctors')
      
      .then(response=>{
        if(response.data.status === 200){
          console.log(response.data.result)
          this.setState({
            doctor: response.data.result 
          })
        }
      })
    }
    componentWillMount(){
      console.log("inside component willmount")
    }
    onPress(data){
      console.log(data)
      this.props.history.push({
        
        pathname: '/Details',
        state:{
          data: data
        }
      })
    }
    render() { 
        return (
            <div>
            <Title>List of all doctors</Title>
            <List
    grid={{
      gutter: 16,
      sm: 3,
      
    }}
    dataSource={this.state.doctor}
    
    renderItem={item => (
      <List.Item>
        <Card title={item.id} ><b>Doctor Name:</b> {item.first_name} {item.last_name} <b><br></br><br></br>Email ID: </b>{item.email}<br></br> <br></br><Button type="primary" icon="search" onClick={()=>this.onPress(item.id)}>
      Details
    </Button></Card>
        
      </List.Item>
    )}
  />
  </div>
  
  
         );
    }
}
 
export default Doctors;