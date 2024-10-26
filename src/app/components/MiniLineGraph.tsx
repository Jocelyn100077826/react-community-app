'use client'
import React, { useState, useEffect } from "react";
import {Repository} from "@/app/interfaces/Repo";
//MUI
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts/LineChart';
//Other
import _ from "lodash";
import axios from 'axios';

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