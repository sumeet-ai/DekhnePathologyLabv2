import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { Clock } from 'lucide-react';
import { DialogClose } from '@radix-ui/react-dialog';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';

function BookAppointments() {
    const [isClient, setIsClient] = useState(false);
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const { user } = useKindeBrowserClient();

    // Function to save the booking
    const saveBooking = () => {
        // Format date to yyyy-MM-dd
        const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    
        // Format time to HH:mm:ss.SSS
        const timeParts = selectedTimeSlot.split(' '); // Split the time and period
        let [hour, minute] = timeParts[0].split(':'); // Split hour and minute
        const period = timeParts[1]; // AM or PM
    
        // Convert to 24-hour format
        if (period === 'PM' && hour < 12) {
            hour = parseInt(hour, 10) + 12; // Convert PM hours
        } else if (period === 'AM' && hour == 12) {
            hour = '00'; // Midnight case
        }
    
        // Format time as HH:mm:ss.SSS
        const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00.000`;
    
        const data = {
            data: {
                username: user.given_name + " " + user.family_name,
                Email: user.email,
                Date: formattedDate, // Use the formatted date
                Time: formattedTime // Use the formatted time
            }
        };
    
        GlobalApi.bookAppointment(data).then(resp => {
            console.log(resp);
            if (resp) {
                toast("Booking Confirmation will be sent to you by mail");
            }
        }).catch(error => {
            const errorDetails = error.response?.data || error.message;
            console.error("Detailed error:", errorDetails);
            toast(`Booking failed: ${errorDetails}`);
        });
    };
    

    // Function to check if the day is in the past
    const isPastDay = (day) => {
        return day <= new Date();
    };

    // useEffect to set up component state
    useEffect(() => {
        setIsClient(true);
        getTime();
    }, []);

    // Function to generate time slots
    const getTime = () => {
        const timeList = [];
        
        // Loop for 10 AM to 5 PM in 30-minute intervals
        for (let hour = 10; hour <= 16; hour++) {
            const timePeriod = hour < 12 ? 'AM' : 'PM';
            const displayHour = hour <= 12 ? hour : hour - 12;
            timeList.push({ time: `${displayHour}:00 ${timePeriod}` });
            timeList.push({ time: `${displayHour}:30 ${timePeriod}` });
        }
        
        setTimeSlot(timeList);
    };

    // Only render the content after the component has mounted on the client
    if (!isClient) return null;

    return (
        <Dialog>
            <DialogTrigger><Button>Book your appointment</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Book an Appointment</DialogTitle>
                    <DialogDescription>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-5'>
                            {/* Calendar */}
                            <div className='flex flex-col gap-3'>
                                <h2 className='flex gap-2 items-center'>Select Date</h2>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    disabled={isPastDay}
                                    className="rounded-md border"
                                />
                            </div>

                            {/* Time slot */}
                            <div>
                                <h2 className='flex gap-2 items-center mb-3'>
                                    <Clock className='text-primary h-5 w-5'/>
                                    Select Time Slot
                                </h2>
                                <div className='grid grid-cols-3 gap-2 border rounded-lg p-3'>
                                    {timeSlot.map((item, index) => (
                                        <h2 
                                            onClick={() => setSelectedTimeSlot(item.time)}
                                            key={index}
                                            className={`p-2 text-center border rounded-full cursor-pointer hover:bg-gray-100 ${
                                                selectedTimeSlot === item.time ? 'bg-slate-500 text-white' : ''
                                            }`}
                                        >
                                            {item.time}
                                        </h2>   
                                    ))}
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button className='text-red-400 border-red-400' type="button" variant="outline">
                            Close
                        </Button>
                    </DialogClose>
                    <Button type="button" disabled={!(date && selectedTimeSlot)}
                    onClick={() => saveBooking()}
                    >
                        Book
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default BookAppointments;
