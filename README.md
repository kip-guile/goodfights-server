### Goodfights (server)

- Review and rate UFC fights. Data persisted using a NoSQL database (MONGODB)

### Environment variables

create a .env file that includes

- PORT - The port the server will run on
- DATABASE_URL - The MONGODB database url
- DB_CONNECTION_TEST=The MONGODB database test url
- JWT_SECRET= Your JWT secret

**To start server locally**

```bash
npm run server
```

**To run test locally**

```bash
npm run test-dev
```
