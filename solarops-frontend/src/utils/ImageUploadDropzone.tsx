import React, { useRef, useState, useEffect, useMemo } from "react";
import { Box, Typography, IconButton, alpha } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Added for a techier look

type Props = {
  value: File | string | null;
  onChange: (file: File | null) => void;
};

const BACKEND_UPLOADS = "http://localhost:4000/uploads/";

const ImageUploadDropzone = ({ value, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const imageSrc = useMemo(() => {
    if (!value) return null;
    if (typeof value === "string") {
      return value.startsWith("http")
        ? value
        : `${BACKEND_UPLOADS}${encodeURIComponent(value)}`;
    }
    return URL.createObjectURL(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (value instanceof File && imageSrc) {
        URL.createObjectURL(value);
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
        // Uses your Amber accent when dragging or active, otherwise subtle white
        borderColor: dragging ? "#F59E0B" : "rgba(255, 255, 255, 0.2)",
        borderRadius: "8px",
        p: 3,
        textAlign: "center",
        cursor: "pointer",
        // Matches your INPUT_BG (#0D121F)
        bgcolor: dragging ? alpha("#F59E0B", 0.05) : "#0D121F", 
        transition: "all 0.2s ease-in-out",
        position: "relative",
        "&:hover": {
          borderColor: "rgba(255, 255, 255, 0.4)",
          bgcolor: alpha("#FFFFFF", 0.02),
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <CloudUploadIcon sx={{ fontSize: 40, color: "rgba(255,255,255,0.3)", mb: 1 }} />
          <Typography variant="body1" sx={{ color: "#ffffff", fontWeight: 500 }}>
            Click or Drag & Drop Image
          </Typography>
          <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
            PNG, JPG, WEBP supported
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{ position: "relative", display: "inline-block" }}
          onClick={(e) => e.stopPropagation()}
        >
          <Box
            component="img"
            src={imageSrc}
            sx={{ 
              maxWidth: "100%", 
              maxHeight: 200, 
              objectFit: "contain", 
              borderRadius: "4px",
              border: "1px solid rgba(255,255,255,0.1)" 
            }}
          />

          <IconButton
            onClick={() => onChange(null)}
            sx={{
              position: "absolute",
              top: -10,
              right: -10,
              bgcolor: "#F59E0B", // Amber delete button
              color: "#000",
              size: "small",
              boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
              "&:hover": { bgcolor: "#D97706" },
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>

          {value instanceof File && (
            <Typography variant="caption" display="block" mt={1} sx={{ color: "#9CA3AF" }}>
              {value.name}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ImageUploadDropzone;