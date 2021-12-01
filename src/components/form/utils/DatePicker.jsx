// import React from 'react'
// import DateView from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { Field, ErrorMessage} from 'formik'
// import TextError from './TextError'

// function DatePicker(props) {
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
//                         <DateView 
//                             id={name} 
//                             {...field} 
//                             {...rest} 
//                             selected={value}
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

// export default DatePicker
