import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

const LogoutDialog = () => {
  const { isLogoutDialogOpen, closeLogoutDialog } = useAuth();
  const cancelRef = React.useRef();

  return (
    <AlertDialog
      isOpen={isLogoutDialogOpen}
      leastDestructiveRef={cancelRef}
      onClose={closeLogoutDialog}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Logout
          </AlertDialogHeader>
          <AlertDialogBody>
            You've been successfully logged out!
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={closeLogoutDialog}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default LogoutDialog;
