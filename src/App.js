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

  console.info(status)

  return (
    <Collapse defaultActiveKey={['1']}>
      <Collapse.Panel header="Demo hand control" key="1">
        <Button type="primary">LEFT</Button>
        <Button type="primary">RIGHT</Button>
        <Button type="primary">FORWARD</Button>
        <Button type="primary">BACKWARD</Button>
      </Collapse.Panel>
      <Collapse.Panel header="Demo voice control" key="2">
        <Row>
          <Col span={8}>
            {
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