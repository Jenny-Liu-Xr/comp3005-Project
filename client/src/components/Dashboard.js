import * as React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, BarElement, Title, CategoryScale } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import {Grid, Box} from "@mui/material";
import {useEffect, useState} from "react";

ChartJS.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend
);

const bgColors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
];

const borderColors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
]

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sales Per Author',
    },
  },
};

const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sales Per Genres',
    },
  },
};

function Dashboard() {
  const [data, setData] = useState();

  const genreData = {
    labels: data && data.genres.map(item => item.genre),
    datasets: [
      {
        label: 'sales of genre',
        data: data && data.genres.map(item => item.totalAmount),
        backgroundColor: bgColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const authorData = {
    labels: data && data.authors.map(item => item.author),
    datasets: [
      {
        label: 'sales of author',
        data: data && data.authors.map(item => item.totalAmount),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  };

  useEffect(() => {
    fetch("http://localhost:3001/orders/dashboard", {
      method: 'POST'
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  return (
    <Grid height="100%">
      {
        data && (
          <>
            <Grid display="flex" mb={5} justifyContent="center">
              <Box mr={3} style={{border: '1px solid #333', padding: '15px 20px', borderRadius: 10}}>
                <div style={{fontSize: 25}}>Total sales</div>
                <div style={{textAlign: 'center', marginTop: 15}}>${data.totalAmount}</div>
              </Box>
              <Box style={{border: '1px solid #333', padding: '15px 20px', borderRadius: 10}}>
                <div style={{fontSize: 25}}>Total quantity</div>
                <div style={{textAlign: 'center', marginTop: 15}}>{data.totalQuantity}</div>
              </Box>
            </Grid>
            <Grid display="flex">
              <Box width="50%">
                <div style={{width: '80%', textAlign: 'center'}}>
                  <Pie data={genreData} options={options1} />
                </div>
              </Box>
              <Box width="50%">
                <Bar options={options} data={authorData} />
              </Box>
            </Grid>
          </>
        )
      }
    </Grid>
  )
}

export default Dashboard;