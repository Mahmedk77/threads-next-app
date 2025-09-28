"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePathname, useRouter } from 'next/navigation';
import { ThreadValidation } from '@/lib/validations/threads';
import { createThread } from '@/lib/actions/thread.action';
import Thread from '@/lib/models/thread.model';

// import { updateUser } from '@/lib/actions/user.actions';

interface Props {
  user: {
    id?: string | null,
    objectId?: string | null,
    username?: string | null,
    name?: string | null,
    bio?: string | null,
    image?: string | null
  },
  btnTitle: string
}

const PostThreads = ({ userId } :{ userId: string }) => {
 
    const pathname  = usePathname();
    const router = useRouter();

    const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
        thread: "",
        accountId: userId,
    }
    })

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({ 
            text: values.thread, 
            author: userId, 
            communityId: null, 
            path: pathname
        });

        router.push("/")

    }

  return (<>
  
    <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8">
        <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
            <FormItem className='flex flex-col items-start gap-4 w-full '>
                <FormLabel className='text-xl font-medium text-white mt-8'>
                Content
                </FormLabel>
                {/* why input in form control? */}
                <FormControl className='flex-1 text-base font-medium text-gray-200 '> 
                <Textarea
                    rows={15}    
                    className='border-none bg-[var(--brand-black)] p-2'
                    {...field}
                />
                </FormControl>
            </FormItem>
            )}
        />
        <Button type="submit" className='bg-[var(--brand-blue-button)] w-full 
        hover:bg-[#524c9a] cursor-pointer 
        text-base tracking-wide'
        >
          Create Thread
        </Button>
        </form>
    </Form>
  </>)
}

export default PostThreads