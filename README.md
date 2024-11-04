# Test project user-management-sysytem
Test project

## Build
For build project please run 
```
docker-compose up
```
ensure you installed docker on your machine

## Migrations
After build run DB migrations in user microservice
```
npm run prisma:migrate
```

## Swagger documentation
```
http://localhost:3000/api
```
