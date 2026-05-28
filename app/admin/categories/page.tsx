import CategoriesManager from "@/components/admin/categories/CategoriesManager";

export default function CategoriesPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-2">Project Management</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary">Categories</h1>
      </div>
      <CategoriesManager />
    </div>
  );
}
