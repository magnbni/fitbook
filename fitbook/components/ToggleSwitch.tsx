"use client";
import React, { useState } from "react";
import "./ToggleSwitch.css";

type Props = {
  activated?: boolean;
  onActivate: () => void;
  onDisable: () => void;
};

const ToggleSwitch = ({ activated, onActivate, onDisable }: Props) => {
  const [checked, setChecked] = useState(activated ? activated : false);

  const turnOn = () => {
    setChecked(!checked);
    onActivate();
  };

  const turnOff = () => {
    setChecked(!checked);
    onDisable();
  };

  return (
    <div>
      <label className="switch">
        {checked ? (
          <input onClick={turnOff} type="checkbox" defaultChecked />
        ) : (
          <input onClick={turnOn} type="checkbox" />
        )}
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
