export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-slate-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-300 to-slate-400 blur-2xl opacity-20 rounded-3xl"></div>

        <div className="relative bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-slate-200/50">
          {children}
        </div>

        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full blur-2xl opacity-30 animate-pulse delay-300"></div>
      </div>
    </div>
  );
}
