'use client'
import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/redux/store';
import { fetchRepoRequest }  from '@/app/redux/slices/repoSlice';

//UI
import { Typography,Grid2,Box,Link } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BookIcon from '@mui/icons-material/Book';
import PolylineIcon from '@mui/icons-material/Polyline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CircleIcon from '@mui/icons-material/Circle';

export default function Page({ params }:any) {
  const dispatch: AppDispatch = useDispatch();
  const [init, setInit] = useState<boolean>(false);
  const { owner,repo } = React.use<any>(params)
  const { currentRepo, loading, error } = useSelector((state: RootState) => state.repo);

  useEffect(() => {
    let search = owner+"/"+repo
    dispatch(fetchRepoRequest(search));
    setInit(true);
  }, [dispatch]);

  if(error){
    return(<Typography>{error}</Typography>)
  }
  if(loading||!init){
    return(<Typography>Loading...</Typography>)
  }
  if(!currentRepo){
    return(<Typography>Cannot find repo</Typography>)
  }
  return (
    <Grid2 container spacing={2} justifyContent={'center'}>
      <Grid2 size={{ xs: 12, md: 8 }}>
        <Box sx={{bgcolor:'background.paper',borderColor: 'primary.contrastText',p:1,borderRadius:2}}>
          <Typography sx={{pb:1}}><BookIcon/>
            <Link href={currentRepo.owner.html_url} target="_blank" sx={{color:'#2a86f8'}} underline="none"> {owner} </Link>/
            <Link href={currentRepo.html_url} target="_blank" sx={{color:'#2a86f8',fontWeight:'bold'}} underline="none"> {repo}</Link>
          </Typography>
          <Typography variant='subtitle1' sx={{pb:2}}>{currentRepo.description}</Typography>
          <Typography variant='subtitle2' color="textSecondary" gutterBottom><CircleIcon fontSize='small'/> {currentRepo.language?currentRepo.language:"Not Stated"}</Typography>
          <Typography variant='subtitle2' color="textSecondary" gutterBottom><StarBorderIcon fontSize='small'/> {currentRepo.stargazers_count}</Typography>
          <Typography variant='subtitle2' color="textSecondary" gutterBottom><VisibilityIcon fontSize='small'/> {currentRepo.watchers_count}</Typography>
          <Typography variant='subtitle2' color="textSecondary" gutterBottom><PolylineIcon fontSize='small'/> {currentRepo.forks}</Typography>
          
        </Box>
      </Grid2>
    </Grid2>
  )
  }