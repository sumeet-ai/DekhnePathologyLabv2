import { Button } from '@/components/ui/button';
import moment from 'moment/moment';
import React from 'react';
import CancelAppointment from './CancelAppointment';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';

function BookingList({ bookingList,expired,updateRecord }) {
  const onDeleteBooking=(item)=>{
      console.log(item)
      GlobalApi.deleteBooking(item.id).then(resp=>{
        console.log(resp);
        if(resp){
          toast('You cannot cancel the appointment , try contacting to laboratory')
          updateRecord()
        }
        else{
          
        }
      })
  }
  return (
    <div>
      {bookingList.map((item, index) => (
        <div key={index} className=' gap-2 items-center font-bold text-[18px] border p-3 m-3 rounded w-full'>
          <h2>Appoitnment Date on {item?.Date}
          {!expired&&<CancelAppointment onContinueClick={()=>onDeleteBooking(item)}/>}
                       
          </h2>
          <h2>Appoitnment Time : {item?.Time}
          
          </h2>
          
        </div>
      ))}
    </div>
  );
}

export default BookingList;
