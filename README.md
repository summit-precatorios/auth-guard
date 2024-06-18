# Summit - AuthGuard

# Start Postgresql Database
```sh
docker run -d -p 5432:5432 --name summit-demo-postgres -e POSTGRES_USER=maidensix -e POSTGRES_PASSWORD=M41d3nsix00 -e POSTGRES_DB=summit_demo postgres
```%

### Configuração do arquivo `.env.local`

Para configurar corretamente o arquivo `.env.local` com as variáveis de ambiente necessárias para o seu projeto, siga as instruções abaixo:

#### Variáveis de Ambiente Requeridas

1. **DATABASE**
   - `DATABASE_URL`: URL de conexão com o banco de dados.

2. **SMTP**
   - `SMTP_HOST`: Host do servidor SMTP para envio de emails.
   - `SMTP_PORT`: Porta do servidor SMTP.
   - `SMTP_USER`: Usuário para autenticação no servidor SMTP.
   - `SMTP_PASSWORD`: Senha para autenticação no servidor SMTP.

3. **APPLICATION**
   - `JWT_SECRET`: Chave secreta para geração e validação de tokens JWT.
   - `API_KEY`: Chave de API para autenticação em serviços externos.
   - `CALLBACK_URL`: URL de callback para integrações ou autenticações externas.

#### Como Criar o Arquivo `.env.local`

1. **Crie um novo arquivo `.env.local`** na raiz do seu projeto, se ainda não existir.

2. **Copie e cole as variáveis de ambiente** listadas acima para dentro do arquivo `.env.local`.

3. **Preencha os valores** de cada variável conforme as configurações do seu ambiente de desenvolvimento ou produção. Por exemplo:

   ```dotenv
   # DATABASE
   DATABASE_URL="mysql://usuario:senha@localhost/nome_do_banco"

   # SMTP
   SMTP_HOST="smtp.servidor.com"
   SMTP_PORT=587
   SMTP_USER="usuario@dominio.com"
   SMTP_PASSWORD="senha_do_email"

   # APPLICATION
   JWT_SECRET="sua_chave_secreta_aqui"
   API_KEY="sua_chave_de_api_aqui"
   CALLBACK_URL="https://seu_site.com/callback"
   ```

4. **Guarde o arquivo `.env.local`** com cuidado e **não o compartilhe** publicamente, especialmente em repositórios Git ou outros sistemas de controle de versão, para evitar expor informações sensíveis.

#### Notas Adicionais

- Certifique-se de que todas as variáveis de ambiente necessárias para o seu projeto estejam definidas e corretamente configuradas no arquivo `.env.local`.
- Ao utilizar variáveis de ambiente em seu código, certifique-se de carregá-las corretamente no ambiente de execução (como utilizando bibliotecas como `dotenv` em Node.js).

Este documento fornece uma base para configurar suas variáveis de ambiente de forma segura e eficiente no seu projeto. Certifique-se de revisar e atualizar estas variáveis conforme necessário ao longo do desenvolvimento do projeto.