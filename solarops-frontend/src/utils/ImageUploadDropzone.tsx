import React, { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

type Props = {
    value: File | null;
    onChange: (file: File | null) => void;
};

const ImageUploadDropzone = ({
    value,
    onChange,
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    const handleFile = (file: File | null) => {
        if (!file) return;
        onChange(file);
    };

    return (
        <Box
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setDragging(true)}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const file = e.dataTransfer.files?.[0] || null;
                handleFile(file);
            }}
            sx={{
                border: "2px dashed",
                borderColor: dragging ? "primary.main" : "#aaa",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                bgcolor: dragging ? "#e3f2fd" : "#fafafa",
                transition: "all 0.2s ease",
                "&:hover": {
                    bgcolor: "#f0f0f0",
                },
            }}
        >
            {/* Hidden Input */}
            <input
                ref={inputRef}
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                    handleFile(e.target.files?.[0] || null)
                }
            />

            {!value ? (
                <>
                    <Typography variant="body1">
                        Click or Drag & Drop Image Here
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        PNG, JPG, WEBP supported
                    </Typography>
                </>
            ) : (
                <Box>
                    <Box
                        component="img"
                        src={URL.createObjectURL(value)}
                        sx={{
                            maxWidth: "100%",
                            maxHeight: 200,
                            objectFit: "contain",
                            borderRadius: 1,
                            mb: 1,
                        }}
                    />
                    <Typography variant="body2">
                        {value.name}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

export default ImageUploadDropzone;