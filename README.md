Este repositório consta o projeto em frentes (Back-end e Front-end)
  
  ** BACK-END > Spring Boot Initializr versão 3.4.0, utilizando o editor Java intelliJ Idea (Community Edition):

    - Tipo: Maven;
    - Versão Java: 21;
    - Dependências: Spring JPA, Rest Repositories, MySQL Driver e Lombok.
    - Repositório original: ['ACJavaWEBAPI'] (https://github.com/investfgg/ACJavaWEBAPI)

  ** FRONT-END > This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.9.

    - Typescript
    - CSS
    - HTML
    - Comunica com a página de Back-end, para execução de métodos CRUD (SQL).

Tela principal do sistema:

![image](https://github.com/user-attachments/assets/df1afa71-84e7-47ee-bc24-496924f709aa)

  Obs importantes:

    1) O projeto está em fase de finalização, cujas siglas baseadas em CRUD:
      - [CR] significa 'Create e Read' - fase de finalização;
      - [R] significa 'Read' - fase de finalização;
      - Sem as siglas adicionadas ('UD') estão em fase de desenvolvimento.

    2) Se todas as opções estiverem preenchidas com a mesma sigla descrita ('[CRUD]'), a aplicação está em
       pleno funcionamento (remoção de todas as siglas).

A finalidade deste projeto é controlar o acesso ao usuário pela aplicação não de si mesmo e sim de outras.

![image](https://github.com/user-attachments/assets/05d9b1cf-9708-4afc-8901-1e5b2da65bcb)

Elaboração de tabelas e seus respectivos relacionamentos escritas em MySQL Workbench.

![image](https://github.com/user-attachments/assets/342a8814-6f09-4741-b459-d5b93a1d439a)

Detalhes gerais do BD de Controle de Acesso (Tabelas e Stored Procedures).

O propósito geral é testar as funcionalidades nas tabelas com seus relacionamentos baseadas em CRUD via WEB API (sem utilização de Hibernate local) usando os métodos do BD MySQL (Stored Procedures) com regras básicas de negócio:

  - nulos.
  - conferência de senha.
  - tamanho escasso (menos de 3 caracteres) ou em excesso (acima do permitido).
  - existência de campos chaves nos relacionamentos.

As API's das tabelas foram testadas com exaustão respeitando os princípios da regra de negócio apresentada acima utilizando Postman (GET, POST, PUT, e DELETE) - 2 imagens acima, obtendo resultados em JSON (dados ou mensagem extraída diretamente no Stored Procedure no caso de algo acontecer, diferentemente do código 404).
