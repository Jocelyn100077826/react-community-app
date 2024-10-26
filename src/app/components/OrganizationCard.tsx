'use client'
import React from "react";
import {Organization} from "@/app/interfaces/Organization";
//MUI libraries
import { Typography,Grid2,Card,CardActionArea,CardMedia,CardContent } from "@mui/material";


type SelectOrgHandler = (org: Organization) => void;

export const OrganisationCard = ({org,handleOnSelectOrg}:{org:Organization,handleOnSelectOrg:SelectOrgHandler}) =>{
  return(
    <Grid2 size={{xs:6,md:4,lg:3}}>
      <Card sx={{height:"100%"}}>
        <CardActionArea onClick={()=>{handleOnSelectOrg(org)}}>
          <CardMedia
            component="img"
            height="140"
            image={org.avatar_url}
            alt="avatar"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {org.login}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary',display: '-webkit-box',overflow: 'hidden',WebkitBoxOrient: 'vertical',WebkitLineClamp: 3}}>
              {org.description?org.description:"no description"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid2>
  )
}