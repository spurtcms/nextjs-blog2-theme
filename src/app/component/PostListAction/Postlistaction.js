import { fetchGraphQl } from '@/app/api/graphicql';
import { GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_CHANNELLIST_SLUG_QUERY, GET_POSTS_LIST_QUERY } from '@/app/api/query';
import React from 'react'
import Postchannel from './Postchannel';

export async function generateMetadata({params}) {

    let variable_list = { limit: 20, offset: 0 };
  
  const datas=await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)
   let title=''
   let description=''
   datas?.channelEntriesList?.channelEntriesList.map((response)=>{
    
      if(response.slug==params.slug){
        title = response.metaTitle
        description=response.metaDescription
      }
    })
    return {
      title,
      description,
    };
   
  }

const Postlistaction =async({params}) => {

    let {slug}=params

    let variable_category={"limit": 10, "offset":0,"hierarchylevel": 0}
    const postchannel=await fetchGraphQl(GET_POSTS_CHANNELLIST_QUERY,variable_category)  



    let variable_slug={ "limit": 20, "offset": 0}

    const postdatalist=await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_slug)
    
  
  
  let variable_list = { channelId:slug};
  
  const postdata=await fetchGraphQl(GET_POSTS_CHANNELLIST_SLUG_QUERY, variable_list)
  return (
   <>
   <Postchannel data={postdata} postdatalist={postdatalist} postchannel={postchannel} params={params}/>
   </>
  )
}

export default Postlistaction