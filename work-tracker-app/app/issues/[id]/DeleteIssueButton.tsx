'use client'
import { AlertDialog, Button, AlertDialogTrigger, Flex } from '@radix-ui/themes'

const DeleteIssueButton = ( { issueId }: { issueId: number }) => {
  return (
    <AlertDialog.Root>
        <AlertDialogTrigger>
        <Button color='red'>Delete Issue</Button>
        </AlertDialogTrigger>
        <AlertDialog.Content>
            <AlertDialog.Title>
                Confirm Deletion
            </AlertDialog.Title>
            <AlertDialog.Description>Are you sure you want to delete this issue? This action cannot be undone.</AlertDialog.Description>
            <Flex mt='4' gap='3'>
                <AlertDialog.Action>
                    <Button>Delete Issue</Button>
                </AlertDialog.Action>
                <AlertDialog.Cancel>
                    <Button variant='soft' color='gray'>Cancel</Button>
                </AlertDialog.Cancel>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
    
  )
}

export default DeleteIssueButton