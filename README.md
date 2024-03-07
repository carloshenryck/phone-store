# Phone store

#### URL PARA O SITE: https://phone-store-front-end.vercel.app/

## API
Base URL: **https://phone-store-ivory-omega.vercel.app**

Para utilizar a rota de maneira externa, faça um registro ou login através das rotas **/register** ou **/login** respectivamente, e envie o token de autorização obtido no header authorization para cada rota que você queira acessar.

### Rotas
- **/login** - POST

- **/register** - POST

- **/me** - GET

- **/phone** - POST (para criação de um novo celular, podendo receber as três estrturas de dados definidas na documentação)

- **/getUserPhones** - GET

- **/getAll** - GET

- **/phone/${id}** - DELETE

- **/phone/${id}** - PATCH

## Contas
Contas com produtos já cadastrados para teste:

**Email**: carlos@gmail.com <br>
**Senha**: teste123

**Email**: maria@gmail.com <br>
**Senha**: teste123
