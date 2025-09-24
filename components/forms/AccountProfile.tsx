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
              <FormLabel className='my-0'>
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
              <FormControl className='flex-1 text-base font-medium text-gray-200 '> 
                <Input
                  type='file'
                  accept='image/*'
                  
                  className='cursor-pointer p-2'
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
            <FormItem className='flex items-center gap-4 w-full'>
              <FormLabel className='text-base font-semibold text-gray-600 my-0'>
                Name
              </FormLabel>
              {/* why input in form control? */}
              <FormControl className='flex-1 text-base font-medium text-gray-200 '> 
                <Input
                  type='text'      
                  className='no-focus'
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
            <FormItem className='flex items-center gap-4 w-full'>
              <FormLabel className='text-base font-semibold text-gray-600 my-0'>
                User Name
              </FormLabel>
              <FormControl className='flex-1 text-base font-medium text-gray-200'>
                <Input 
                  type='text'
                  className='no-focus'
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
            <FormItem className='flex items-center gap-4 w-full'>
              <FormLabel className='text-base font-semibold text-gray-600 my-0'>
                Bio
              </FormLabel>
              <FormControl className='flex-1 text-base font-medium text-gray-200'>
                <Textarea  
                  rows={10}
                  className='no-focus'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className='bg-yellow-400'>Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProfile