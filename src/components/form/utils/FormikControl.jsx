import React from 'react'
import Checkbox from './Checkbox'
import ColorPicker from './ColorPicker'
import DatePicker from './DatePicker'
import Input from './Input'
import Radio from './Radio'
import Select from './Select'
import Textarea from './Textarea'

function FormikControl(props) {
    const { control, ...rest} = props
    switch(control){
        case 'input': 
            return <Input {...rest}/>
        case 'textarea':
            return <Textarea {...rest}/>
        case 'select':
            return <Select {...rest} />
        case 'radio':
            return <Radio {...rest} />
        case 'checkbox':
            return <Checkbox {...rest} />
        case 'date':
          //  return <DatePicker {...rest} />
        case 'color':
          //  return <ColorPicker {...rest} />
        default: return null
        
    }
}

export default FormikControl
