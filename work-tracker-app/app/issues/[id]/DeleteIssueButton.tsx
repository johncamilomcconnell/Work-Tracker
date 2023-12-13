'use client'
import { AlertDialog, Button, AlertDialogTrigger, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import loading from '@/app/issues/[id]/loading';
import { Spinner } from '@/app/components'

const DeleteIssueButton = ( { issueId }: { issueId: number }) => {
    const router = useRouter();
    const [ error, setError ] = useState(false)
    const [ isDeleting, setDeleting ] = useState(false)

    const deleteIssue = async () => {
            try {
                setDeleting(true);
                await axios.delete('/api/issues/' + issueId)
                router.push('/issues');
                router.refresh();
            }
            catch (error) {
                setDeleting(false);
                setError(true);
            }
    }

  return (
    <>
    <AlertDialog.Root>
        <AlertDialogTrigger>
        <Button color='red' disabled={isDeleting}>
            {isDeleting && <Spinner />}
            Delete Issue
            </Button>
        </AlertDialogTrigger>
        <AlertDialog.Content>
            <AlertDialog.Title>
                Confirm Deletion
            </AlertDialog.Title>
            <AlertDialog.Description>Are you sure you want to delete this issue? This action cannot be undone.</AlertDialog.Description>
            <Flex mt='4' gap='3'>
                <AlertDialog.Action>
                    <Button color='red' onClick={deleteIssue}>Delete Issue</Button>
                </AlertDialog.Action>
                <AlertDialog.Cancel>
                    <Button variant='soft' color='gray'>Cancel</Button>
                </AlertDialog.Cancel>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
    <AlertDialog.Root open={error}>
        <AlertDialog.Content>
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description>This issue could not be deleted.</AlertDialog.Description>

            <Button color='gray' variant='soft' mt='4' onClick={() => setError(false)}>OK</Button>

        </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton