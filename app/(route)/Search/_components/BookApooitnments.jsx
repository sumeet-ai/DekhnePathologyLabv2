import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import { Clock } from 'lucide-react';

function BookAppointments() {
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState([]); // Initialize as an empty array

    useEffect(() => {
        getTime();
    }, []);

    const getTime = () => {
        const timeList = [];
        for (let i = 0; i <= 12; i++) {
            timeList.push({ time: i + ':00 AM' });
            timeList.push({ time: i + ':30 AM' });
        }
        for (let i = 0; i <= 6; i++) {
            timeList.push({ time: i + '00 PM' });
            timeList.push({ time: i + '30 PM' });
        }

        setTimeSlot(timeList);
    };

    return (
        <Dialog>
            <DialogTrigger><Button>Book your appointment</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        <div>
                            <div className='grid grid-col-1 md:grid-col-2 mt-5'>
                                {/* Calendar */}
                                <div className='flex flex-col gap-3 items-baseline'>
                                    <h2 className='flex gap-2 items-center'>Select Date</h2>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="rounded-md border"
                                    />
                                </div>

                                {/* Time slot */}
                                <div className='mt-3'>
                                    <h2 className='flex gap-2 items-center mb-3'>
                                        <Clock className='text-primary h-5 w-5 '/>
                                        Select Time Slot
                                    </h2>
                                    <div className='grid gird-cols-3 gap-2 border rounded-lg p-3'>
                                        {timeSlot.map((item, index) => (
                                            <h2 key={index} className='p-2 border rounded-full '>{item.time}</h2> // Added a key for each item
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default BookAppointments;
