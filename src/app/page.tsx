'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import {Organization} from "@/app/interfaces/Organization";
import _ from "lodash";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/redux/store';
import {OrganisationCard} from '@/app/components/OrganizationCard'
//UI
import { Typography,Grid2,Box } from "@mui/material";



export default function Home() {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch();
  const { loading, orgs, error } = useSelector((state: RootState) => state.orgs);

  const handleOnSelectOrg = (org:Organization)=>{
    router?.push('/'+org.login)
  }

  return (
    <Grid2 container spacing={2} justifyContent={'center'}>
      <Grid2 size={{ xs: 12, md: 8, lg:6 }}>
          <Box sx={{bgcolor:'background.paper',p:2,display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Typography variant="h3" sx={{textAlign:'center'}}>Github Organisations</Typography>
          </Box>
      </Grid2>
      <Grid2 container size={12} justifyContent={'center'} direction={{xs: 'column-reverse', md: 'row'}}>
        <Grid2 container size={{ xs: 12, md: 8, lg:6 }}>
          <Grid2 size={10}>
            <Typography>Popular Organizations</Typography>
          </Grid2>
          {loading&&<Typography>Loading...</Typography>}
          {_.map(orgs,(o,i)=>(
            <OrganisationCard key={i} org={o} handleOnSelectOrg={handleOnSelectOrg}/>
          ))}
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

