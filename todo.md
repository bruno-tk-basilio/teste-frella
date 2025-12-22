# TODO - Loja de Acessórios de Computador

## Sistema de Autenticação
- [x] Página de login
- [x] Página de cadastro
- [x] Funcionalidade de recuperação de senha
- [x] Proteção de rotas autenticadas

## Landing Page
- [x] Hero section atrativa
- [x] Seção de produtos em destaque
- [x] Seção de categorias
- [x] Seção de benefícios/diferenciais
- [x] Footer com informações da loja

## Catálogo de Produtos
- [x] Página de listagem de produtos
- [x] Sistema de busca de produtos
- [x] Filtros por categoria
- [ ] Filtros por faixa de preço
- [x] Ordenação (preço, nome, popularidade)

## Detalhes do Produto
- [x] Página de detalhes com imagens
- [x] Descrição completa do produto
- [x] Especificações técnicas
- [x] Botão adicionar ao carrinho
- [x] Quantidade selecionável

## Carrinho de Compras
- [x] Ícone de carrinho no header com contador
- [x] Página do carrinho
- [x] Adicionar produtos ao carrinho
- [x] Remover produtos do carrinho
- [x] Atualizar quantidade de produtos
- [x] Cálculo do total
- [x] Persistência do carrinho (localStorage)

## Checkout
- [x] Página de checkout
- [x] Formulário de dados pessoais
- [x] Formulário de endereço de entrega
- [x] Resumo do pedido
- [x] Confirmação de pedido
- [x] Salvar pedido no banco de dados

## Painel Administrativo
- [x] Página de dashboard admin
- [x] Listagem de produtos (admin)
- [x] Adicionar novo produto
- [x] Editar produto existente
- [x] Remover produto
- [x] Upload de imagens de produtos
- [ ] Listagem de pedidos
- [ ] Visualizar detalhes de pedidos
- [x] Proteção de rotas admin (role-based)

## Banco de Dados
- [x] Schema de produtos
- [x] Schema de categorias
- [x] Schema de pedidos
- [x] Schema de itens de pedido
- [x] Relacionamentos entre tabelas
- [x] Seed inicial de produtos de exemplo

## Backend (tRPC)
- [x] Procedures para produtos (list, get, create, update, delete)
- [x] Procedures para categorias (list)
- [x] Procedures para pedidos (create, list, get)
- [x] Procedures protegidas para admin
- [x] Query helpers no db.ts

## Design & UI
- [x] Definir paleta de cores elegante
- [x] Configurar tipografia
- [x] Criar componentes de layout (Header, Footer)
- [x] Criar componente ProductCard
- [x] Criar componente CartItem
- [x] Responsividade mobile-first

## Testes
- [x] Testes de procedures de produtos
- [ ] Testes de procedures de pedidos
- [x] Testes de autenticação admin
