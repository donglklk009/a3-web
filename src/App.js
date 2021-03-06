import React, { useState } from "react";
import { Collapse, Button, Col, Row, Slider } from "antd";
import "./App.css";
import axios from "axios";
import { useReactMediaRecorder } from "react-media-recorder";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  CaretRightOutlined,
  PauseOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const URL_A3_SERVICE = "http://192.168.1.4:8080";
const App = () => {
  const [speed, setSpeed] = useState(50);
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });
  const { transcript, resetTranscript } = useSpeechRecognition();

  const sendHandControl = (direction) => {
    console.info(direction);
    console.info(speed);
    sendSpeedControl(speed);
    axios
      .post(`${URL_A3_SERVICE}/hand`, {
        direction: direction,
      })
      .then((data) => {
        console.info(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sendSpeedControl = (speed) => {
    console.info(speed);
    axios
      .post(`${URL_A3_SERVICE}/speed`, {
        speed: speed,
      })
      .then((data) => {
        console.info(data);
      })
      .catch((error) => {
        console.info(error);
      });
  };

  return (
    <>
      <iframe
        title="Video Streaming"
        width={500}
        height={300}
        src="http://192.168.1.4:5000/"
      />
      <div>
        <Button onClick={() => sendHandControl(6)} type="primary">
          Cam left
          <VideoCameraOutlined />
        </Button>
        <Button onClick={() => sendHandControl(8)} type="primary"
        style={{
          margin: '0px 10px'
        }}
        >
          Cam straight
          <VideoCameraOutlined />
        </Button>
        <Button onClick={() => sendHandControl(7)} type="primary">
          Cam right
          <VideoCameraOutlined />
        </Button>
      </div>
      <Collapse defaultActiveKey={["1"]}>
        <Collapse.Panel header="Hand control" key="1">
          <Slider
            min={0}
            max={100}
            step={5}
            onAfterChange={(speed) => setSpeed(speed)}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onMouseDown={() => sendHandControl(3)}
              onMouseUp={() => sendHandControl(5)}
              type="primary"
              style={{
                transform: "rotate(180deg)",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CaretRightOutlined />
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0px 10px",
              }}
            >
              <Button
                onMouseDown={() => sendHandControl(1)}
                onMouseUp={() => sendHandControl(5)}
                type="primary"
                style={{
                  transform: "rotate(-90deg)",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CaretRightOutlined />
              </Button>
              <Button
                onClick={() => sendHandControl(5)}
                type="primary"
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px 0px",
                }}
              >
                <PauseOutlined />
              </Button>
              <Button
                onMouseDown={() => sendHandControl(2)}
                onMouseUp={() => sendHandControl(5)}
                type="primary"
                style={{
                  transform: "rotate(90deg)",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CaretRightOutlined />
              </Button>
            </div>

            <Button
              onMouseDown={() => sendHandControl(4)}
              onMouseUp={() => sendHandControl(5)}
              type="primary"
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CaretRightOutlined />
            </Button>
          </div>
        </Collapse.Panel>

        <Collapse.Panel header="Voice control" key="2">
          <Row>
            <Col span={8}>
              {
                // eslint-disable-next-line
                status == "recording" ? (
                  <Button
                    style={{ marginTop: "15px" }}
                    type="primary"
                    onClick={() => {
                      stopRecording();
                      SpeechRecognition.stopListening();
                      let signal = transcript?.toLowerCase();
                      console.info(signal);
                      if (
                        signal === "??i t???i" ||
                        signal === "ti???n" ||
                        signal === "??i th???ng" ||
                        signal === "up" ||
                        signal === "move forward"
                      ) {
                        sendHandControl(1);
                        setTimeout(() => sendHandControl(5), 1500);
                      } else if (
                        signal === "??i l??i" ||
                        signal === "l??i" ||
                        signal === "down" ||
                        signal === "reverse" ||
                        signal === "move backward"
                      ) {
                        sendHandControl(2);
                        setTimeout(() => sendHandControl(5), 1500);
                      } else if (
                        signal === "qu???o tr??i" ||
                        signal === "tr??i" ||
                        signal === "turn left"
                      ) {
                        sendHandControl(3);
                        setTimeout(() => sendHandControl(5), 450);
                      } else if (
                        signal === "qu???o ph???i" ||
                        signal === "ph???i" ||
                        signal === "turn right"
                      ) {
                        sendHandControl(4);
                        setTimeout(() => sendHandControl(5), 450);
                      } else {
                        console.info("Invalid words");
                      }
                    }}
                  >
                    Stop
                  </Button>
                ) : (
                  <Button
                    style={{ marginTop: "15px" }}
                    type="primary"
                    onClick={() => {
                      resetTranscript();
                      SpeechRecognition.startListening({ continuous: true });
                      startRecording();
                    }}
                  >
                    Record
                  </Button>
                )
              }
            </Col>
            <Col span={16}>
              <audio src={mediaBlobUrl} controls autoPlay />
            </Col>
          </Row>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};

export default App;
