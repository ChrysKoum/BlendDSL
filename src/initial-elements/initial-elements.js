/* Icons of the Nodes */
import { FaAutoprefixer } from "react-icons/fa";
import { MdOutlineSensors } from "react-icons/md";
import { GrAction } from "react-icons/gr";
import { FaLink } from "react-icons/fa6";

export const nodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      icon: <MdOutlineSensors />,
      title: "Sensor",
      subline: "Ambient Light",
    },
    type: "sensor",
  },
  {
    id: "2",
    position: { x: 0, y: 125 },
    data: {
      icon: <GrAction />,
      title: "Actuator",
      subline: "Humidifier",
    },
    type: "actuator",
  },
  {
    id: "3",
    position: { x: 0, y: 250 },
    data: {
      icon: <MdOutlineSensors />,
      title: "Sensor",
      subline: "Area Alarm",
    },
    type: "sensor",
  },
  {
    id: "4",
    position: { x: 0, y: 375 },
    data: {
      icon: <GrAction />,
      title: "Actuator",
      subline: "Light",
    },
    type: "actuator",
  },
  {
    id: "5",
    position: { x: 500, y: 175 },
    data: { icon: <FaLink />, title: "Brocker", subline: "MQTT" },
    type: "broker",
  },
  {
    id: "6",
    position: { x: 750, y: 0 },
    data: { icon: <FaAutoprefixer />, title: "Automation 1" },
    type: "automation",
  },
  {
    id: "7",
    position: { x: 1200, y: 125 },
    data: { icon: <FaAutoprefixer />, title: "Automation 2" },
    type: "automation",
  },
  {
    id: "8",
    position: { x: 1200, y: 0 },
    data: { icon: <FaAutoprefixer />, title: "Automation 3" },
    type: "automation",
  },
];

export const edges = [
  {
    id: "e1-5",
    source: "1",
    target: "5",
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
  },
  {
    id: "e2-5",
    source: "2",
    target: "5",
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
  },
  {
    id: "estart6-7",
    source: "6",
    target: "8",
    sourceHandle: "automation-start-source",
  },
  {
    id: "estop6-8",
    source: "6",
    target: "7",
    sourceHandle: "automation-stop-source",
  },
];
