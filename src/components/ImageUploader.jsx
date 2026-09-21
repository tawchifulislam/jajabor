'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Loader2 } from 'lucide-react';

export default function ImageUploader({ value, onChange, multiple = false }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const images = multiple ? value || [] : value ? [value] : [];
  const showDropzone = multiple || images.length === 0;

  async function uploadFile(file) {
    const sigRes = await fetch('/api/upload', { method: 'POST' });
    if (!sigRes.ok) throw new Error('Could not get upload signature');
    const { signature, timestamp, folder, apiKey, cloudName } =
      await sigRes.json();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('folder', folder);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: formData },
    );

    if (!uploadRes.ok) throw new Error('Upload failed');
    const data = await uploadRes.json();
    return data.secure_url;
  }

  async function handleFiles(fileList) {
    setError('');
    const files = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (!files.length) {
      setError('Please choose an image file.');
      return;
    }

    setUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadFile));
      if (multiple) {
        onChange([...(value || []), ...urls]);
      } else {
        onChange(urls[0]);
      }
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  function removeAt(idx) {
    if (multiple) {
      const next = [...value];
      next.splice(idx, 1);
      onChange(next);
    } else {
      onChange('');
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  return (
    <div>
      {images.length > 0 ? (
        <div className="mb-3 flex flex-wrap gap-3">
          {images.map((url, idx) => (
            <div
              key={url + idx}
              className="group relative h-20 w-20 overflow-hidden rounded-lg border border-line"
            >
              <Image src={url} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeAt(idx)}
                aria-label="Remove image"
                className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/45 group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {showDropzone ? (
        <label
          onDragOver={e => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed px-4 py-6 text-center transition ${
            dragActive
              ? 'border-brand bg-brand-soft/40'
              : 'border-line hover:border-brand/50 hover:bg-surface-alt/40'
          }`}
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-brand" />
          ) : (
            <>
              <UploadCloud
                className="h-6 w-6 text-ink-soft"
                strokeWidth={1.6}
              />
              <p className="text-sm text-ink">
                <span className="font-medium text-brand">Click to upload</span>{' '}
                or drag and drop
              </p>
              <p className="text-xs text-ink-faint">JPG, PNG or WEBP</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            className="hidden"
            disabled={uploading}
            onChange={e =>
              e.target.files?.length && handleFiles(e.target.files)
            }
          />
        </label>
      ) : null}

      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
