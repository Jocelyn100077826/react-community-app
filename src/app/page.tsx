'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import RepoBox from "@/app/components/RepoBox";
import {Repository} from "@/app/interfaces/Repo";
//MUI libraries
import { Typography,Grid2,Box,TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
//Other
import _ from "lodash";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/redux/store';
import { fetchReposRequest } from '@/app/redux/slices/reposSlice';
import { setCurrentRepo } from '@/app/redux/slices/repoSlice';
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch();
  const { loading, repos, error } = useSelector((state: RootState) => state.repos);

  useEffect(() => {
    dispatch(fetchReposRequest());
  }, [dispatch]);

  const handleOnSelectRepo = (repo:Repository)=>{
    dispatch(setCurrentRepo(repo));
    router?.push('/repo/'+repo.name)
  }

  return (
    <Grid2 container spacing={2} justifyContent={'center'}>
      <Grid2 size={{ xs: 12, md: 8 }}>
          <Box sx={{bgcolor:'background.paper',borderColor: 'primary.contrastText'}}>
            <Typography sx={{textAlign:'center'}}>React Community</Typography>
          </Box>
          <Typography>Recently Viewed</Typography>
          <Typography>Repositories</Typography>
      </Grid2>
      <Grid2 container size={12} justifyContent={'center'} direction={{xs: 'column-reverse', md: 'row'}}>
        <Grid2 container size={{ xs: 12, md: 6 }}>
          <Grid2 size={10}>
            <TextField id="outlined-basic" placeholder="Search by name, tag" variant="outlined" size="small" className="textinput-long" 
            sx={{bgcolor:'background.paper',borderColor: 'primary.contrastText',marginBottom:1}}
            slotProps={{
              input: {
                startAdornment: <SearchIcon fontSize="small"/>,
              },
            }}/>
          </Grid2>
          <Grid2 size={12}>
            {loading?
              <Typography>Loading</Typography>
              : error?
              <Typography>Error: {error}</Typography>
              :
              <Box className="infinite-table" sx={{borderColor: 'primary.contrastText'}}>
                {
                  _.map(repos,(v:Repository,i:number)=>(
                    <RepoBox key={i} repo={v} handleOnSelectRepo={handleOnSelectRepo}/>
                  ))
                }
              </Box>
            }
          </Grid2>
        </Grid2>
        
        <Grid2 size={{ xs: 12, md: 2 }}>
            <Box className="sort-box" sx={{bgcolor:'background.paper',borderColor: 'primary.contrastText',position:'sticky',top:10}}>
              <Typography>Sort</Typography>
            </Box>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
