import React, { useEffect, useState, useRef } from "react";
import { Paper, makeStyles } from "@material-ui/core";
import { Typography } from "@mui/material";
import Chart from "chart.js/auto";
import { Box, Container, Grid } from "@mui/material";
import { theme } from "../../assets/Colors";
import Drawer from "../../components/Admin/Drawer";

import {
  getMonthlyRevenue,
  getYearlyRevenue,
  getFutureRevenue,
} from "../../services/revenueServices";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  chartContainer: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const RevenueChart = () => {
  const classes = useStyles();
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [yearlyRevenue, setYearlyRevenue] = useState([]);
  const [futureRevenue, setFutureRevenue] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchRevenue = async () => {
      const monthly = await getMonthlyRevenue();
      const yearly = await getYearlyRevenue();
      const future = await getFutureRevenue();
      setMonthlyRevenue(monthly.revenue);
      setYearlyRevenue(yearly.revenue);
      setFutureRevenue(future);
    };
    fetchRevenue();
  }, []);

  useEffect(() => {
    if (futureRevenue.length > 0) {
      const futureRevenueData = {
        labels: futureRevenue.map((item) => new Date(item.ds).getDate()),
        datasets: [
          {
            label: "Predicted Revenue",
            data: futureRevenue.map((item) => item.yhat),
            fill: false,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
          },
        ],
      };

      const renderChart = () => {
        console.log("Rendering chart...");
        const ctx = document.getElementById("revenueChart").getContext("2d");
        if (chartRef.current) {
          chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx, {
          type: "line",
          data: futureRevenueData,
          options: {
            scales: {
              x: {
                type: "category",
              },
            },
          },
        });
      };

      renderChart();
    }
  }, [futureRevenue]);

  const totalPredictedRevenue = futureRevenue.reduce(
    (acc, item) => acc + item.yhat,
    0
  );

  return (
    <Grid
      container
      sx={{
        bgcolor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        height: "115vh",
      }}
    >
      <Grid lg={2}>
        {" "}
        <Drawer />
      </Grid>
      <Grid lg={9}>
        {" "}
        <div className={classes.root}>
          <Box sx={{ ml: 4 }}>
            <Typography variant="h4">Revenue Prediction</Typography>
            <Paper display="inline" className="p-2">
              <Typography variant="h6" display="inline">
                Monthly Revenue:&nbsp;
              </Typography>
              <Typography display="inline" variant="h5">
                {monthlyRevenue}
              </Typography>
            </Paper>
            <Paper display="inline" className="p-2">
              <Typography variant="h6" display="inline">
                Yearly Revenue:&nbsp;
              </Typography>
              <Typography display="inline" variant="h5">
                {yearlyRevenue}
              </Typography>
            </Paper>
            <Paper className="p-2">
              <Typography variant="h6" display="inline">
                Predicted Future Revenue:&nbsp;
              </Typography>
              <Typography display="inline" variant="h5">
                {totalPredictedRevenue.toFixed(2)}
              </Typography>
            </Paper>
            <Paper className={classes.chartContainer}>
              <canvas id="revenueChart" />
            </Paper>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default RevenueChart;
