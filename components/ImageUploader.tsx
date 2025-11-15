"use client";
import React, { useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function ImageUploader({
  onImagesReady,
}: {
  onImagesReady: (original: File, cropped: Blob) => void;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, width: 80, height: 80, unit: "%" });
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSrc(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  async function getCroppedImg(): Promise<Blob | null> {
    if (!image || !crop.width || !crop.height) return null;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg");
    });
  }

  async function handleCropSave() {
    if (!fileInput.current?.files?.[0]) return;
    const cropped = await getCroppedImg();
    if (cropped) onImagesReady(fileInput.current.files[0], cropped);
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        onChange={onSelectFile}
        className="input input-bordered"
      />
      {src && (
        <div className="flex flex-col gap-2">
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            aspect={1}
            minWidth={100}
            minHeight={100}
          >
            <img
              src={src}
              alt="Anteprima"
              onLoad={e => setImage(e.currentTarget)}
              className="max-h-64 object-contain"
            />
          </ReactCrop>
          <button type="button" className="btn bg-brand text-white" onClick={handleCropSave}>
            Salva Immagine Ritagliata
          </button>
        </div>
      )}
    </div>
  );
}
