INSERT INTO tb_user (first_name, last_name, email, contact, password) VALUES ('Marques', 'Lapa', 'marques@gmail.com', 939393939, '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');
INSERT INTO tb_user (first_name, last_name, email, contact, password) VALUES ('Patricia', 'Lapa', 'patricia@gmail.com', 919191919, '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);

INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Aveiro', 'Prédio', 'Edificio do Sol', 'Habitação', 'Moderna', 3, '2A', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Coimbra', 'Prédio', 'Edificio da Lua', 'Habitação', 'Moderna', 5, '5F', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Porto', 'Prédio', 'Edificio da Água', 'Habitação', 'Moderna', 5, '1B', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Lisboa', 'Prédio', 'Edificio da Terra', 'Habitação', 'Moderna', 5, '7F', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Aveiro', 'Prédio', 'Edificio do Metal', 'Habitação', 'Moderna', 5, '5A', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Porto', 'Prédio', 'Edificio da Floresta', 'Habitação', 'Moderna', 5, '5B', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Beja', 'Prédio', 'Edificio da Montanha', 'Habitação', 'Moderna', 5, '6C', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Viseu', 'Prédio', 'Edificio da Cidade', 'Habitação', 'Moderna', 5, '5C', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Coimbra', 'Prédio', 'Edificio do Mar', 'Habitação', 'Moderna', 5, '1A', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Aveiro', 'Prédio', 'Edificio da Areia', 'Habitação', 'Moderna', 5, '1B', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Aveiro', 'Prédio', 'Edificio do Fogo', 'Habitação', 'Moderna', 5, '3F', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Lisboa', 'Prédio', 'Edificio do Gelo', 'Habitação', 'Moderna', 5, '4E', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());

INSERT INTO tb_anomalia (consequente, inconsequente, descricao, date) VALUES ('Sim', 'Não', 'Causou patologias', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z');
INSERT INTO tb_anomalia (consequente, inconsequente, descricao, date) VALUES ('Não', 'Sim', 'Não causou patologias', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z');

INSERT INTO tb_causa (tipologia, descricao) VALUES ('Estrutural', 'Fissura no pilar');
INSERT INTO tb_causa (tipologia, descricao) VALUES ('Térmica', 'Falta de isolamento');

INSERT INTO tb_anomalia_edificio (anomalia_id, edificio_id) VALUES (1, 2);
INSERT INTO tb_anomalia_edificio (anomalia_id, edificio_id) VALUES (2, 1);
INSERT INTO tb_anomalia_edificio (anomalia_id, edificio_id) VALUES (1, 3);
INSERT INTO tb_anomalia_edificio (anomalia_id, edificio_id) VALUES (1, 4);

INSERT INTO tb_causa_anomalia (causa_id, anomalia_id) VALUES (1, 1);
INSERT INTO tb_causa_anomalia (causa_id, anomalia_id) VALUES (2, 2);
