export default function ProjectSkeleton() {
  return (
    <div className="flex flex-col group w-full animate-pulse">
      <div className="w-full aspect-video rounded-xl md:rounded-3xl bg-gray-200 dark:bg-zinc-800 mb-6 md:mb-8"></div>
      <div className="flex flex-col px-2">
        <div className="h-8 md:h-10 bg-gray-200 dark:bg-zinc-800 rounded-2xl w-3/4 mb-2 md:mb-3"></div>
        <div className="h-4 md:h-5 bg-gray-200 dark:bg-zinc-800 rounded-2xl w-1/3"></div>
      </div>
    </div>
  );
}
