import LoginForm from "@/components/admin/login/LoginForm";

export const metadata = {
  title: "Login — NACHO ALMIRA",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <LoginForm />
    </div>
  );
}
