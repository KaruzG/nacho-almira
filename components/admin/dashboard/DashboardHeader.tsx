interface DashboardHeaderProps {
  totalEntries: number;
}

const styles = {
  label: "text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-2",
  title: "text-4xl md:text-5xl font-extrabold tracking-tight text-secondary",
};

export default function DashboardHeader({ totalEntries }: DashboardHeaderProps) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <p className={styles.label}>Project Management</p>
        <h1 className={styles.title}>Upload Studio</h1>
      </div>
      <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-secondary-dark">
        {totalEntries} Total Entries
      </span>
    </div>
  );
}
