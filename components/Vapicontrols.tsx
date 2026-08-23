"use client";

import { Mic, MicOff } from "lucide-react";
import useVapi from "@/hooks/userVapi";
import { IBook } from "@/types";
import Image from "next/image";
import Transcript from "@/components/Transcript";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const VapiControls = ({ book }: { book: IBook }) => {
  const {
    status,
    isActive,
    messages,
    currentMessage,
    currentUserMessage,
    duration,
    start,
    stop,
    clearError,
    limitError,
    isBillingError,
    maxDurationSeconds,
  } = useVapi(book);
  const router = useRouter();

  useEffect(() => {
    if (limitError) {
      toast.error(limitError);
      if (isBillingError) {
        router.push("/subscriptions");
      } else {
        router.push("/");
      }
      clearError();
    }
  }, [isBillingError, limitError, router, clearError]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusDisplay = () => {
    switch (status) {
      case "connecting":
        return { label: "Connecting...", color: "vapi-status-dot-connecting" };
      case "starting":
        return { label: "Starting...", color: "vapi-status-dot-starting" };
      case "listening":
        return { label: "Listening", color: "vapi-status-dot-listening" };
      case "thinking":
        return { label: "Thinking...", color: "vapi-status-dot-thinking" };
      case "speaking":
        return { label: "Speaking", color: "vapi-status-dot-speaking" };
      default:
        return { label: "Ready", color: "vapi-status-dot-ready" };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <>
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Header Card */}
        <div className="vapi-header-card">
          <div className="vapi-cover-wrapper">
            <Image
              src={book.coverURL || "/images/book-placeholder.png"}
              alt={book.title}
              width={100}
              height={150}
              className="vapi-cover-image !w-[100px] !h-auto"
              priority
            />
            <div className="vapi-mic-wrapper relative">
              <button
                onClick={isActive ? stop : start}
                disabled={status === "connecting"}
                aria-label={
                  isActive
                    ? "Stop voice conversation"
                    : "Start voice conversation"
                }
                className={`vapi-mic-btn !w-11 !h-11 z-10 ${isActive ? "vapi-mic-btn-active" : "vapi-mic-btn-inactive"} ${
                  isActive &&
                  (status === "speaking" ||
                    status === "thinking" ||
                    status === "listening")
                    ? "opacity-90 animate-pulse"
                    : ""
                }`}
              >
                {isActive ? (
                  <Mic className="size-5 text-white" />
                ) : (
                  <MicOff className="size-5 text-[var(--text-primary)]" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)] mb-1">
                {book.title}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] font-medium">
                by {book.author}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="vapi-status-indicator">
                <span className={`vapi-status-dot ${statusDisplay.color}`} />
                <span className="vapi-status-text">{statusDisplay.label}</span>
              </div>

              <div className="vapi-status-indicator">
                <span className="vapi-status-text">
                  Voice: {book.persona || "Daniel"}
                </span>
              </div>

              <div className="vapi-status-indicator">
                <span className="vapi-status-text font-mono">
                  {formatDuration(duration)} /{" "}
                  {formatDuration(maxDurationSeconds)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="vapi-transcript-wrapper">
          <div className="transcript-container min-h-[380px]">
            <Transcript
              messages={messages}
              currentMessage={currentMessage}
              currentUserMessage={currentUserMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default VapiControls;
