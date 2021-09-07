import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import  useStyles  from "../Layouts/makeStyles.js";
import { Link} from "react-router-dom";



const CardGridContainer = (props) => {
  const classes = useStyles;

  return(
    <Grid container spacing={4}>
      {props.currentDataList.map((data) => (
        <Grid item key={data.key} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              component="img"
              className={classes.media}
              style={{width:"100%",height:"auto"}}
              src={data.imageUrl}
              title={data.model}
            />

            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {data.model}
              </Typography> 
              <Typography className="brand-dark-color">
                {data.brand}
              </Typography>
              <Typography>
                {data.cost + " $"}
              </Typography>
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
      ))}
    </Grid> 
  );
};

export default CardGridContainer;