# 🎉 API de Amigo Secreto

Esta aplicação utiliza Node.js e Express para permitir a criação de grupos, adição de participantes e geração de matches para troca de presentes. É uma solução simples que armazena dados em memória.

## Funcionalidades

- **Criar Grupos:** Permite que novos grupos sejam criados.
- **Adicionar Participantes:** Permite adicionar participantes a um grupo existente.
- **Gerar Matches:** Gera pares aleatórios de participantes para troca de presentes.
- **Consultar Matches:** Permite que um participante consulte quem deve presentear.

## Tecnologias Utilizadas

- Node.js
- Express
- Body-parser

## Endpoints

### 1. Criar Grupo

- **Método:** POST
- **Endpoint:** `/grupos`
- **Corpo da Requisição:**
    ```json
    {
        "nome": "Nome do Grupo"
    }
    ```
- **Resposta:**
    ```json
    {
        "mensagem": "Grupo criado com sucesso!",
        "grupo": {
            "id": 1,
            "nome": "Nome do Grupo",
            "participantes": [],
            "matches": {}
        }
    }
    ```

### 2. Adicionar Participante

- **Método:** POST
- **Endpoint:** `/grupos/:id/participantes`
- **Parâmetros:** `id` (ID do grupo)
- **Corpo da Requisição:**
    ```json
    {
        "nome": "Nome do Participante"
    }
    ```
- **Resposta:**
    ```json
    {
        "mensagem": "Participante adicionado!",
        "grupo": {
            // Detalhes do grupo atualizado
        }
    }
    ```

### 3. Gerar Matches

- **Método:** POST
- **Endpoint:** `/grupos/:id/matches`
- **Parâmetros:** `id` (ID do grupo)
- **Resposta:**
    ```json
    {
        "mensagem": "Matches gerados!",
        "matches": {
            "Participante A": "Participante B",
            // Outros matches
        }
    }
    ```

### 4. Consultar Match

- **Método:** GET
- **Endpoint:** `/grupos/:id/match/:participante`
- **Parâmetros:** 
  - `id` (ID do grupo)
  - `participante` (Nome do participante)
- **Resposta:**
    ```json
    {
        "mensagem": "Você deve presentear Participante B"
    }
    ```

## Instruções para Execução

1. Clone este repositório.
2. Navegue até o diretório do projeto.
3. Instale as dependências:
   ```bash
   npm install
4. Inicie o servidor:   
    ```bash
   node index.js
5. Acesse a aplicação em http://localhost:3000.

## Observações

- Todos os dados são armazenados em memória e não persistem após a parada do servidor.
- É necessário ter o Node.js instalado para executar a aplicação.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções!