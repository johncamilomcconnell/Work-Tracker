'use client';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout, Text } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from "@/app/validationSchema";
import { z } from 'zod'

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [ error, setError ] = useState('')
  return (
    <div className='max-w-xl'>
    <div >
    {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>
        An unexpected error occurred.
        </Callout.Text>
    </Callout.Root> }
    </div>
    <form className='space-y-3' onSubmit={handleSubmit( async (data) => {
        try {
            await axios.post('/api/issues', data);
            router.push('/issues');
        }
        catch (error) {
            setError('An unexpected error occurred.');
        }
        })}>
        <TextField.Root>
            <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
        <Controller name='description' control={control} render={({field}) => <SimpleMDE placeholder='Description…' {...field} />} />
        {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
        <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage