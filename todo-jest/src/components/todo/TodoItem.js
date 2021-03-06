import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { partial } from '../../lib/utils';
import { editTodo } from '../../lib/todoHelpers';

export const TodoItem = props => { 
    const hangleToggle = partial(props.handleToggle, props.id)
    const handleRemove = partial(props.handleRemove, props.id)

    return (
        <li>
            <label htmlFor={props.id}>
                <input type="checkbox" id={props.id}
                    checked={props.isComplete}
                    onChange={hangleToggle}   
                    
                />
                {props.name}
            </label> 
            <a href="#" title="Remove Todo" onClick={handleRemove}>x</a>    
            <a href="#" style={{color:"green"}} title="Edit Todo" onClick={()=>{
                const edit=prompt("Edit: ")
                props.handleEdit(props.id,edit)
            }}>E</a>
        </li>
    )
}

TodoItem.propTypes = {
    id: PropTypes.number.isRequired,
    isComplete: PropTypes.bool,
    name: PropTypes.string.isRequired
}