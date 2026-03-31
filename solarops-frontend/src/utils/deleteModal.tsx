import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogContentText,
   DialogActions,
   Button,
   IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'; // Added for a visual cue

type DeleteModalProps = {
   open: boolean;
   onClose: () => void;
   onConfirm: () => Promise<void> | void;
   title?: string;
   message?: string;
};

const DeleteModal = ({
   open,
   onClose,
   onConfirm,
   title = "Delete Confirmation",
   message = "Are you sure you want to delete this item? This action cannot be undone.",
}: DeleteModalProps) => {

   const handleDelete = async () => {
      await onConfirm();
      onClose();
   };

   return (
      <Dialog
         open={open}
         onClose={onClose}
         maxWidth="xs"
         fullWidth
         // This creates the "Glass" effect on the modal itself
         PaperProps={{
            sx: {
               borderRadius: '16px',
               // background: 'rgba(30, 35, 40, 0.95)',
               backdropFilter: 'blur(12px)',
               border: '1px solid rgba(255, 255, 255, 0.08)',
               boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5)',
               padding: '8px'
            }
         }}
      >
         <DialogTitle sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#fff',
            pb: 1
         }}>

            {title}

            <IconButton
               aria-label="close"
               onClick={onClose}
               sx={{
                  position: 'absolute',
                  right: 12,
                  top: 12,
                  color: 'rgba(255,255,255,0.4)',
                  transition: 'all 0.2s',
                  '&:hover': {
                     color: '#fff',
                     backgroundColor: 'rgba(255,255,255,0.05)'
                  },
               }}
            >
               <CloseIcon fontSize="small" />
            </IconButton>
         </DialogTitle>

         <DialogContent>
            <DialogContentText sx={{
               color: 'rgba(255,255,255,0.6)',
               fontSize: '0.95rem',
               lineHeight: 1.6
            }}>
               {message}
            </DialogContentText>
         </DialogContent>

         <DialogActions sx={{ padding: "16px 24px", gap: 1.5 }}>
            <Button
               variant="text"
               onClick={onClose}
               sx={{
                  color: 'rgba(255,255,255,0.5)',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': { color: '#fff', background: 'transparent' }
               }}
            >
               Cancel
            </Button>

            <Button
               variant="contained"
               onClick={handleDelete}
               sx={{
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: '8px',
                  padding: '8px 24px',
                  boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)',
                  '&:hover': {
                     backgroundColor: '#dc2626',
                     boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)',
                  }
               }}
            >
               Delete
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default DeleteModal;