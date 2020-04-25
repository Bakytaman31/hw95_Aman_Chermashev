import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCocktails} from "../../store/actions/cocktailsActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CocktailCard from "../../components/UI/CocktailCard/CocktailCard";
import {deleteCocktail, publishCocktail} from "../../store/actions/adminsActions";

class MainPage extends Component {
    componentDidMount() {
        this.props.getCocktails();
    }

    render() {
        return (
            <>
                <Grid container justify="center">
                    <Grid item xs={12} md={10} lg={4}>
                        <Grid container direction="column" spacing={10}>
                            {this.props.cocktails.length === 0 && <Grid item xs><Box pt={2} pb={2}>
                                <Typography variant="h4">There is nothing yet.</Typography>
                            </Box></Grid>}
                            {this.props.cocktails.map(cocktail => (
                                <Grid item xs key={cocktail._id}>
                                    {(this.props.user && this.props.user.role === 'admin') ?
                                        <CocktailCard
                                            title={cocktail.name}
                                            image={cocktail.image}
                                            ingredients={cocktail.ingredients}
                                            recipe={cocktail.recipe}
                                            avatar={cocktail.user.avatar}
                                            published={cocktail.published}
                                            id={cocktail._id}
                                            delete={this.props.deleteCocktail}
                                            publish={this.props.publishCocktail}
                                        />
                                        :
                                        (cocktail.published && <CocktailCard
                                            title={cocktail.name}
                                            id={cocktail._id}
                                            image={cocktail.image}
                                            ingredients={cocktail.ingredients}
                                            recipe={cocktail.recipe}
                                            avatar={cocktail.user.avatar}
                                        />)
                                    }
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
    cocktails: state.cocktails.cocktails,
    user: state.users.user
});

const mapDispatchDispatchToProps = dispatch => ({
    getCocktails: () => dispatch(getCocktails()),
    publishCocktail: id => dispatch(publishCocktail(id)),
    deleteCocktail: id => dispatch(deleteCocktail(id))
});

export default connect(mapStateToProps, mapDispatchDispatchToProps)(MainPage);