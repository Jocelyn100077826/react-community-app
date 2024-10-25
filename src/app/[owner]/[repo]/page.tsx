'use client'
import * as React from 'react'
import Image from 'next/image'
//MUI libraries
import { Typography,Grid2,Box,TextField } from "@mui/material";
//Other
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/redux/store';

export default function Page({ params }:any) {
  const { owner,repo  } = React.use<any>(params)
  const { currentRepo } = useSelector((state: RootState) => state.repo);
  
  if(!currentRepo){
    return(<Typography>Cannot find repo</Typography>)
  }
  return (
    <Grid2 container spacing={2} justifyContent={'center'}>
      <Grid2 size={{ xs: 12, md: 8 }}>
        <Box sx={{bgcolor:'background.paper',borderColor: 'primary.contrastText'}}>
          <Typography sx={{textAlign:'center'}}>{owner}</Typography>
          <Typography sx={{textAlign:'center'}}>{currentRepo.url}</Typography>
        </Box>
      </Grid2>
        <Grid2 container size={12} justifyContent={'center'}>
          <Grid2 container size={{ xs: 12, md: 6 }}>
            <Box>
              <Grid2 container>
                <Grid2 size={2}>
                  <Image
                    src={currentRepo.owner.avatar_url}
                    width={150}
                    height={150}
                    alt="Picture of the author"
                  />
                </Grid2>
                <Grid2 size={10}>
                  <Typography sx={{p:1}}>{currentRepo.owner.login}</Typography>
                </Grid2>
              </Grid2>
            </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 2 }}>
          <Box className="sort-box" sx={{bgcolor:'background.paper',borderColor: 'primary.contrastText',position:'sticky',top:10}}>
            <Typography sx={{textAlign:'center'}}>{currentRepo.description}</Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Grid2>
  )
  }