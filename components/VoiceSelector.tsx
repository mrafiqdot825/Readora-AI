"use client";

import React from "react";
import { voiceCategories, voiceOptions } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { VoiceSelectorProps } from "@/types";

const VoiceSelector = ({
  value,
  onChange,
  disabled,
  className,
}: VoiceSelectorProps) => {
  return (
    <div className={cn("space-y-5", className)}>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        className="space-y-5"
      >
        {/* Male Voices */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
            Male Voices
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {voiceCategories.male.map((voiceId) => {
              const voice = voiceOptions[voiceId as keyof typeof voiceOptions];
              const isSelected = value === voiceId;
              return (
                <Label
                  key={voiceId}
                  className={cn(
                    "w-full flex items-start justify-start gap-2.5 p-3 rounded-lg border border-[var(--border-subtle)] cursor-pointer transition-colors duration-150",
                    isSelected
                      ? "bg-[var(--bg-tertiary)] border-[var(--color-brand)]"
                      : "bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)]",
                    disabled && "opacity-40 cursor-not-allowed",
                  )}
                >
                  <RadioGroupItem
                    value={voiceId}
                    id={voiceId}
                    className="sr-only"
                  />
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0",
                          isSelected
                            ? "border-[var(--color-brand)]"
                            : "border-gray-300",
                        )}
                      >
                        {isSelected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
                        )}
                      </div>
                      <span className="font-semibold text-sm text-[var(--text-primary)]">
                        {voice.name}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] pl-5.5 leading-normal">
                      {voice.description}
                    </p>
                  </div>
                </Label>
              );
            })}
          </div>
        </div>

        {/* Female Voices */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
            Female Voices
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {voiceCategories.female.map((voiceId) => {
              const voice = voiceOptions[voiceId as keyof typeof voiceOptions];
              const isSelected = value === voiceId;
              return (
                <Label
                  key={voiceId}
                  className={cn(
                    "w-full flex items-start justify-start gap-2.5 p-3 rounded-lg border border-[var(--border-subtle)] cursor-pointer transition-colors duration-150",
                    isSelected
                      ? "bg-[var(--bg-tertiary)] border-[var(--color-brand)]"
                      : "bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)]",
                    disabled && "opacity-40 cursor-not-allowed",
                  )}
                >
                  <RadioGroupItem
                    value={voiceId}
                    id={voiceId}
                    className="sr-only"
                  />
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0",
                          isSelected
                            ? "border-[var(--color-brand)]"
                            : "border-gray-300",
                        )}
                      >
                        {isSelected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
                        )}
                      </div>
                      <span className="font-semibold text-sm text-[var(--text-primary)]">
                        {voice.name}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] pl-5.5 leading-normal">
                      {voice.description}
                    </p>
                  </div>
                </Label>
              );
            })}
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default VoiceSelector;
