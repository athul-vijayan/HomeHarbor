import React, { useEffect } from "react";
import { useState } from "react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/bundle'
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListngs] = useState([]);
  const [saleListings, setSaleListngs] = useState([]);
  const [rentListings, setRentListngs] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(()=>{
    const fetchOfferListings = async ()=>{
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=3`)
        const data = await res.json()
        setOfferListngs(data)
        fetchRentListings()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRentListings = async ()=>{
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=3`)
        const data = await res.json()
        setRentListngs(data)
        fetchSaleListings()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListings = async ()=>{
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=3`)
        const data = await res.json()
        setSaleListngs(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOfferListings()
  },[])
  return (
    <div>
    {/* top */}
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <div className="gap-1">
      <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
      Unlock Your
      <span className='text-slate-500'> Home</span>,
      </h1>
        <br />
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
        Embrace Your Space
      </h1>
      </div>
      <div className='text-gray-400 text-xs sm:text-sm'>
      Discover your dream home with us – where every space tells a story of style and comfort. 
     
        
        <br />
        Elevate your living experience today at HomeHarbor.
      </div>
      <Link
        to={'/search'}
        className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
      >
        Let's get started...
      </Link>
    </div>

    {/* swiper */}
    <Swiper navigation>
      {offerListings &&
        offerListings.length > 0 &&
        offerListings.map((listing) => (
          <SwiperSlide>
            <div
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='h-[500px]'
              key={listing._id}
            ></div>
          </SwiperSlide>
        ))}
    </Swiper>

    {/* listing results for offer, sale and rent */}

    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
      {offerListings && offerListings.length > 0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {offerListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
      {rentListings && rentListings.length > 0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {rentListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
      {saleListings && saleListings.length > 0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {saleListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
    );
}
