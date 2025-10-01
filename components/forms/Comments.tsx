"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { CommentValidation } from '@/lib/validations/threads';
import { addCommentToThread, createThread } from '@/lib/actions/thread.action';
import Thread from '@/lib/models/thread.model';
import Image from 'next/image';

interface Props {
  threadId: string 
  currentUserImg: string 
  currentUserId: string

}

const Comments = ({ threadId, currentUserImg, currentUserId }: Props) => {
    
    const pathname  = usePathname();
    const router = useRouter();

    const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
        comment: "",
    }
    })
    console.log("hello");

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
      console.log("iii")
      console.log("Before submit", values.comment, currentUserId);  
      await addCommentToThread(
          threadId,
          values.comment,
          currentUserId,
          pathname
        );
         console.log("After submit");

        form.reset();

    }

  return (<>
  
    <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex items-center justify-center gap-2">
        <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
            <FormItem className='flex items-center gap-2 w-full justify-center'>
                <FormLabel>
                <Image 
                  src={currentUserImg}
                  alt='profile image'
                  width={48}
                  height={48}
                  className='rounded-full object-cover'
                />
                </FormLabel>
                {/* why input in form control? */}
                <FormControl> 
                <Input
                    placeholder='Comment...'
                    className='border-none bg-transparent  p-4 font-semibold text-base text-gray-200'
                    {...field}
                />
                </FormControl>
            </FormItem>
            )}
        />
        <Button type="submit" className='bg-[var(--brand-blue-button)] 
        hover:bg-[#524c9a] cursor-pointer rounded-3xl px-8 py-5
        text-base tracking-wide'
        >
          Reply
        </Button>
        </form>
    </Form>
    </>)
}

export default Comments