'use client'
import React from "react";
//UI
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import {
  LinePlot,
  lineElementClasses,
} from '@mui/x-charts/LineChart';

const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 9800, 3908, 4800, 3800, 4300];
const months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
  ];
  

export default function MiniLineGraph() {

    return (
        <ResponsiveChartContainer
          height={50}
          margin={{bottom:0,top:15,right:5,left:0}}
          series={[{ type: 'line', data: pData,curve:'linear' }]}
          xAxis={[{ scaleType: 'point', data: months }]}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              stroke: '#2b9840',
              strokeWidth: 2,
            },
          }}
          disableAxisListener
        >
          <LinePlot/>
        </ResponsiveChartContainer>
      );
    
  }