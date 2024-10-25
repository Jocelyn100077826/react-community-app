'use client'
import * as React from 'react'
import Image from 'next/image'
//MUI libraries
import { Typography,Grid2,Box,TextField } from "@mui/material";
//Other
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/redux/store';

export default function Page({ params }:any) {
  const { owner,repo } = React.use<any>(params)

  return (
    <Typography sx={{textAlign:'center'}}>{owner}</Typography>
  )
}