

import { fetchGraphQl, fetchGraphQll } from '@/app/api/graphicql'
import { GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_CHANNELLIST_SLUG_QUERY, GET_POSTS_LIST_QUERY } from '@/app/api/query'
import Postchannel from '@/app/component/Postchannel'
import React from 'react'


export async function generateMetadata({params}) {

  let variable_list = { limit: 100, offset: 0 };

const datas=await fetchGraphQll(GET_POSTS_LIST_QUERY, variable_list)
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


const page = async({params}) => {

    let {slug}=params

    let variable_category={"limit": 10, "offset":0,"hierarchylevel": 0}
    const postchannel=await fetchGraphQll(GET_POSTS_CHANNELLIST_QUERY,variable_category)  



    let variable_slug={ "limit": 100, "offset": 0}

    const postdatalist=await fetchGraphQll(GET_POSTS_LIST_QUERY, variable_slug)
    
  
  
  let variable_list = { channelId:slug};
  
  const postdata=await fetchGraphQll(GET_POSTS_CHANNELLIST_SLUG_QUERY, variable_list)
  
  return (
 <>
<Postchannel data={postdata} postdatalist={postdatalist} postchannel={postchannel}/>
 </>
  )
}

export default page




