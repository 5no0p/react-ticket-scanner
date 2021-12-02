import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'react-query' 
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import FormikControl from './utils/FormikControl'
import {GetCategories , AddCategory} from '../../features/category/category.api' //import tickets feching function
import {AddMultiTicket} from '../../features/ticket/ticket.api' //import tickets feching function
import Spinner from '../common/spinner'


const initialValues = {
    category:'',
    id:'',
    count:''
}
const validationSchema = Yup.object({
    category: Yup.string().required('Required'),
    id: Yup.number().required('Required'),
    count: Yup.number().required('Required'),
})

function FormItems(props){
    const {Categories} = props
    const [CategoryOptions, setCategoryOptions] = useState([{key: 'Select Category', value: ''}])
    //const CategoryOptions = Categories.data.map(cate => ({ key: cate.name, value: cate.name}))
    useEffect(() => {
        setCategoryOptions([{key: 'Select Category', value: ''}])
        Categories.data.map(cate => {
            setCategoryOptions([...CategoryOptions,{ key: cate.name, value: cate.name}])
        })
    }, [Categories])
    console.log(CategoryOptions)

    return(
        <>
            <FormikControl 
                control='select'
                label='Category'
                name='category'
                options={CategoryOptions}
                className='mb-3 form-control'
            />
            <FormikControl 
                control='input'
                type='number'
                label='Count'
                name='count'
                className='mb-3 form-control'
            />
            <FormikControl 
                control='input'
                type='number'
                label='Id'
                name='id'
                className='mb-3 form-control'
            />
        </>
    )
}

function Tickets() {
    const [inProsess, setInProsess] = useState(false)
    const [messeage, setMesseage] = useState('')

    const CreateTicketQuery = useMutation(AddMultiTicket,{
        onMutate:()=>{
            setInProsess(true)
        },
        onSuccess:()=>{
            setMesseage('Success')
        },
        onError: (data) => {
            setMesseage('Error: ',data)

        },
        onSettled:()=>{
            setInProsess(false)
        }
    })
    const { data, isLoading} = useQuery('categories',GetCategories,{
        refetchOnWindowFocus: false,
      }) 

    const onSubmit = values => {
        console.log('Form data: ',values)
        CreateTicketQuery.mutate(values)
    }

    if(isLoading){
        return <div>Loading...</div>
    }
    return (
        <div className='mx-5 d-flex justify-content-center'>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {formik => (
                    <Form>
                        <FormItems Categories={data} />
                        <button className='btn btn-labeled btn-primary' type='submit'>Submit</button>
                        <div className="btn-group ms-3" role="group" aria-label="Third group">
                            {inProsess ? <Spinner />: messeage}{' '}
                        </div>
                    </Form>
                )}
            </Formik>            
        </div>
    )
}


export default Tickets