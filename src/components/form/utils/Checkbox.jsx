import React from 'react'
import { Field, ErrorMessage} from 'formik'
import TextError from './TextError'

function Checkbox(props) {
    const { label, name, options, ...rest} = props
    return (
        <div className='mb-2'>
            <label htmlFor={name} className='block'>{label}</label>
            <Field id={name} name={name} {...rest}>
                {({field}) => {
                    return options.map(option => {
                        return(
                            <React.Fragment key={option.value}>
                                <input
                                    type='checkbox'
                                    className='ml-2'
                                    id={option.value}
                                    {...field}
                                    value={option.value}
                                    checked={field.value.includes(option.value)}
                                />
                                <label htmlFor={option.value} className='ml-1'>{option.key}</label>
                            </React.Fragment>
                        )
                    })

                }
                    
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>  
        </div>
    )
}

export default Checkbox
