'use client'
import * as React from 'react'
import {Repository} from '@/app/interfaces/Repo';
import MiniLineGraph from '@/app/components/MiniLineGraph';
//MUI
import { Typography,Grid2,Box,Card,CardActionArea } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CircleIcon from '@mui/icons-material/Circle';

type SelectRepoHandler = (repo: Repository) => void;

export default function RepoBox({repo,handleOnSelectRepo}:{repo:Repository,handleOnSelectRepo:SelectRepoHandler}) {
    
    return (
        <Card key={repo.id} sx={{bgcolor:'background.paper',borderRadius:0}} style={{borderBottom:"1px solid rgba(0,0,0,0.15)"}}>
            <CardActionArea sx={{p:1}} onClick={() => handleOnSelectRepo(repo)}>
                <Grid2 container spacing={2}>
                    <Grid2 size={9}>
                        <Box>
                            <Typography sx={{color:'primary.main'}}>{repo.name}</Typography>
                            <Typography sx={{color:'primary.light',lineHeight: 1.2,fontSize:"14px"}} noWrap={true}>{repo.description}</Typography>
                        </Box>
                    </Grid2>
                    <Grid2 size={3}>
                        <Box>
                            <MiniLineGraph/>
                        </Box>
                    </Grid2>
                    <Grid2 size={12}>
                        <Box className='flex-box-left'>
                            <CircleIcon fontSize='small'/>
                            <Typography variant='caption' color='textSecondary' sx={{pt:"2px",pl:"5px"}}>{repo.language}</Typography>
                            <StarBorderIcon fontSize='small' sx={{marginLeft:"10px"}}/>
                            <Typography variant='caption' color='textSecondary' sx={{pt:"2px",pl:"5px"}}>{repo.stargazers_count}</Typography>
                        </Box>
                    </Grid2>
                </Grid2>
            </CardActionArea>
        </Card>
    )
  }