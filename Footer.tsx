import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AC</span>
              </div>
              <span className="text-lg font-semibold">Acessórios</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Os melhores acessórios para computador com qualidade e preço justo.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Produtos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/produtos">
                  <a className="hover:text-foreground transition-colors">Todos os Produtos</a>
                </Link>
              </li>
              <li>
                <Link href="/categorias">
                  <a className="hover:text-foreground transition-colors">Categorias</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">Central de Ajuda</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">Política de Troca</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">Envio e Entrega</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contato@acessorios.com</li>
              <li>(11) 9999-9999</li>
              <li>Seg-Sex: 9h às 18h</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Acessórios de Computador. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
