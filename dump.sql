create database pdv;

create table usuarios (
    id serial primary key,
    nome varchar(1000) not null,
    email varchar(1000) not null unique,
    senha varchar(1000) not null
);

create table categorias (
    id serial primary key,
    descricao varchar(1000) not null
);

INSERT INTO "categorias" (id,descricao) VALUES (1,'Informatica'),(2, 'Celulares'),(3, 'Beleza e perfumaria'),(4, 'Mercado');
INSERT INTO "categorias" (id,descricao) VALUES (5,'Livros e Papelaria'),(6,'Brinquedos'),(7,'Moda'),(8,'Bebê'),(9,'Games');

create table produtos (
    id serial primary key,
    descricao varchar(1000) not null,
    quantidade_estoque integer not null,
    valor integer not null,
    categoria_id integer not null references categorias(id)
);

create table clientes (
    id serial primary key,
    nome varchar(1000) not null,
    email varchar(255) unique not null,
    cpf varchar(11) unique not null,
    cep varchar(9),
    rua varchar(255),
    numero varchar(255),
    bairro varchar(255),
    cidade varchar(255),
    estado varchar(255)
);