import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'react-query' 
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import FormikControl from './utils/FormikControl'
import {GetCategories , AddCategory} from '../../features/category/category.api' //import tickets feching function

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

    return(
        <>
            <FormikControl 
                control='select'
                label='Category'
                name='category'
                options={Categories}
            />
            <FormikControl 
                control='input'
                type='number'
                label='Count'
                name='count'
            />
            <FormikControl 
                control='input'
                type='number'
                label='Id'
                name='id'
            />
        </>
    )
}

function Tickets() {
    const [category, setCategory] = useState()
    const CreateTicketQuery = useMutation(AddCategory(),{
        onError: (data) => {
            console.log(data)
        }
    })
    const { data, isLoading} = useQuery('categories',GetCategories,{
        refetchOnWindowFocus: false,
      }) 

    const onSubmit = values => {
        console.log('Form data: ',values)
        CreateTicketQuery.mutate(values)
    }

    useEffect(() => {
        if(data){
            category=[]
            data.data.map(cate => category.push({ key: cate, value: cate}))
            setCategory(category)
        }
    }, [isLoading])

    if(isLoading){
        return <div>Loading...</div>
    }
    return (
        <div>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {formik => (
                    <Form>
                        <FormItems Categories={category} />
                        <button type='submit'>Submit</button>
                    </Form>
                )}
            </Formik>            
        </div>
    )
}


export default Tickets