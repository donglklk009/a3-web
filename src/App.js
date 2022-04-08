import React from 'react';
import { Collapse, Button, Col, Row } from 'antd';
import './App.css';

import { useReactMediaRecorder } from "react-media-recorder";

const App = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ video: true });

  const sendHandControl = (d) => {
    console.info(d)
  }

  return (
    <Collapse defaultActiveKey={['1']}>
      <Collapse.Panel header="Hand control" key="1">
        <Button onClick={() => sendHandControl(1)} type="primary">LEFT</Button>
        <Button onClick={() => sendHandControl(2)} type="primary">RIGHT</Button>
        <Button onClick={() => sendHandControl(3)} type="primary">FORWARD</Button>
        <Button onClick={() => sendHandControl(4)} type="primary">BACKWARD</Button>
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