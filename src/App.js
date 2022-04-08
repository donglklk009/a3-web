import React from 'react';
import { Collapse, Button, Col, Row, notification } from 'antd';
import './App.css';
import axios from 'axios';
import { useReactMediaRecorder } from "react-media-recorder";

const URL_A3_SERVICE = 'http://localhost:8080'
const App = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ video: true });

  const sendHandControl = (direction, speed) => {
    console.info(direction)
    axios.post(`${URL_A3_SERVICE}/hand`, {
      "direction": direction,
      "speed": speed
    }).then((data) => {
      notification.open({
        message: 'Notification Title',
        description: "ok"
      })
    }).catch((error) => {
      console.info(error)
    })
  }

  return (
    <Collapse defaultActiveKey={['1']}>
      <Collapse.Panel header="Hand control" key="1">
        <Button onClick={() => sendHandControl(1, 1)} type="primary">LEFT</Button>
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