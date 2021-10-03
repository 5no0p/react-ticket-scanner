// TODO: import dependences
import {useQuery} from 'react-query'  //import useQuery
import {GetCategories, GetCategoriesEvent, GetCategoryById} from './category.api' //import tickets feching function


export const CategoriesQuery = () => useQuery('categories',GetCategories,{
// disable window focus refetching
  refetchOnWindowFocus: false,
}) 

export const CategoryByIdQuery = (id) => useQuery(['category',id],()=>GetCategoryById(id),{
  // disable window focus refetching
    refetchOnWindowFocus: false,
  })

  export const CategoriesEventQuery = (id) => useQuery(['categories_event',id],()=>GetCategoriesEvent(id),{
    // disable window focus refetching
      refetchOnWindowFocus: false,
    })