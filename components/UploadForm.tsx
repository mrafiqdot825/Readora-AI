"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Upload,
  ImageIcon,
  CheckCircle,
  BookOpen,
  Mic,
  FileText,
} from "lucide-react";
import { UploadSchema } from "@/lib/zod";
import { BookUploadFormValues } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import FileUploader from "./FileUploader";
import VoiceSelector from "./VoiceSelector";
import LoadingOverlay from "./LoadingOverlay";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  checkBookExists,
  createBook,
  saveBookSegments,
} from "@/lib/actions/book.actions";
import { useRouter } from "next/navigation";
import { parsePDFFile } from "@/lib/utils";
import { upload } from "@vercel/blob/client";
import { cn } from "@/lib/utils";

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentStep] = useState(1);
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<BookUploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      title: "",
      author: "",
      persona: "",
      pdfFile: undefined,
      coverImage: undefined,
    },
    mode: "onChange",
  });

  const watchPdfFile = form.watch("pdfFile");
  const watchTitle = form.watch("title");
  const watchAuthor = form.watch("author");
  const watchPersona = form.watch("persona");

  // Determine step completion
  const isStep1Complete = !!watchPdfFile;
  const isStep2Complete = !!watchTitle && !!watchAuthor;
  const isStep3Complete = !!watchPersona;

  const onSubmit = async (data: BookUploadFormValues) => {
    if (!userId) {
      return toast.error("Please login to upload books");
    }

    setIsSubmitting(true);

    try {
      const existsCheck = await checkBookExists(data.title);

      if (existsCheck.exists && existsCheck.book) {
        toast.info("Book with same title already exists.");
        form.reset();
        router.push(`/books/${existsCheck.book.slug}`);
        return;
      }

      const fileTitle = data.title.replace(/\s+/g, "-").toLowerCase();
      const pdfFile = data.pdfFile;

      const parsedPDF = await parsePDFFile(pdfFile);

      if (parsedPDF.content.length === 0) {
        toast.error(
          "Failed to parse PDF. Please try again with a different file.",
        );
        return;
      }

      const uploadedPdfBlob = await upload(fileTitle, pdfFile, {
        access: "public",
        handleUploadUrl: "/api/upload",
        contentType: "application/pdf",
      });

      let coverUrl: string;

      if (data.coverImage) {
        const coverFile = data.coverImage;
        const uploadedCoverBlob = await upload(
          `${fileTitle}_cover.png`,
          coverFile,
          {
            access: "public",
            handleUploadUrl: "/api/upload",
            contentType: coverFile.type,
          },
        );
        coverUrl = uploadedCoverBlob.url;
      } else {
        const response = await fetch(parsedPDF.cover);
        const blob = await response.blob();

        const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, blob, {
          access: "public",
          handleUploadUrl: "/api/upload",
          contentType: "image/png",
        });
        coverUrl = uploadedCoverBlob.url;
      }

      const book = await createBook({
        clerkId: userId,
        title: data.title,
        author: data.author,
        persona: data.persona,
        fileURL: uploadedPdfBlob.url,
        fileBlobKey: uploadedPdfBlob.pathname,
        coverURL: coverUrl,
        fileSize: pdfFile.size,
      });

      if (!book.success) {
        toast.error((book.error as string) || "Failed to create book");
        if (book.isBillingError) {
          router.push("/subscriptions");
        }
        return;
      }

      if (book.alreadyExists) {
        toast.info("Book with same title already exists.");
        form.reset();
        router.push(`/books/${book.data.slug}`);
        return;
      }

      const segments = await saveBookSegments(
        book.data._id,
        userId,
        parsedPDF.content,
      );

      if (!segments.success) {
        toast.error("Failed to save book segments");
        throw new Error("Failed to save book segments");
      }

      toast.success("Book uploaded successfully!");
      form.reset();
      router.push(`/books/${book.data.slug}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload book. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      {isSubmitting && <LoadingOverlay />}

      <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-8">
        {/* Progress Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {/* Step 1 */}
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-colors duration-150 border",
                  isStep1Complete
                    ? "bg-[#7c9a82] border-[#7c9a82] text-white"
                    : currentStep === 1
                      ? "bg-[#212a3b] border-[#212a3b] text-white"
                      : "bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-secondary)]",
                )}
              >
                {isStep1Complete ? <CheckCircle className="w-4 h-4" /> : "1"}
              </div>
              <span className="text-xs font-medium text-[var(--text-primary)]">
                Upload
              </span>
            </div>

            {/* Connector */}
            <div className="flex-1 h-px bg-[var(--border-subtle)] mx-3" />

            {/* Step 2 */}
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-colors duration-150 border",
                  isStep2Complete
                    ? "bg-[#7c9a82] border-[#7c9a82] text-white"
                    : currentStep === 2
                      ? "bg-[#212a3b] border-[#212a3b] text-white"
                      : "bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-secondary)]",
                )}
              >
                {isStep2Complete ? <CheckCircle className="w-4 h-4" /> : "2"}
              </div>
              <span className="text-xs font-medium text-[var(--text-primary)]">
                Details
              </span>
            </div>

            {/* Connector */}
            <div className="flex-1 h-px bg-[var(--border-subtle)] mx-3" />

            {/* Step 3 */}
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-colors duration-150 border",
                  isStep3Complete
                    ? "bg-[#7c9a82] border-[#7c9a82] text-white"
                    : currentStep === 3
                      ? "bg-[#212a3b] border-[#212a3b] text-white"
                      : "bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-secondary)]",
                )}
              >
                {isStep3Complete ? <CheckCircle className="w-4 h-4" /> : "3"}
              </div>
              <span className="text-xs font-medium text-[var(--text-primary)]">
                Voice
              </span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: File Upload Section */}
            <div className="bg-[var(--bg-card)] rounded-lg p-5 sm:p-6 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[var(--border-subtle)]">
                <FileText className="w-4 h-4 text-[var(--color-brand)]" />
                <h2 className="text-base font-serif font-semibold text-[var(--text-primary)]">
                  1. Document Files
                </h2>
              </div>

              <div className="space-y-5">
                {/* PDF Upload */}
                <div>
                  <FileUploader
                    control={form.control}
                    name="pdfFile"
                    label="PDF Document *"
                    acceptTypes={ACCEPTED_PDF_TYPES}
                    icon={Upload}
                    placeholder="Click or drag PDF here"
                    hint="PDF file (max 50MB) • Required"
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-[var(--text-secondary)] mt-1.5">
                    Your PDF will be parsed and indexed for voice Q&A.
                  </p>
                </div>

                {/* Cover Image Upload */}
                <div>
                  <FileUploader
                    control={form.control}
                    name="coverImage"
                    label="Cover Image"
                    acceptTypes={ACCEPTED_IMAGE_TYPES}
                    icon={ImageIcon}
                    placeholder="Click to upload cover image"
                    hint="PNG, JPG, or WebP (max 5MB) • Optional"
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-[var(--text-secondary)] mt-1.5">
                    If omitted, the first page of the PDF will be used as cover.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Details Section */}
            <div className="bg-[var(--bg-card)] rounded-lg p-5 sm:p-6 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[var(--border-subtle)]">
                <BookOpen className="w-4 h-4 text-[var(--color-brand)]" />
                <h2 className="text-base font-serif font-semibold text-[var(--text-primary)]">
                  2. Document Metadata
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">
                        Title <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-lg bg-[var(--bg-primary)] border-[var(--border-subtle)] focus:border-[var(--color-brand)] text-sm"
                          placeholder="The Forty Rules of Love"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Author */}
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="form-label">
                        Author <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-lg bg-[var(--bg-primary)] border-[var(--border-subtle)] focus:border-[var(--color-brand)] text-sm"
                          placeholder="Elif Shafak"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Step 3: Voice Selection Section */}
            <div className="bg-[var(--bg-card)] rounded-lg p-5 sm:p-6 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[var(--border-subtle)]">
                <Mic className="w-4 h-4 text-[var(--color-brand)]" />
                <h2 className="text-base font-serif font-semibold text-[var(--text-primary)]">
                  3. Assistant Voice Tone
                </h2>
              </div>

              <FormField
                control={form.control}
                name="persona"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label mb-3">
                      Select Voice <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <VoiceSelector
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Section */}
            <div>
              <Button
                type="submit"
                disabled={isSubmitting || !isStep3Complete}
                className={cn(
                  "w-full h-12 rounded-lg bg-[var(--color-brand)] text-white font-medium text-sm transition-opacity duration-150",
                  !isStep3Complete
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-90 active:opacity-100 cursor-pointer",
                )}
              >
                {isSubmitting ? "Processing Document..." : "Upload Document"}
              </Button>
            </div>

            {/* Info Box */}
            <div className="rounded-lg p-4 border border-[var(--border-subtle)] bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                <span className="font-semibold text-[var(--text-primary)]">
                  Ready to proceed?
                </span>{" "}
                All required fields marked with{" "}
                <span className="text-red-500">*</span> are mandatory.
                Processing typically takes less than a minute depending on
                document size.
              </p>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default UploadForm;
