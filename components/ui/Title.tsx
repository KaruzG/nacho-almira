interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function Title({ children, className = "" }: TitleProps) {
  return (
    <h2 className={`text-4xl md:text-6xl font-extrabold tracking-tight text-primary dark:text-secondary text-shadow-secondary text-shadow-lg/20 ${className}`}>
      {children}
    </h2>
  );
}
