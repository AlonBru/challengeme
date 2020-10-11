import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Charts from "./charts/Charts";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios';
import ThemeApi from "../services/Theme"
import '../pages/Home.css'
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  grid: {
    display: "grid",
    gridGap: "40px",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: "10px",
    height: "inherit",
    width: "inherit",
    gridTemplate: `
    'header header' 5vh
      'headChart topChart' 300px 
      'bottomChart bottomChart' 300px`,
  },
  divLight: {
    textAlign: "center",
    alignContent: "center",
    padding: "20px",
    fontWeight: "bold",
    backgroundImage: "radial-gradient(circle, #9C8249, #F5D690)",
    boxShadow: "15px 15px 0px #AD8C40",
  },
  divDark: {
    textAlign: "center",
    alignContent: "center",
    padding: "20px",
    fontWeight: "bold",
    backgroundImage: "radial-gradient(circle, #DCE5E8, #53676E)",
    boxShadow: "15px 15px 0px #696969",
  },
  main: {
    marginTop: "4rem",
    display: "grid",
    padding: "10px",
    alignContent: "center",
    justifyItems: "center",
    alignItems: "center",
    gridTemplateColumns: "auto",
    width: "100%",
  },
  span: {
    fontSize: "30px",
  },
}));



function StatisticsHome() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [loadingTeams, setLoadingTeams] = useState(true);

=======
>>>>>>> 5d9eb59e959298e7b2ca01d92ea0871e57ccf51d
  const [topChallengesData, setTopChallengesData] = useState([]);
  const [topUsersData, setTopUsersData] = useState([]);
  const [topTeamsData, setTopTeamsData] = useState([]);
  const darkMode = React.useContext(ThemeApi).darkTheme

  const challengeData = {
    labels: topChallengesData && topChallengesData.map(index => index.Challenge.name), // array of values for x axis (strings)
    title: "Top Rated Challenges", // title for the chart
    rawData: [
      {
        label: "Submitions", // name of the line (one or two words)
        backgroundColor: [
          "#e65a78",
          "#6698e8",
          "#6aa870",
          "#9e8662",
          "#b287c9",
          "#787878",
          "#afeddb",
          "#f79628",
        ],
        borderColor: "black",
        fill: false, // change the line chart
        data: topChallengesData && [...topChallengesData.map(index => index.countSub), 0], // array of values for Y axis (numbers)
      },
      // you can add as many object as you wand, each one will a different line with different color
    ],
  };
  const userData = {
    labels: topUsersData && topUsersData.map(index => index.User ? index.User.userName : 'Itay'), // array of values for x axis (strings)
    title: "Top Users", // title for the chart
    rawData: [
      {
        label: "Submitions", // name of the line (one or two words)
        backgroundColor: [
          "#e65a78",
          "#6698e8",
          "#6aa870",
          "#9e8662",
          "#b287c9",
          "#787878",
          "#afeddb",
          "#f79628",
        ],
        borderColor: "black",
        fill: false, // change the line chart
        data: topUsersData && [...topUsersData.map(index => index.countSub), 0], // array of values for Y axis (numbers)
      },
      // you can add as many object as you wand, each one will a different line with different color
    ],
  };
  const teamData = {
    labels: topTeamsData && topTeamsData.map(team => team.name), // array of values for x axis (strings)
    title: "Top Teams", // title for the chart
    rawData: [
      {
        label: "Submitions", // name of the line (one or two words)
        backgroundColor: [
          "#e65a78",
          "#6698e8",
          "#6aa870",
          "#9e8662",
          "#b287c9",
          "#787878",
          "#afeddb",
          "#f79628",
        ],
        borderColor: "black",
        fill: false, // change the line chart
        data: topTeamsData && [...topTeamsData.map(team => team.Users[0] && team["Users"][0]["Submissions"][0]["teamSuccessSubmissions"]), 0], // array of values for Y axis (numbers)
      },
      // you can add as many object as you wand, each one will a different line with different color
    ],
  };

  useEffect(() => {
   getChallengesData();
   getTeamsData();
   getUsersData();
  }, []);

  const getChallengesData = async () => {
    const { data: challengeInfo } = await axios.get('/api/v1/statistics/insights/top-challenges');
    setTopChallengesData(challengeInfo);
    setLoading(false);
  };
  const getTeamsData = async () => {
    const { data: teamsInfo } = await axios.get('/api/v1/statistics/teams/top');
    console.log(teamsInfo[0].Users[0].Submissions[0].teamSuccessSubmissions);
    setTopTeamsData(teamsInfo)
    setLoadingTeams(false);
  };
  const getUsersData = async () => {
    const { data: usersInfo } = await axios.get('/api/v1/statistics/users/top-users');
    setTopUsersData(usersInfo)
    setLoading(false);
    
  };

  console.log(topTeamsData);
  
  return (
    <div className={clsx(classes.main, darkMode?"dark-home-page":"light-home-page")}>
      <div className={classes.grid}>
      <h1 style={{gridArea: "header"}}>Statistics</h1>
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            id="firstChart"
            className={darkMode ? classes.divDark : classes.divLight}
            style={{ gridArea: "headChart"}}
          >
            <Charts
              name="topChallenges"
              width={"400px"}
              height={"200px"}
              chart={[0, 2]}
              data={challengeData}
            />
          </div>
        )}
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            className={darkMode ? classes.divDark : classes.divLight}
            style={{ gridArea: "topChart"}}
          >
            <Charts
              name="TopUsers"
              width={"450px"}
              height={"70px"}
              chart={[0, 2]}
              data={userData}
            />
          </div>
        )}
        {loadingTeams ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : (
          <div
            className={darkMode ? classes.divDark : classes.divLight}
            style={{ gridArea: "bottomChart"}}
          >
            <Charts
              name="topTeams"
              width={"450px"}
              height={"70px"}
              chart={[0, 1]}
              data={teamData}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatisticsHome;
