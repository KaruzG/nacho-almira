const styles = {
  footer: "px-8 md:px-12 py-4 border-t border-secondary-dark/10 flex items-center justify-between text-[11px] text-secondary-dark",
  status: "flex items-center gap-2",
  dot: "w-1.5 h-1.5 rounded-full bg-green-500",
};

export default function AdminFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.status}>
        <span className={styles.dot} />
        <span>SYSTEM ONLINE</span>
      </div>
      <span>© 2026 NACHO ALMIRA. ALL RIGHTS RESERVED.</span>
    </footer>
  );
}
