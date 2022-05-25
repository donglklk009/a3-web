import React from 'react';
import { Collapse, Button, Col, Row,Slider, notification } from 'antd';
import './App.css';
import axios from 'axios';
import { useReactMediaRecorder } from "react-media-recorder";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const URL_A3_SERVICE = 'http://192.168.1.6:8080'
const App = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ video: true });

  const sendHandControl = (direction) => {
    console.info(direction)
    axios.post(`${URL_A3_SERVICE}/hand`, {
      "direction": 'direction',
      "speed": 'speed'
    }).then((data) => {
      console.open({
        message: direction,
        description: status
      })
    }).catch((error) => {
      console.info(error)
    })
  }

  const sendSpeedControl = (speed) => {
    console.info(speed)
    axios.post(`${URL_A3_SERVICE}/speed`, {
      "direction": 'direction',
      "speed": 'speed'
    }).then((data) => {
      console.open({
        message: 'direction',
        description: status
      })
    }).catch((error) => {
      console.info(error)
    })
  }


  return (
    <Collapse defaultActiveKey={['1']}>
      <Collapse.Panel header="Hand control" key="1">
        <Button onMouseDown={() => sendHandControl(1)} 
                type="primary"
                onMouseUp={() => sendHandControl(5)} > 
        LEFT
        </Button>
        <Button onClick={() => sendHandControl(2, 1)} type="primary">RIGHT</Button>
        <Button onClick={() => sendHandControl(3, 1)} type="primary">FORWARD</Button>
        <Button onClick={() => sendHandControl(4, 1)} type="primary">BACKWARD</Button>
      </Collapse.Panel>






      <Collapse.Panel header="Voice control" key="2">
        <Row>
          <Col span={8}>
            {
              // eslint-disable-next-line eqeqeq
              status == "recording"
                ? <Button style={{ marginTop: "15px" }} type="primary" onClick={stopRecording}>Stop</Button>
                : <Button style={{ marginTop: "15px" }} type="primary" onClick={startRecording}>Record</Button>
            }
          </Col>
          <Col span={16}>
            <audio src={mediaBlobUrl} controls autoPlay loop />
          </Col>
        </Row>
      </Collapse.Panel>
    </Collapse>
  )
}



export default App;