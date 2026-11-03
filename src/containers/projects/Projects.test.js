import React from "react";
import ReactDOM from "react-dom";
import {act} from "react-dom/test-utils";
import Projects from "./Projects";
import {StyleProvider} from "../../contexts/StyleContext";

jest.mock("../../portfolio", () => ({
  openSource: {display: true},
  socialMediaLinks: {github: "https://github.com/indraneel207"}
}));

jest.mock("../../components/githubRepoCard/GithubRepoCard", () => ({repo}) => (
  <div data-repository-id={repo.node.id}>{repo.node.name}</div>
));

jest.mock("../loading/Loading", () => () => <div>Loading projects</div>);

let container;
const originalFetch = global.fetch;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  act(() => {
    ReactDOM.unmountComponentAtNode(container);
  });
  container.remove();
  global.fetch = originalFetch;
  jest.restoreAllMocks();
});

async function renderProfile(profile) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => profile
  });

  await act(async () => {
    ReactDOM.render(
      <StyleProvider value={{isDark: false}}>
        <h1>My portfolio</h1>
        <Projects />
      </StyleProvider>,
      container
    );
  });
  // Flush the lazy card import after the snapshot has updated Projects.
  await act(async () => {});
}

it("renders valid snapshot entries when other pinned entries are incomplete", async () => {
  await renderProfile({
    data: {
      user: {
        pinnedItems: {
          edges: [
            {node: {id: "first", name: "First project"}},
            {node: null},
            null,
            {},
            {node: {}},
            {node: {id: "second", name: "Second project"}}
          ]
        }
      }
    }
  });

  expect(container.querySelectorAll("[data-repository-id]")).toHaveLength(2);
  expect(container.textContent).toContain("First project");
  expect(container.textContent).toContain("Second project");
  expect(container.textContent).toContain("My portfolio");
});

it("keeps the portfolio visible when the snapshot has no usable repository entries", async () => {
  await renderProfile({
    data: {
      user: {
        pinnedItems: {edges: Array.from({length: 6}, () => ({node: null}))}
      }
    },
    errors: [
      {type: "FORBIDDEN", message: "Resource not accessible by integration"}
    ]
  });

  expect(container.textContent).toBe("My portfolio");
  expect(container.querySelector("#opensource")).toBeNull();
});

it("renders the repositories in the saved profile snapshot", async () => {
  const snapshot = require("../../../public/profile.json");
  await renderProfile(snapshot);

  const repositories = snapshot.data.user.pinnedItems.edges;
  expect(container.querySelectorAll("[data-repository-id]")).toHaveLength(
    repositories.length
  );
  repositories.forEach(({node}) => {
    expect(container.textContent).toContain(node.name);
  });
  expect(global.fetch).toHaveBeenCalledWith("/profile.json");
});

it.each([
  {data: {user: null}},
  {errors: [{message: "Profile unavailable"}]},
  {data: {user: {pinnedItems: {edges: null}}}}
])(
  "keeps the portfolio visible when repository data is missing: %j",
  async profile => {
    const errorLog = jest.spyOn(console, "error").mockImplementation(() => {});
    await renderProfile(profile);

    expect(container.textContent).toBe("My portfolio");
    expect(errorLog).toHaveBeenCalled();
  }
);
