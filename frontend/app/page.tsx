"use client";

import {useRef, useState } from "react";
import { Upload } from "lucide-react";


export default function Home() {
 
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
    setHistory((prev) => [
 event.target.files?.[0]?.name || "",
  ...prev,
]);
  };

 const processDocument = async () => {
  if (!selectedFile) return;

  try {
    setIsProcessing(true);

    const formData = new FormData();

    formData.append("file", selectedFile);

    const response = await fetch(
      "http://127.0.0.1:8000/process-document",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    setExtractedData(data);

  } catch (error) {
    console.error(error);
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <main className="flex min-h-screen bg-black text-white">
      <aside className="hidden w-80 border-r border-white/10 bg-white/5 p-6 lg:block">

  {/* Logo */}
  <h1 className="text-3xl font-bold">
    DocMind AI
  </h1>

  {/* Divider */}
  <div className="my-8 border-t border-white/10"></div>

  {/* Recent Documents */}
  <div>

    <h2 className="text-xl font-semibold">
      Recent Documents
    </h2>

    <div className="mt-6 space-y-4">

      {history.length === 0 ? (
        <p className="text-gray-400">
          No documents uploaded yet.
        </p>
      ) : (
        history.map((fileName, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-black/40 p-4"
          >
            <p className="truncate font-medium">
              {fileName}
            </p>
          </div>
        ))
      )}

    </div>

  </div>

</aside>
<div className="flex-1">

      {/* Navbar */}
      <nav className="flex justify-end border-b border-white/10 px-8 py-6">
       

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
          {extractedData && (
  <div className="mt-6 rounded-xl bg-white/10 p-4 text-left">
    
    <h3 className="text-lg font-semibold">
      Extracted Data
    </h3>

    <pre className="mt-3 overflow-auto text-sm text-gray-300">
      {JSON.stringify(extractedData, null, 2)}
    </pre>

  </div>
)}

        </div>

      </section>
      </div>

    </main>
  );
}