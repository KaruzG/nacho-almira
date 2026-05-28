"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const styles = {
  card: "w-full max-w-[420px] mx-4 p-8 md:p-10 rounded-2xl bg-primary-light border border-secondary-dark/20",
  title: "text-3xl font-extrabold tracking-tight text-secondary text-center mb-1",
  subtitle: "text-secondary-dark text-sm text-center mb-8",
  label: "block text-[11px] font-bold tracking-widest uppercase text-secondary-dark mb-2",
  inputWrapper: "relative mb-5",
  inputIcon: "absolute left-3 top-1/2 -translate-y-1/2 text-secondary-dark",
  input: "w-full bg-transparent border-b border-secondary-dark/40 focus:border-accent py-3 pl-10 pr-4 text-secondary text-sm outline-none transition-colors duration-200 placeholder:text-secondary-dark/50",
  button: "w-full py-3.5 bg-accent text-accent-dark font-bold text-sm tracking-wider uppercase rounded-sm cursor-pointer hover:bg-accent/90 transition-colors duration-200",
  divider: "flex items-center gap-4 my-6",
  dividerLine: "flex-1 h-px bg-secondary-dark/30",
  dividerText: "text-secondary-dark text-xs tracking-wider uppercase",
  googleButton: "w-full py-3.5 bg-transparent border border-secondary-dark/30 text-secondary font-bold text-sm tracking-wider rounded-sm cursor-pointer hover:border-secondary-dark/60 transition-colors duration-200 flex items-center justify-center gap-3",
  error: "text-red-400 text-xs text-center mb-4",
};

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/admin" });
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Admin Panel</h1>
      <p className={styles.subtitle}>Sign in to manage your projects</p>

      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleCredentialsLogin}>
        <label className={styles.label}>Email</label>
        <div className={styles.inputWrapper}>
          <FiMail className={styles.inputIcon} size={16} />
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={styles.input}
            required
          />
        </div>

        <label className={styles.label}>Password</label>
        <div className={styles.inputWrapper}>
          <FiLock className={styles.inputIcon} size={16} />
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={styles.input}
            required
          />
        </div>

        <button
          id="login-submit"
          type="submit"
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <span className={styles.dividerText}>or</span>
        <span className={styles.dividerLine} />
      </div>

      <button
        id="login-google"
        type="button"
        onClick={handleGoogleLogin}
        className={styles.googleButton}
      >
        <FcGoogle size={20} />
        Continue with Google
      </button>
    </div>
  );
}
