"use client";

import { useEffect, useState } from "react";

export default function HomeSettings() {
  const [mode, setMode] = useState("random");
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState<{ id: string; title: string }[]>([]);
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/api/settings/home", { cache: "no-store" }).then(async res => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMode(data.settings.mode); setProjectId(data.settings.projectId || "");
      setProjects(data.projects); setInvalid(data.invalidFixed);
    }).catch(error => setMessage(error.message)).finally(() => setLoading(false));
  }, []);
  return (
    <form className="max-w-xl mb-12 space-y-5" onSubmit={async event => {
      event.preventDefault(); setSaving(true); setMessage("");
      try {
        const res = await fetch("/api/settings/home", { method: "PUT",
          headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode, projectId }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setInvalid(false); setMessage("Home settings saved.");
      } catch (error) { setMessage((error as Error).message); } finally { setSaving(false); }
    }}>
      <h2 className="text-xl font-bold">Home video</h2>
      <p className="text-secondary-dark">Uses the main YouTube video. Only published projects with original dimensions are eligible. Random selection stays unchanged during each visit.</p>
      <label className="block">Selection
        <select className="block w-full bg-primary p-3 border border-secondary-dark" value={mode} disabled={loading || saving} onChange={e => setMode(e.target.value)}>
          <option value="random">Random on each visit</option><option value="fixed">Fixed project</option>
        </select>
      </label>
      {mode === "fixed" && <label className="block">Project
        <select className="block w-full bg-primary p-3 border border-secondary-dark" value={projectId} required disabled={loading || saving} onChange={e => setProjectId(e.target.value)}>
          <option value="">Select a project</option>
          {invalid && projectId && !projects.some(p => p.id === projectId) && <option value={projectId}>Unavailable project</option>}
          {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
      </label>}
      {invalid && <p role="status">The fixed project is unavailable. Home falls back to random selection.</p>}
      {!loading && !projects.length && <p>No eligible projects. Complete the original video dimensions in a published project. Home will show an empty state.</p>}
      {message && <p role="status">{message}</p>}
      <button className="px-5 py-3 bg-accent text-primary disabled:opacity-50" disabled={loading || saving || (mode === "fixed" && !projects.some(p => p.id === projectId))}>
        {saving ? "Saving…" : "Save home settings"}
      </button>
    </form>
  );
}
