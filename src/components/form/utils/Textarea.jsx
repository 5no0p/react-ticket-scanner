import React from 'react'
import { Field, ErrorMessage} from 'formik'
import TextError from './TextError'

function Textarea(props) {
    const { label, name, ...rest} = props
    return (
        <div className='mb-2'>
            <label htmlFor={name}>{label}</label>
            <Field as='textarea' id={name} name={name} className='block border-2' {...rest}/>
            <ErrorMessage name={name} component={TextError}/>  
        </div>
    )
}

export default Textarea
