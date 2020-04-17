import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {apiURL} from "../../../constants";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


export default function CocktailCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src={props.avatar}/>
                }
                title={props.title}
                subheader={props.date}
            />
            <CardMedia
                className={classes.media}
                image={apiURL + '/' + props.image}
                title={props.title}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Click on arrow to see more
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Ingredients:</Typography>
                    <Typography paragraph>
                        {props.ingredients.map(ingr => (
                            <ListItem key={ingr.id}>
                                {ingr.name}: {ingr.amount}
                            </ListItem>
                        ))}
                    </Typography>
                    <Typography paragraph>Recipe:</Typography>
                    <Typography paragraph>
                        {props.recipe}
                    </Typography>
                    {!props.published && props.publish &&
                    <Button color="primary" variant="contained" onClick={() => props.publish(props.id)}>
                        Publish
                    </Button>}
                    {props.delete &&
                    <Button color="secondary" variant="contained" onClick={() => props.delete(props.id)}>
                        Delete
                    </Button>}
                </CardContent>
            </Collapse>
        </Card>
    );
}