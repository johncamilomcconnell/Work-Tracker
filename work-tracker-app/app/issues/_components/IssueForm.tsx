'use client';
import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout, Text } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { issueSchema } from "@/app/validationSchema";
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(
    () => import('react-simplemde-editor'),
    { ssr: false }
);

type IssueFormData = z.infer<typeof issueSchema>



const IssueForm = ( { issue }: { issue?: Issue}) => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });
    const [ error, setError ] = useState('');
    const [ isSubmitting, setSubmitting ] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
            try {
                setSubmitting(true);
                await axios.post('/api/issues', data);
                router.push('/issues');
            }
            catch (error) {
                setSubmitting(false)
                setError('An unexpected error occurred.');
            }
        })
  return (
    <div className='max-w-xl'>
    <div >
    {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>
        An unexpected error occurred.
        </Callout.Text>
    </Callout.Root> }
    </div>
    <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root>
            <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller 
            name='description' 
            control={control} 
            defaultValue={issue?.description} render={({field}) => <SimpleMDE placeholder='Description…' {...field} />} />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
    </form>
    </div>
  )
}

export default IssueForm