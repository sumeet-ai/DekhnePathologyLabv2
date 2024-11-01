"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingList from './_components/BookingList'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'


function MyBooking() {

    const { user }=useKindeBrowserClient();
    const [bookingList,setBookingList]=useState([]);
    useEffect(() => {
        user && getuserBookingList();
    }, [user]); // Make sure to add a dependency array to avoid repeated calls
    
    const getuserBookingList = () => {
        GlobalApi.getuserBookingList(user.email)
            .then(resp => {
                console.log(resp.data.data); // Log the response correctly
                setBookingList(resp.data.data);
            })
            .catch(error => {
                console.error("Error fetching booking list:", error); // Add error handling
            });
    };
    
    const filterUserBooking = (type) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set today to midnight
        console.log("Today:", today); // Log today's date
    
        const result = bookingList.filter(item => {
            if (!item?.Date) {
                console.log("Skipping item with undefined Date");
                return false; // Skip if Date is not defined
            }
    
            console.log("Original Date:", item.Date); // Log original date for debugging
    
            // Attempt to parse date with fallback for string date
            const itemDate = new Date(item.Date);
            if (isNaN(itemDate)) {
                console.error(`Invalid Date format: ${item.Date}`);
                return false; // Skip invalid dates
            }
            itemDate.setHours(0, 0, 0, 0); // Set itemDate to midnight
    
            console.log("Parsed Date:", itemDate); // Log parsed date
    
            // Compare the dates
            const isUpcoming = itemDate > today; // Upcoming bookings
            const isPastOrCurrent = itemDate <= today; // Past or current bookings
    
            console.log(`Is Upcoming: ${isUpcoming}, Is Past/Current: ${isPastOrCurrent}`); // Log comparison results
    
            return type === 'upcoming' ? isUpcoming : !isUpcoming;
        });
    
        console.log("Filtered Result:", result); // Log the result for debugging
        return result;
    };
    

    

  return (
    <div className='px-4 sm:px-10 mt-10 '>
        <h2 className='font-bold text-2xl'>Booking</h2>
        <Tabs defaultValue="upcoming" className="w-full">
  <TabsList className="w-full justify-start mt-5">
    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
    <TabsTrigger value="expired">Expired</TabsTrigger>
  </TabsList>
  <TabsContent value="upcoming" ><BookingList bookingList={filterUserBooking('upcoming')} updateRecord={()=>getuserBookingList()}  expired={false}/></TabsContent>
  <TabsContent value="expired"><BookingList bookingList={filterUserBooking('expired')} updateRecord={()=>getuserBookingList()} expired={true}/></TabsContent>
</Tabs>

    </div>
  )
}

export default MyBooking
