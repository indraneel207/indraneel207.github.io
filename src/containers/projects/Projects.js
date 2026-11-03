import React, {useState, useEffect, useContext, Suspense, lazy} from "react";
import "./Project.scss";
import Button from "../../components/button/Button";
import {openSource, socialMediaLinks} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import Loading from "../../containers/loading/Loading";

const GithubRepoCard = lazy(() =>
  import("../../components/githubRepoCard/GithubRepoCard")
);

export default function Projects() {
  const FailedLoading = () => null;
  const renderLoader = () => <Loading />;
  const [repo, setrepo] = useState([]);
  // todo: remove useContex because is not supported
  const {isDark} = useContext(StyleContext);

  useEffect(() => {
    const getRepoData = () => {
      fetch("/profile.json")
        .then(result => {
          if (result.ok) {
            return result.json();
          }
          throw result;
        })
        .then(response => {
          const edges = response?.data?.user?.pinnedItems?.edges;
          if (!Array.isArray(edges)) {
            throw new Error("profile.json contains no pinned repository data.");
          }
          setrepoFunction(edges.filter(edge => edge?.node?.id));
        })
        .catch(function (error) {
          console.error(
            `${error} (because of this error, nothing is shown in place of Projects section. Also check if Projects section has been configured)`
          );
          setrepoFunction("Error");
        });
    };
    getRepoData();
  }, []);

  function setrepoFunction(array) {
    setrepo(array);
  }
  if (Array.isArray(repo) && repo.length > 0 && openSource.display) {
    return (
      <Suspense fallback={renderLoader()}>
        <div className="main" id="opensource">
          <h1 className="project-title">
            Open Source Projects
            <img
              width="50"
              src="https://raw.githubusercontent.com/heydrdev/devtools/main/emojis/telegram/clinking-glasses.gif"
              alt="education emoji"
              style={{marginLeft: "10px"}}
            />
          </h1>
          <div className="repo-cards-div-main">
            {repo.map(v => (
              <GithubRepoCard repo={v} key={v.node.id} isDark={isDark} />
            ))}
          </div>
          <Button
            text={"More Projects"}
            className="project-button"
            href={socialMediaLinks.github}
            newTab={true}
          />
        </div>
      </Suspense>
    );
  } else {
    return <FailedLoading />;
  }
}
