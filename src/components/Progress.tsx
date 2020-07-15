import React from "react";

import "./Progress.scss";

export interface Progress {
  category: string;
  total: number;
  completed: number;
}

export interface Props {
  progress: Progress[];
}

const ProgressContainer = (props: Props) => {
  return (
    <div style={{ marginBottom: "50px" }}>
      {props.progress.map((progress) => (
        <div>
          <strong>{progress.category}: </strong>
          {progress.completed}/{progress.total}
          <div className="progress">
            <div
              className="bar"
              style={{
                width: `${
                  (progress.completed / progress.total) * 100
                  }%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressContainer;
