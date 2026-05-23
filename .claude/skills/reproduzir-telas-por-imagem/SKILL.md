---
name: reproduzir-telas-por-imagem
description: Use esta skill sempre que o usuário pedir para criar, recriar, ajustar ou implementar páginas, telas ou componentes do projeto ONG Projeto Esperança com base em imagens de referência. A prioridade é reproduzir fielmente o layout enviado e alterar somente o que for explicitamente solicitado.
---

# Skill: Reproduzir telas por imagem — ONG Projeto Esperança

Você é responsável por implementar páginas e componentes do projeto ONG Projeto Esperança com extrema fidelidade visual às imagens enviadas pelo usuário.

## Objetivo principal

Criar páginas exatamente como nas imagens de referência enviadas pelo usuário, respeitando:

- Estrutura visual
- Espaçamentos
- Hierarquia dos textos
- Tamanhos aproximados
- Cores
- Bordas
- Ícones
- Cards
- Botões
- Posição dos elementos
- Responsividade quando aplicável

## Regra mais importante

Nunca altere nada além do que o usuário pediu.

Se o usuário pedir:
> "Mude apenas a cor do botão"

Então altere somente a cor do botão.

Não refatore, não reorganize, não troque componentes, não mude texto, não mude espaçamento, não mude estrutura, não melhore por conta própria.

## Comportamento obrigatório

Antes de editar código, siga esta ordem:

1. Analise a imagem enviada.
2. Identifique os elementos principais da tela.
3. Localize no projeto os arquivos relacionados à página ou componente.
4. Verifique o padrão visual já existente no projeto.
5. Implemente a tela ou ajuste solicitado.
6. Preserve ao máximo a estrutura existente.
7. Mostre um resumo objetivo do que foi alterado.

## Ao receber uma imagem

Quando o usuário enviar uma imagem de referência, trate a imagem como fonte principal de verdade visual.

Você deve observar:

- Layout geral
- Largura dos containers
- Altura dos cards
- Cores predominantes
- Tipografia aproximada
- Tamanho dos botões
- Alinhamento dos textos
- Distância entre seções
- Comportamento esperado para mobile e desktop
- Estados visuais, como hover, ativo, selecionado, vazio, erro ou loading, quando existirem

## Restrições

Não faça:

- Mudanças fora do pedido
- Refatorações desnecessárias
- Troca de biblioteca sem autorização
- Alteração em regra de negócio sem pedido explícito
- Mudança de rotas sem necessidade
- Criação de arquivos extras sem motivo
- Remoção de código existente sem explicar
- Alteração de textos do layout sem o usuário pedir
- Mudança de cores por gosto pessoal
- “Melhorias” não solicitadas

## Projeto ONG Projeto Esperança

O projeto é uma aplicação para uma ONG chamada Projeto Esperança.

As páginas podem incluir:

- Site institucional
- Página inicial
- Página sobre a ONG
- Página de voluntários
- Página de parcerias
- FAQ
- Login discreto para funcionários/admins
- Dashboard administrativo
- Gerenciamento de voluntários
- Gerenciamento de parcerias
- Respostas de FAQ
- Cadastro de administradores
- Perfil do administrador

## Padrão esperado de implementação

Sempre que possível:

- Use os componentes já existentes no projeto.
- Siga a arquitetura de pastas atual.
- Mantenha os nomes de arquivos e componentes coerentes.
- Use CSS/Tailwind/SCSS conforme o projeto já estiver usando.
- Mantenha responsividade.
- Evite duplicação de código se já existir componente reutilizável.
- Não crie design novo se já houver imagem de referência.

## Quando houver dúvida

Se a imagem não mostrar alguma informação, não invente mudanças grandes.

Use uma solução neutra e próxima do padrão existente.

Se a dúvida afetar muito o layout ou regra de negócio, pergunte antes de implementar.

## Formato da resposta após editar

Ao finalizar, responda assim:

### Alterações feitas

- Descreva objetivamente o que foi alterado.

### Arquivos modificados

- Liste os arquivos alterados.

### Observações

- Informe se algo precisou ser aproximado por falta de medida exata na imagem.
- Informe se algum detalhe visual depende de assets, ícones ou fontes que não existem no projeto.

## Checklist obrigatório antes de finalizar

Antes de responder, confirme mentalmente:

- A tela ficou fiel à imagem?
- Só alterei o que foi pedido?
- Mantive o padrão do projeto?
- Não refatorei sem necessidade?
- Não mudei regra de negócio?
- Não removi nada importante?
- A responsividade básica foi preservada?