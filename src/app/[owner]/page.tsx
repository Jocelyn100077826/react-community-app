'use client'
import React, { useState, useEffect } from "react";
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import RepoBox from "@/app/components/RepoBox";
import {Repository} from "@/app/interfaces/Repo";
import { RootState, AppDispatch } from '@/app/redux/store';
import { fetchReposRequest,fetchMoreRepos } from '@/app/redux/slices/reposSlice';
import {fetchOrgRequest} from "@/app/redux/slices/orgsSlice";
import { SearchParameters } from "@/app/interfaces/Repo";
import {ReposSort,ReposSortDirection} from '@/app/enums/repoEnums';
import { useSelector, useDispatch } from 'react-redux';
import _ from "lodash";
//UI
import { Typography,Grid2,Box,TextField,InputLabel,MenuItem,FormControl,Select,Button} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchIcon from '@mui/icons-material/Search';
import { BorderRight } from "@mui/icons-material";

export default function Owner({ params }:any) {
  const { owner } = React.use<any>(params)
  const [search,setSearch] = useState<SearchParameters|null>(null);
  const [init, setInit] = useState<boolean>(false);
  
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch();
  const { loading, repos, error,sort,direction,query,total_count,page } = useSelector((state: RootState) => state.repos);
  const { currentOrg } = useSelector((state: RootState) => state.orgs);
  const [currentSort, setCurrentSort] = useState<ReposSort>(sort);
  const [currentDirection, setCurrentDirection] = useState<ReposSortDirection>(direction);

  useEffect(() => {
    let searchParams: SearchParameters = {
      owner: owner,
      query:query,
      page:page,
      sort: ReposSort.updated,
      direction: ReposSortDirection.asc
    }
    dispatch(fetchOrgRequest(owner));
    dispatch(fetchReposRequest(searchParams));
    setInit(true);
  }, [dispatch]);

  const handleOnSelectRepo = (repo:Repository)=>{
    router?.push('/'+repo.full_name)
  }

  const fetchMoreData = ()=>{
    let searchParams: SearchParameters = {
      owner: owner,
      query:query,
      page:page+1,
      sort: currentSort,
      direction: currentDirection
    }
    console.log("Fetching More Data")
    dispatch(fetchMoreRepos(searchParams));
  }

  
  const handleSortChange = (event: any) => {
    setCurrentSort(event.target.value as ReposSort)
    let searchParams: SearchParameters = {
      owner: owner,
      query:query,
      page:page,
      sort: event.target.value as ReposSort,
      direction: currentDirection
    }
    setSearch(searchParams)
  }; 
  
  const handleDirectionChange = (event: any) => {
    setCurrentDirection(event.target.value as ReposSortDirection)
    let searchParams: SearchParameters = {
      owner: owner,
      query:query,
      sort: currentSort,
      page:page,
      direction: event.target.value as ReposSortDirection,
    }
    setSearch(searchParams)
  }; 

  const handleQueryTextField = (event: React.ChangeEvent<HTMLInputElement>)=>{
    let searchParams: SearchParameters = {
      owner: owner,
      query:event.target.value,
      sort: sort,
      page:page,
      direction: direction,
    }
    setSearch(searchParams)
  }

  const handleOnSearch = () =>{
    console.log(search)
    if(search){
      dispatch(fetchReposRequest(search))
    }
  }

  return (
    <Grid2 container spacing={2} justifyContent={'center'}>
      <Grid2 container size={{ xs: 12, md: 10, lg:8 }}>
          <Grid2 size={12} sx={{p:1,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <Image
              src={currentOrg?.avatar_url?currentOrg?.avatar_url:"/vercel.svg"}
              width={100}
              height={100}
              style={{borderRadius:"5px"}}
              alt="Picture of the author"
            />
            <Typography sx={{textAlign:'center',pt:"15px"}}>{_.toUpper(owner)}</Typography>
          </Grid2>
      </Grid2>
      <Grid2 container size={12} justifyContent={'center'}>
        <Grid2 container size={{ xs: 12, md: 10, lg:8 }} direction={{xs: 'row-reverse', md: 'row'}}>
          <Grid2 container size={{xs:12, md:8}}>
            <Grid2 size={9}>
              <TextField fullWidth placeholder="Search by name" variant="outlined" size="small" className="textinput-long" onChange={handleQueryTextField}
              sx={{bgcolor:'background.paper',borderColor: 'primary.contrastText',marginBottom:1}}
              slotProps={{
                input: {
                  startAdornment: <SearchIcon fontSize="small"/>,
                },
              }}/>
            </Grid2>
            <Grid2 size={3}>
              <Button variant="contained" fullWidth onClick={handleOnSearch}>Search</Button>
            </Grid2>
          </Grid2>
          <Grid2 size={{xs:6, md:2}}>
            <FormControl fullWidth>
              <InputLabel id="sort-select-label">Sort</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                size={"small"}
                value={currentSort}
                label="Sort"
                onChange={handleSortChange}
                sx={{bgcolor:"background.paper"}}
              >
                {Object.values(ReposSort).map((sortType,i) => (
                  <MenuItem key={i} value={sortType}>{_.replace(sortType.charAt(0).toUpperCase() + sortType.slice(1),"_"," ")}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={{xs:6, md:2}}>
            <FormControl fullWidth>
              <InputLabel id="direction-select-label">Direction</InputLabel>
              <Select
                labelId="direction-select-label"
                id="direction-select"
                size={"small"}
                value={currentDirection}
                label="Direction"
                onChange={handleDirectionChange}
                sx={{bgcolor:"background.paper"}}
              >
                {Object.values(ReposSortDirection).map((sortType,i) => (
                  <MenuItem key={i} value={sortType}>{_.replace(sortType.charAt(0).toUpperCase() + sortType.slice(1),"_"," ")}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={12}>
            <Typography sx={{width:"100%",textAlign:"right"}} gutterBottom>{total_count} found</Typography>
            {(loading||!init)?
              <Typography>Loading</Typography>
              : error?
              <Typography>Error: {error}</Typography>
              : repos.length == 0?
              <Typography>No Repositories Matched Your Search</Typography>
              :
              <InfiniteScroll
                dataLength={repos.length}
                next={fetchMoreData}
                hasMore={repos.length < total_count}
                loader={<Typography>Loading...</Typography>}
              >
                <Box className="infinite-table" sx={{borderColor: 'primary.contrastText'}}>
                  {
                    _.map(repos,(v:Repository,i:number)=>(
                      <RepoBox key={i} repo={v} handleOnSelectRepo={handleOnSelectRepo}/>
                    ))
                  }
                </Box>
              </InfiniteScroll>
            }
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
