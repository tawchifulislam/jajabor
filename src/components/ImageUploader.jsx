'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';

export default function ImageUploader({ value, onChange, multiple = false }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const images = multiple ? value || [] : value ? [value] : [];

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

    if (!uploadRes.ok) throw new Error('Cloudinary upload failed');
    const data = await uploadRes.json();
    return data.secure_url;
  }

  async function handleFiles(fileList) {
    setError('');
    setUploading(true);
    try {
      const files = Array.from(fileList);
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

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {images.map((url, idx) => (
          <div
            key={url + idx}
            className="relative h-24 w-24 overflow-hidden rounded-lg border border-line"
          >
            <Image src={url} alt="" fill className="object-cover" />
            <button
              type="button"
              onClick={() => removeAt(idx)}
              className="absolute right-1 top-1 rounded-full bg-ink/70 p-1 text-white"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        {(multiple || images.length === 0) && (
          <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-line text-ink-soft transition hover:bg-card">
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Upload className="h-5 w-5" />
                <span className="text-xs">Upload</span>
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
        )}
      </div>

      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
