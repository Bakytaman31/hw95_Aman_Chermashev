import React, {Component} from 'react';
import {connect} from "react-redux";
import {getUsersCocktails} from "../../store/actions/cocktailsActions";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CocktailCard from "../../components/UI/CocktailCard/CocktailCard";

class UsersCocktails extends Component {

    componentDidMount() {
        this.props.getUsersCocktails();
    }

    render() {
        return (
            <>
                <Grid container justify="center">
                    <Grid item xs={12} md={10} lg={4}>
                        <Grid container direction="column" spacing={10}>
                            <Grid item xs>
                                <Box pt={2} pb={2}>
                                    <Typography variant="h4">My cocktails</Typography>
                                </Box>
                            </Grid>
                            {this.props.usersCocktails.length === 0 && <Grid item xs>
                                <Box pt={2} pb={2}>
                                    <Typography variant="h6">Here is nothing yet</Typography>
                                </Box>
                            </Grid>}
                            {this.props.usersCocktails.map(cocktail => (
                                <Grid item xs key={cocktail._id}>
                                    <CocktailCard
                                        id={cocktail._id}
                                        title={cocktail.name}
                                        image={cocktail.image}
                                        ingredients={cocktail.ingredients}
                                        recipe={cocktail.recipe}
                                        avatar={cocktail.user.avatar}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = state => ({
    usersCocktails: state.cocktails.usersCocktails
});

const mapDispatchToProps = dispatch => ({
    getUsersCocktails: () => dispatch(getUsersCocktails())
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersCocktails);