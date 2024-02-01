import React from "react";
import "./Education.scss";
import EducationCard from "../../components/educationCard/EducationCard";
import {educationInfo} from "../../portfolio";

export default function Education() {
  if (educationInfo.display) {
    return (
      <div className="education-section" id="education">
        <h1 className="education-heading">
          Education
          <img
            width="50"
            src="https://raw.githubusercontent.com/heydrdev/devtools/main/emojis/telegram/compass.gif"
            alt="education emoji"
            style={{marginLeft: "10px"}}
          />
        </h1>
        <div className="education-card-container">
          {educationInfo.schools.map((school, index) => (
            <EducationCard key={index} school={school} />
          ))}
        </div>
      </div>
    );
  }
  return null;
}
