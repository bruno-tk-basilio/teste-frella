import { Link } from "wouter";
import { ShoppingCart, User, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Badge } from "./ui/badge";

interface HeaderProps {
  cartItemCount?: number;
}

export default function Header({ cartItemCount = 0 }: HeaderProps) {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a className="flex items-center gap-2 text-xl font-semibold text-foreground hover:text-primary transition-colors">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">AC</span>
                </div>
                <span>Acessórios</span>
              </a>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/produtos">
                <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Produtos
                </a>
              </Link>
              <Link href="/categorias">
                <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Categorias
                </a>
              </Link>
              {isAuthenticated && user?.role === 'admin' && (
                <Link href="/admin">
                  <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Admin
                  </a>
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/carrinho">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <Link href="/meus-pedidos">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Button asChild size="sm">
                <a href={getLoginUrl()}>Entrar</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
