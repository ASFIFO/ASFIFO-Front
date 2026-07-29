import React, { useState } from "react";
import { Sparkles, Mail, Lock, Eye, EyeOff } from "lucide-react";

interface LoginProps {
  onLogin?: (data: { email: string; password: string }) => Promise<void>;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Remplace par ton appel API (ex: axios.post('/api/login', { email, password }))
      await onLogin?.({ email, password });
    } catch (err) {
      setError("Identifiants incorrects. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen! w-full! flex! items-center! justify-center! bg-[#0a2a2e]! p-4!">
      <div className="w-full! max-w-md!">
        {/* Logo / en-tête */}
        <div className="flex! flex-col! items-center! mb-8!">
          <div className="w-12! h-12! rounded-xl! bg-[#fbeade]! flex! items-center! justify-center! mb-4!">
            <Sparkles className="w-6! h-6! text-[#0a2a2e]!" />
          </div>
          <h1 className="text-2xl! font-bold! text-white!">Zenith Admin</h1>
          <p className="text-[#7fa89f]! text-sm!">Blog &amp; Contacts</p>
        </div>

        {/* Carte de connexion */}
        <div className="bg-[#0f3a3f]! border! border-[#1a4a4f]! rounded-2xl! p-8! shadow-xl!">
          <div className="mb-6!">
            <span className="inline-flex! items-center! gap-2! bg-[#123f42]! text-[#5dcaa5]! text-xs! font-medium! px-3! py-1.5! rounded-full! mb-4!">
              <Sparkles className="w-3.5! h-3.5!" />
              Espace Backoffice
            </span>
            <h2 className="text-xl! font-bold! text-white!">Connexion</h2>
            <p className="text-[#8fb3ab]! text-sm! mt-1!">
              Accédez à votre espace d'administration.
            </p>
          </div>

          {error && (
            <div className="mb-4! text-sm! text-[#f0997b]! bg-[#3a1f16]! border! border-[#4a2a1e]! rounded-lg! px-3! py-2!">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4!">
            {/* Email */}
            <div>
              <label className="block! text-xs! font-medium! text-[#8fb3ab]! mb-1.5!">
                Adresse e-mail
              </label>
              <div className="relative!">
                <Mail className="absolute! left-3! top-1/2! -translate-y-1/2! w-4! h-4! text-[#5f8a82]!" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@exemple.com"
                  className="w-full! bg-[#0a2a2e]! border! border-[#1a4a4f]! rounded-lg! py-2.5! pl-10! pr-3! text-sm! text-white! placeholder-[#4d6f68]! focus:outline-none! focus:ring-2! focus:ring-[#5dcaa5]! focus:border-transparent! transition!"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block! text-xs! font-medium! text-[#8fb3ab]! mb-1.5!">
                Mot de passe
              </label>
              <div className="relative!">
                <Lock className="absolute! left-3! top-1/2! -translate-y-1/2! w-4! h-4! text-[#5f8a82]!" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full! bg-[#0a2a2e]! border! border-[#1a4a4f]! rounded-lg! py-2.5! pl-10! pr-10! text-sm! text-white! placeholder-[#4d6f68]! focus:outline-none! focus:ring-2! focus:ring-[#5dcaa5]! focus:border-transparent! transition!"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute! right-3! top-1/2! -translate-y-1/2! text-[#5f8a82]! hover:text-white! transition!"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4! h-4!" /> : <Eye className="w-4! h-4!" />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex! items-center! justify-between! text-xs!">
              <label className="flex! items-center! gap-2! text-[#8fb3ab]! cursor-pointer!">
                <input
                  type="checkbox"
                  className="rounded! border-[#1a4a4f]! bg-[#0a2a2e]! text-[#5dcaa5]! focus:ring-[#5dcaa5]!"
                />
                Se souvenir de moi
              </label>
              <a href="#" className="text-[#5dcaa5]! hover:text-white! transition!">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className="w-full! bg-[#fbeade]! hover:bg-[#f5dcc4]! text-[#0a2a2e]! font-semibold! text-sm! py-2.5! rounded-lg! transition! disabled:opacity-60! disabled:cursor-not-allowed!"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>

        <p className="text-center! text-xs! text-[#4d6f68]! mt-6!">
          Zenith Backoffice • Accès réservé aux administrateurs
        </p>
      </div>
    </div>
  );
}