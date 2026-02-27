export default function ForgotPasswordPage() {
  return (
    <section className="container-shell py-16">
      <h1 className="text-3xl font-semibold">Forgot Password</h1>
      <form className="mt-6 max-w-md glass-card p-6" action="/api/auth/forgot-password" method="post">
        <input className="w-full rounded-xl border border-nude p-2" name="email" type="email" required placeholder="Email" />
        <button className="mt-4 rounded-full bg-gold px-4 py-2 text-white" type="submit">Send Reset Link</button>
      </form>
    </section>
  );
}
