import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBarStatistics from "../components/NavBarStatistics";
import StatisticsHome from '../components/StatisticsHome';
import UserStatistics from '../components/UserStatistics';
import TeamStatistics from '../components/TeamStatistics';
import Insights from '../components/Insights';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileStatistics from '../components/ProfileStatistics';

const useStyles = makeStyles({
});
function Statistics() {
    const classes = useStyles()
    return (
        <Router>
            <Grid className={classes.root} container>
                <Grid xs={12}>
                    <NavBarStatistics />
                </Grid>
            <Switch>
                <Route exact path="/statistics" component={StatisticsHome}/>
                <Route path="/statistics/users" component={UserStatistics}/>
                <Route path="/statistics/teams" component={TeamStatistics} />
                <Route path="/statistics/insights" component={Insights} />
                <Route path="/statistics/profile" component={ProfileStatistics} />
            </Switch>
           </Grid>
        </Router>
       
            
        
    )
}

export default Statistics;