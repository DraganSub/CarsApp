import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import  useStyles  from "../Layouts/makeStyles.js";
import { Link} from "react-router-dom";
import {v4 as uuidv4} from "uuid";




const CardGridContainer = (props) => {

  const classes = useStyles; 
  const gridData = props.currentDataList;
  const grid = gridData.map(data=>(
    
    <Grid item key={data.key} xs={12} sm={6} md={4}>
      <Card className={classes.card}>

        <CardMedia
          component="img"
          className={classes.media}
          style={{width:"100%",height:"auto"}}
          src={data.imageUrl}  
        />

        <CardContent className={classes.cardContent}>
          {props.elementsNum.map(i =>(
            <Typography key ={uuidv4()} gutterBottom variant="h5" component="p" className={"vehicle"+ i}>
              {data[i]} <sub style={{fontSize: "0.7rem" }}>({i})</sub>
            </Typography> 
          ))}    
        </CardContent>

        <CardActions>
          <Link to={`/${props.pageLink}/${data.key}`} >
            <button className="editBtnVehicleModel">
              Edit
            </button>
          </Link>
          <button className="deleteBtnVehicleModel" onClick={() => props.delete(data.key)}>
            Delete
          </button>
        </CardActions>
      </Card>
    </Grid>
  ));

  return(
    <Grid container spacing={4}>
      {grid}
    </Grid> 
  );
};

export default CardGridContainer;