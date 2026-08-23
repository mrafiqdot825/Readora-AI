import Link from "next/link";
import Image from "next/image";
import { BookCardProps } from "@/types";

const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
  return (
    <Link href={`/books/${slug}`} className="group block h-full">
      <article className="flex h-full flex-col rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-3 transition-colors duration-150 hover:border-[var(--border-medium)]">
        <figure className="flex h-full flex-col">
          <div className="relative flex h-48 sm:h-52 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-3 overflow-hidden">
            <Image
              src={coverURL}
              alt={title}
              width={140}
              height={190}
              className="h-40 sm:h-44 w-auto rounded-sm object-cover"
            />
          </div>

          <figcaption className="mt-3 flex flex-1 flex-col justify-between gap-1">
            <div>
              <h3 className="line-clamp-2 font-serif text-sm sm:text-base font-semibold leading-snug text-[var(--text-primary)]">
                {title}
              </h3>
              <p className="line-clamp-1 text-xs text-[var(--text-secondary)] mt-0.5">
                {author}
              </p>
            </div>
            <p className="mt-2 text-xs font-medium text-[var(--color-brand)]">
              Open Book &rarr;
            </p>
          </figcaption>
        </figure>
      </article>
    </Link>
  );
};
export default BookCard;
