// import React from 'react'
// import { Field, ErrorMessage} from 'formik'
// import { ChromePicker } from 'react-color'
// import TextError from './TextError'

// function ColorPicker(props) {
//     const { lable, name, ...rest} = props
//     return (
//         <div className='mb-2'>
//             <label htmlFor={name}>{label}</label>
//             <Field id={name} name={name} className='block border-2' {...rest}>
//                 {
//                     ({form, field}) => {
//                         const { setFieldValue } = form
//                         const { value } = field
//                         return (
//                         <ChromePicker 
//                             id={name} 
//                             {...field} 
//                             {...rest} 
//                             color={value}
//                             onChange={val=>setFieldValue(name,val)}
//                         />
//                         )   
//                     }
//                 }
//             </Field>
//             <ErrorMessage name={name} component={TextError}/>             
//         </div>
//     )
// }

// export default ColorPicker
