import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {connect} from "react-redux";
import Alert from "@material-ui/lab/Alert/Alert";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import {postCocktail} from "../../store/actions/cocktailsActions";
import {nanoid} from 'nanoid';

class CreateCocktail extends Component {
    state = {
        ingredients: [{name: '', amount: '', id: nanoid()}, {name: '', amount: '', id: nanoid()}],
        name: '',
        recipe: '',
        image: ''
    };

    addInput = () => {
        this.setState({ingredients: [...this.state.ingredients, {name: '', amount: '', id: nanoid()}]});
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    changeIngredient = (i, key, e) => {
        const ingCopy = {...this.state.ingredients[i]};
        ingCopy[key] = e.target.value;

        const ingsCopy = [...this.state.ingredients];
        ingsCopy[i] = ingCopy;

        this.setState({ingredients: ingsCopy});
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            let value = this.state[key];

            if (key === 'ingredients') {
                value = JSON.stringify(value);
            }

            formData.append(key, value);
        });

        this.props.postCocktail(formData);
    };

    render() {
        return (
            <>
                <Grid container justify="center">
                    <Grid item xs={12} md={10} lg={4}>
                        <Box pt={2} pb={2}>
                            <Typography variant="h4">Create new cocktail</Typography>
                        </Box>
                        {this.props.error && (
                            <Grid item xs>
                                <Alert severity="error">{this.props.error}</Alert>
                            </Grid>
                        )}
                        <Grid container direction="column" spacing={2}>
                            <form onSubmit={this.submitFormHandler}>
                                <Grid item xs>
                                    <FormElement
                                        propertyName="name"
                                        title="Name"
                                        onChange={this.inputChangeHandler}
                                        value={this.state.name}
                                        placeholder="Enter name"
                                    />
                                </Grid>
                                {this.state.ingredients.map((ingr, i) => (
                                    <Grid container spacing={3} key={i}>
                                        <Grid item xs={6}>
                                            <FormElement
                                                propertyName="name"
                                                title="Ingredient name"
                                                onChange={e => this.changeIngredient(i, 'name', e)}
                                                value={ingr.name}
                                                placeholder="Enter ingredient name"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormElement
                                                propertyName="amount"
                                                title="Ingredient amount"
                                                onChange={e => this.changeIngredient(i, 'amount', e)}
                                                value={ingr.amount}
                                                placeholder="Enter ingredient amount"
                                            />
                                        </Grid>
                                    </Grid>
                                ))}
                                <Grid item xs>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddIcon/>}
                                        onClick={this.addInput}>
                                        Add
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <textarea
                                        rows="10"
                                        cols="60"
                                        name="recipe"
                                        value={this.state.recipe}
                                        onChange={this.inputChangeHandler}
                                        placeholder="Enter cocktails recipe"
                                    />
                                </Grid>
                                <Grid item xs>
                                    <FormElement
                                        type="file"
                                        propertyName="image"
                                        title="Image"
                                        onChange={this.fileChangeHandler}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Button type="submit" color="primary" variant="contained">Save</Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = state => ({
    error: state.cocktails.error
});

const mapDispatchToProps = dispatch => ({
    postCocktail: cocktail => dispatch(postCocktail(cocktail))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCocktail);