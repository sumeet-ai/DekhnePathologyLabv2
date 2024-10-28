"use client";
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

function CategoryList() {
    const [categoryList, setCategoryList] = useState([]);
    const params = useParams();
    const category = params?.category; // Access category directly from params

    useEffect(() => {
        getCategoryList();
        console.log('Params:', params);
    }, []);

    const getCategoryList = () => {
        GlobalApi.getCategory().then((resp) => {
            console.log(resp.data.data);
            setCategoryList(resp.data.data);
        });
    };

    return (
        <div className='h-screen mt-5 flex flex-col'>
            <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {categoryList.map((item, index) => (
                            <CommandItem key={index}>
                                <Link
                                    href={'/Search/'+item.Name}
                                    className={`p-2 flex gap-2 text-[12px] items-center text-blue-500 rounded-md cursor-pointer w-full ${
                                        category === item.Name ? 'bg-blue-100' : ''
                                    }`}
                                >
                                    {item?.Icon?.url && (
                                        <Image
                                            src={item.Icon.url}  // Fetching the image URL
                                            alt="icon"
                                            width={25}
                                            height={25}
                                        />
                                    )}
                                    <label>{item.Name || "No Name Available"}</label>
                                </Link>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    );
}

export default CategoryList;
