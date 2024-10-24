'use client'
import * as React from 'react'
import {Repository} from '@/app/interfaces/Repo';
import MiniLineGraph from '@/app/components/MiniLineGraph';
//MUI
import { Typography,Grid2,Box,Card,CardActionArea } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CircleIcon from '@mui/icons-material/Circle';

export default function RepoBox({repo,handleOnSelectRepo}:{repo:Repository,handleOnSelectRepo:Function}) {
    
    return (
        <Card key={repo.id} sx={{bgcolor:'background.paper',borderColor: 'primary.contrastText',borderRadius:0}} style={{borderBottomWidth:"1px"}}>
            <CardActionArea sx={{padding:1}} onClick={() => handleOnSelectRepo(repo)}>
                <Grid2 container spacing={2}>
                    <Grid2 size={9}>
                        <Box>
                            <Typography sx={{color:'primary.main'}}>{repo.name}</Typography>
                            <Typography sx={{color:'primary.light',lineHeight: 1.2,fontSize:"14px"}} noWrap={true}>{repo.description}</Typography>
                        </Box>
                    </Grid2>
                    <Grid2 size={3}>
                        <Box>
                            <MiniLineGraph url={repo.commits_url}/>
                        </Box>
                    </Grid2>
                    <Grid2 size={12}>
                        <Box className='flex-box-left'>
                            <CircleIcon fontSize='small'/>
                            <Typography variant='caption' sx={{paddingTop:"2px"}}>{repo.language}</Typography>
                            <StarBorderIcon fontSize='small' sx={{marginLeft:"10px"}}/>
                            <Typography variant='caption' sx={{paddingTop:"2px"}}>{repo.stargazers_count}</Typography>
                        </Box>
                    </Grid2>
                </Grid2>
            </CardActionArea>
        </Card>
    )
  }