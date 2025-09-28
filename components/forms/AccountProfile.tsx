"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'

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
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { updateUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';

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

  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media"); 
  const pathname  = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo:  user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || ""
    }
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if(hasImageChanged) {
      const imgRes = await startUpload(files);
      
      console.log("res image",imgRes);


      if(imgRes && imgRes[0].url){
        values.profile_photo = imgRes[0].url;
      }
    }
    
    if (!user?.id) {
    throw new Error("User ID is missing");
    }
    await updateUser({
      name: values.name,
      path: pathname,
      username: values.username,
      userId: user.id,
      bio: values.bio,
      image: values.profile_photo,
    })

    if (pathname.includes("/profile/edit")){
      router.back();
    } else {
      router.push("/");
    }

  }

  function handleImage(
    e : ChangeEvent<HTMLInputElement>, 
    fieldChange: (value:string) => void
  ){
        // console.log(e.target.files[0]); //e.target.files == > {0: {name: "fileName", size: "Int", type: "image/*"}}
        e.preventDefault(); //good habit to stop unwanted reactions.

        const fileReader = new FileReader();

        if(e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          // console.log(file)
          setFiles(Array.from(e.target.files));

          if(!file.type.includes("image")) return;

          fileReader.onload = async (event) => {
            const imageDataUrl = event.target?.result?.toString() || "";
            fieldChange(imageDataUrl);
          }

          fileReader.readAsDataURL(file);
        }
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
              <FormLabel className='my-0  rounded-full bg-[#1F1F22]'>
              {
                field.value
                
                ? ( 
                  <Image 
                  src={field.value}
                  alt='profile_icon'
                  width={96}
                  height={96}
                  priority
                  className='rounded-full object-contain aspect-square '/>
                ) :
                (
                <Image 
                  src={"/profile.svg"}
                  alt='profile_icon'
                  width={24}
                  height={24}
                  priority
                  className='object-contain m-8'/>
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
                  onChange={(e) => handleImage(e, field.onChange)} //passing field.onChange as a function to trigger the field change effects
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