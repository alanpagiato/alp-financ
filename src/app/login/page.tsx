"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { AlertOk } from "@/components/alert";
import { LoadingModal } from "@/components/loadingModal";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (username === "admin" && password === "admin") {
        router.push("/dashboard");
      } else {
        setError("Usuário ou senha incorretos");
        setAlertVisible(true);
      }
    }, 1000);
  };

  return (
    <>
      <LoadingModal isVisible={loading} />
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-sm p-4">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <AlertOk title="Erro" message={error} isVisible={alertVisible} onClose={() => setAlertVisible(false)} />}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Seu usuário"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
