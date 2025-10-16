import { Sparkles } from "lucide-react";
import { LoginForm } from "./login-form";

export function LoginCard() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl blur opacity-75"></div>
          <div className="relative bg-gradient-to-r from-slate-800 to-slate-950 p-4 rounded-2xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-950 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h1>
        <p className="text-slate-600 text-sm">Manage your products with ease</p>
      </div>

      <LoginForm />

      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">
          Protected by enterprise-grade security
        </p>
      </div>
    </div>
  );
}
