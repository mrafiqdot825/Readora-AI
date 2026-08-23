"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (query) {
        params.set("query", query);
      } else {
        params.delete("query");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, pathname, router]);

  return (
    <div className="flex items-center bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg overflow-hidden w-full sm:w-80 px-3 py-1 focus-within:border-[var(--color-brand)] transition-colors duration-150">
      <SearchIcon className="w-4 h-4 text-[var(--text-secondary)] shrink-0 mr-2" />
      <Input
        type="text"
        placeholder="Search documents by title or author"
        className="h-8 border-none p-0 text-sm shadow-none focus-visible:ring-0 placeholder:text-[var(--text-secondary)] bg-transparent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
