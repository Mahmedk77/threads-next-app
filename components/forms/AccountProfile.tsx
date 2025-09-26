"use client"

import React, { ChangeEvent } from 'react'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import { Input } from "@/components/ui/input";
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
import z, { file } from 'zod';
import Image from 'next/image';

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

const AccountProfile = ({ user, btnTitle }: Props ) => {

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: "",
      name: "",
      username: "",
      bio: ""
    }
  });

  function onSubmit(values: z.infer<typeof UserValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  function handleImage(e : ChangeEvent<HTMLInputElement>, 
    fieldChange: (value:string) => void){
        e.preventDefault();
  }

  return (
      <Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-8">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='my-0 p-8 rounded-full bg-[#1F1F22] text-blue-400'>
              {
                field.value
                ? ( 
                  <Image 
                  src={field.value}
                  alt='profile_icon'
                  width={96}
                  height={96}
                  priority
                  className='rounded-full object-contain'/>
                ) :
                (
                <Image 
                  src={"/profile.svg"}
                  alt='profile_icon'
                  width={24}
                  height={24}
                  priority
                  className='object-contain'/>
                )
              }
              </FormLabel>
              {/* why input in form control? */} 
              <FormControl className='flex-1 text-base font-medium'>
                <Input
                  type='file'
                  accept='image/*'
                  id='"file-upload'
                  className='cursor-pointer p-2 outline-0 border-none text-gray-300'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
                
              </FormControl>
              
            </FormItem>
          )}
        />

        {/*FORM FIELD FOR NAME*/}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='flex flex-col items-start gap-4 w-full '>
              <FormLabel className='text-base font-semibold text-white my-0'>
                Name
              </FormLabel>
              {/* why input in form control? */}
              <FormControl className='flex-1 text-base font-medium text-gray-200 '> 
                <Input
                  type='text'      
                  className='border-none bg-black p-2'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* FOR USERNAME */}

        <FormField 
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex flex-col items-start gap-4 w-full'>
              <FormLabel className='text-base font-semibold text-white my-0'>
                User Name
              </FormLabel>
              <FormControl className='flex-1 text-base font-medium text-gray-200'>
                <Input 
                  type='text'
                  className='border-none bg-black p-2'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* FOR BIO */}

        <FormField 
          name='bio'
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex flex-col items-start gap-4 w-full'>
              <FormLabel className='text-base font-semibold my-0 text-white'>
                Bio
              </FormLabel>
              <FormControl className='flex-1 text-base font-medium text-gray-200'>
                <Textarea  
                  rows={10}
                  className='border-none bg-black'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className='bg-[var(--brand-blue-button)] w-full hover:bg-[#524c9a] cursor-pointer text-base tracking-wide'>Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProfile