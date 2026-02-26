import React, { useRef, useState, useEffect, useMemo } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  value: File | string | null; // ✅ supports edit + create
  onChange: (file: File | null) => void;
};

const BACKEND_UPLOADS = "http://localhost:4000/uploads/";

const ImageUploadDropzone = ({ value, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const imageSrc = useMemo(() => {
    if (!value) return null;

    if (typeof value === "string") {
      // existing backend image → prepend URL if needed
      return value.startsWith("http")
        ? value
        : `${BACKEND_UPLOADS}${encodeURIComponent(value)}`;
    }

    // uploaded file preview
    return URL.createObjectURL(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (value instanceof File && imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [value, imageSrc]);

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
        position: "relative",
        "&:hover": {
          bgcolor: "#f0f0f0",
        },
      }}
    >
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
      />

      {!imageSrc ? (
        <>
          <Typography variant="body1">Click or Drag & Drop Image Here</Typography>
          <Typography variant="caption" color="text.secondary">
            PNG, JPG, WEBP supported
          </Typography>
        </>
      ) : (
        <Box
          sx={{ position: "relative", display: "inline-block" }}
          onClick={(e) => e.stopPropagation()}
        >
          <Box
            component="img"
            src={imageSrc}
            sx={{ maxWidth: "100%", maxHeight: 200, objectFit: "contain", borderRadius: 1 }}
          />

          <IconButton
            onClick={() => onChange(null)}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "rgba(0,0,0,0.6)",
              color: "#fff",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {value instanceof File && (
            <Typography variant="body2" mt={1}>
              {value.name}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ImageUploadDropzone;