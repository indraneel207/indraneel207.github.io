import React from "react";
import "./Progress.scss";
import CodersRankSkillsChart from "@codersrank/skills-chart";
import {illustration, techStack} from "../../portfolio";
import {Fade} from "react-reveal";
import Build from "../../assets/lottie/proficiency_logo.json";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";

export default function StackProgress() {
  if (!window.customElements.get("codersrank-skills-chart")) {
    window.customElements.define(
      "codersrank-skills-chart",
      CodersRankSkillsChart
    );
  }

  if (techStack.viewSkillBars) {
    return (
      <Fade bottom duration={1000} distance="20px">
        <div className="skills-container">
          <div className="skills-bar">
            <h1 className="skills-heading">
              Wizardry Stats
              <img
                width="50"
                src="https://raw.githubusercontent.com/heydrdev/devtools/main/emojis/telegram/hatching-chick.gif"
                alt="owl emoji"
                style={{marginLeft: "10px"}}
              />
            </h1>
            <codersrank-skills-chart
              username="indraneel207"
              labels
              legend
              tooltip
              sort-by-score
            />
          </div>

          <div className="skills-image">
            {illustration.animated ? (
              <DisplayLottie animationData={Build} />
            ) : (
              <img
                alt="Skills"
                src={require("../../assets/images/skill.svg")}
              />
            )}
          </div>
        </div>
      </Fade>
    );
  }
  return null;
}
