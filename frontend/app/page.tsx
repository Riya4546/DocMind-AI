"use client";

import {useRef, useState } from "react";
import { Upload } from "lucide-react";


export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const processDocument = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsProcessing(false);
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-white/10 px-8 py-6">
        <h1 className="text-2xl font-bold">DocMind AI</h1>

        <button className="rounded-lg bg-white px-5 py-2 font-medium text-black hover:bg-gray-200 transition">
          Dashboard
        </button>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center px-6 py-20 text-center">

        <h1 className="max-w-4xl text-6xl font-bold leading-tight">
          Extract Intelligence
          <br />
          From Any Document
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-400">
          Upload PDFs and images to instantly extract structured data
          using OCR and AI-powered document understanding.
        </p>

      </section>

      {/* Upload Card */}
      <section className="flex justify-center px-6 pb-20">

        <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">

          <h2 className="text-2xl font-semibold">
            Upload Your Document
          </h2>

          <p className="mt-2 text-gray-400">
            Supported formats: PDF, PNG, JPG
          </p>

          <div
  onClick={() => fileInputRef.current?.click()}
  className="mt-8 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 p-16 transition hover:border-white/40 hover:bg-white/5"
>

  <input
    ref={fileInputRef}
    type="file"
    className="hidden"
    onChange={handleFileChange}
  />

  <Upload className="mb-4 h-12 w-12 text-gray-400" />

  <p className="text-lg font-medium">
    Click to upload
  </p>

  <p className="mt-2 text-sm text-gray-400">
    or drag and drop
  </p>

</div>
          {/* Selected File */}
          {selectedFile && (
            <div className="mt-6 rounded-xl bg-white/10 p-4 text-left">

              <p className="font-medium">
                Selected File:
              </p>

              <p className="mt-1 text-gray-300">
                {selectedFile.name}
              </p>

            </div>
          )}

          {/* Process Button */}
          <button
            onClick={processDocument}
            disabled={!selectedFile || isProcessing}
            className="mt-8 w-full rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                Processing...
              </div>
            ) : (
              "Process Document"
            )}
          </button>

        </div>

      </section>

    </main>
  );
}