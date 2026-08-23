"use client";

import React from "react";
import { Loader2 } from "lucide-react";

const LoadingOverlay = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper">
        <div className="loading-shadow">
          <Loader2 className="loading-animation w-8 h-8 text-[var(--color-brand)]" />
          <h2 className="loading-title">Synthesizing Your Book</h2>
          <p className="text-xs text-[var(--text-secondary)] text-center max-w-xs leading-relaxed">
            Please wait while we process your PDF and prepare your interactive
            reading experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
