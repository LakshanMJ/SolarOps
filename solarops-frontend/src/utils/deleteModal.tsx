import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";
import { fetchData } from "./fetch";
import { BACKEND_URLS } from "@/backendUrls";

const deleteModal = ({ deleteModalShow, setDeleteModalShow, id, fetchInverters }: any) => {

    const handleDelete = async () => {
        try {
            await fetchData(`${BACKEND_URLS.INVERTERS}/${id}`, {
                method: "DELETE",
            });
            await fetchInverters();
            await setDeleteModalShow(false);
        } catch (err) {
            console.error("Failed to delete inverter:", err);
        }
    };

    return (
        <>
            {deleteModalShow && (
                <Dialog
                    open={deleteModalShow}
                    onClose={() => setDeleteModalShow(false)}
                    maxWidth="xs"
                    fullWidth
                >
                    <DialogTitle sx={{ fontWeight: 600 }}>
                        Delete Confirmation
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this item?
                            This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions sx={{ padding: "16px 24px" }}>
                        <Button
                            variant="outlined"
                            onClick={() => setDeleteModalShow(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    )
}

export default deleteModal;