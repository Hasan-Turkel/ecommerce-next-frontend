"use client"

import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { useSelector, useDispatch } from "react-redux";
import EmptyPage from "@/components/EmptyPage";
import Footer from "@/components/Footer";
import Loading from "@/app/loading";
import {
  fetchFail,
  fetchStart,
 fetchSuccess
} from "../../../lib/features/authSlice";



const MyPurchases = () => {

  const { axiosToken } = useAxios()
  const {user, loading} = useSelector((state:any)=>state.auth)
  const dispatch = useDispatch();
  const [purchases, setPurchases] = useState([]);
  const props = purchases.length>1?"":"position-absolute bottom-0"

  const getPurchases = async () => {
    dispatch(fetchStart())
    try {
      
      const { data } = await axiosToken.get(`/users/${user?._id}`, 
      );
      // console.log(data);
      setPurchases(data.data.purchases)
      dispatch(fetchSuccess())
    } catch (error) {
      dispatch(fetchFail())
      // console.log(error.message);
    }
  };

  useEffect(() => {
    getPurchases();
  }, []);
  
  // console.log(purchases);

  return (

    <>

    <h1 className="m-3">Hi {user?.username}, here is your purchases.</h1>
    {loading?<Loading/>:!purchases?.length? (<EmptyPage description="There is nothing in your purchases."/>) : (<>
    <main className='pt-3' >
      {purchases?.reverse().map((item:any, i:number)=>( 
        <div key={i} className="mx-4 mb-3 p-3 border rounded-5 shadow-lg bg-white" style={{width:"20rem"}}>
          <img role="button" src={item?.image} alt="img" width={"100px"} height={"100px"} />
        <p className="fs-5">{item.title}</p>
        <p className="fs-5">{item.price} $</p>
        <p className="fs-5">{item.piece} Piece</p>
        <p className="fs-5">Purchase Date : {item.date.slice(0, 10)}</p>
      </div>))}
    </main>
    <Footer props={props}/>
    </>)}
    </>
  )
}

export default MyPurchases