import React from "react";
import ReactDOM from "react-dom";
import GithubRepoCard from "./GithubRepoCard";

jest.mock("react-reveal", () => ({Fade: ({children}) => children}));

it.each([
  [{stargazerCount: 7}, "7"],
  [{stargazerCount: 0, stargazers: {totalCount: 8}}, "0"],
  [{stargazers: {totalCount: 8}}, "8"]
])(
  "displays the star count from new and cached profiles: %j",
  (stars, count) => {
    const container = document.createElement("div");
    const repo = {
      node: {
        id: "test-repo",
        name: "Test project",
        url: "https://github.com/example/project",
        forkCount: 0,
        diskUsage: 100,
        primaryLanguage: null,
        ...stars
      }
    };

    ReactDOM.render(<GithubRepoCard repo={repo} isDark={false} />, container);

    expect(
      container.querySelector(".repo-left-stat > span:last-child p").textContent
    ).toBe(count);

    ReactDOM.unmountComponentAtNode(container);
  }
);
