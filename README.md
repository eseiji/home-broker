# 🚀 Home Broker

Simulação de uma plataforma de investimentos utilizando Docker, Golang, NestJS, Next.js, WebSockets e Kafka.

---

## 🧩 Tabela de Conteúdos
1. [Visão Geral](#visão-geral)  
2. [Casos de Uso & Arquitetura](#casos-de-uso--arquitetura)  
3. [Requisitos](#requisitos)  
4. [Instalação & Execução](#instalação--execução)  
   - Golang  
   - NestJS  
   - Next.js  
   - Execução com Docker  
5. [Tecnologias Utilizadas](#tecnologias-utilizadas)  
6. [WebSockets (Tempo Real)](#websockets-tempo-real)  
7. [Contribuições](#contribuições)  
8. [Licença](#licença)

---

## 🌐 Visão Geral
Esse projeto consiste em três módulos principais:

- **API** NestJS: backend REST + WebSockets para gerenciamento de ordens e ativos.
- **Broker** em Golang: microserviço para processamento de ordens via Kafka.
- **Front-end** Next.js: interface web para criação, consulta e negociação em tempo real.

O fluxo geral:
```
Front-end ⇄ API NestJS ⇄ Kafka ⇄ Broker Go ⇄ MongoDB
             ↕ (WebSocket)
```

---

## 📊 Casos de Uso & Arquitetura

**Casos de uso identificados:**
1. Criar ordens de compra/venda  
2. Consultar ordens enviadas  
3. Consultar ativos disponíveis (preço, detalhes)  
4. Visualizar ativos na carteira  
5. Negociar entre ordens  
6. Funções administrativas (criar usuários, ativos etc.)

**Diagrama ER:** Representa entidades como usuário, ativo, ordem e transação, com seus relacionamentos.

---

## ⚙️ Requisitos
- **Git**  
- **Docker** (Desktop ou Engine)  
- Opcional: **WSL2** (Windows)

Se a máquina tiver ≤8 GB de RAM, utilize Docker Engine para economia de recursos.

---

## ⚡ Instalação & Execução

### Docker
1. Na raiz do projeto, execute:
```bash
docker-compose up -d
```

### Golang (Broker)
1. Acesse `go/`
2. Execute:
   ```bash
   go run cmd/trade/main.go
   ```

### Back-end (NestJS)
1. Acesse `api-nestjs/`
2. Instale dependências:
   ```bash
   npm install
   ```
3. Rode em modo dev:
   ```bash
   npm run start:dev
   ```

### Front-end (Next.js)
1. Vá para `next-frontend/`
2. Instale dependências:
   ```bash
   npm install
   ```
3. Rode:
   ```bash
   npm run dev
   ```

Como o front-end (Next.js) e o back-end (NestJS) usam por padrão a porta 3000, se o back-end for iniciado primeiro, ele ocupará essa porta, e o front-end será iniciado automaticamente na porta 3001. Nesse caso, a interface pode ser acessada em http://localhost:3001.

---

## 🛠 Tecnologias Utilizadas
- **Golang** – Broker de ordens  
- **Node.js + NestJS** – Backend e WebSockets  
- **Next.js (React)** – Front-end  
- **Kafka** – Mensageria  
- **MongoDB** – Banco de dados  
- **WebSockets** – Tempo real para ordens  
- **Docker** – Orquestração e containers  
- **WSL2**

---

## 🔄 WebSockets (Tempo Real)
A integração WebSocket permite atualização imediata de ordens, carteira e preços, eliminando necessidade de refresh.

Fluxo de mensageria:

- **Cliente** → WebSocket → **API NestJS**  
- API → Kafka → Broker Go (processa e envia resposta)  
- Broker → Kafka → API NestJS → Cliente (via WebSocket)

---

## Referências  
<img src="https://events-fullcycle.s3.amazonaws.com/events-fullcycle/static/site/img/grupo_4417.png" width="100" /> Este projeto foi inspirado na Imersão FullCycle 21 e adaptado para fins de estudo e prática pessoal.

---

### 🧠 Observações finais 
- O objetivo deste projeto foi aprofundar os conhecimentos em Go e sua integração com o Kafka.
