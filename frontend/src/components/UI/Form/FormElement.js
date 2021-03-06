import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import FileInput from "./FileInput";


const FormElement = props => {

    let inputChildren = undefined;

    let inputComponent = (
        <TextField
            fullWidth
            variant="outlined"
            label={props.title}
            error={!!props.error}
            type={props.type}
            select={props.type === 'select'}
            name={props.propertyName} id={props.propertyName}
            value={props.value}
            onChange={props.onChange}
            required={props.required}
            autoComplete={props.autoComplete}
            placeholder={props.placeholder}
            children={inputChildren}
            helperText={props.error}
        >
            {inputChildren}
        </TextField>
    );

    if (props.type === 'file') {
        inputComponent = (
            <FileInput
                label={props.title}
                name={props.propertyName}
                onChange={props.onChange}
            />
        )
    }

    return inputComponent;
};

FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    autoComplete: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
};

export default FormElement;