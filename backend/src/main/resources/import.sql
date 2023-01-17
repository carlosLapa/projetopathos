INSERT INTO tb_user (first_name, last_name, email, contact, password) VALUES ('Marques', 'Lapa', 'marques@gmail.com', 939393939, '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');
INSERT INTO tb_user (first_name, last_name, email, contact, password) VALUES ('Patricia', 'Lapa', 'patricia@gmail.com', 919191919, '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);

INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Aveiro', 'Prédio', 'Edificio do Sol', 'Habitação', 'Moderna', 3, '2A', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Coimbra', 'Prédio', 'Edificio da Água', 'Habitação', 'Moderna', 5, '5F', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Porto', 'Prédio', 'Edificio do Fogo', 'Habitação', 'Moderna', 9, '1B', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Lisboa', 'Prédio', 'Edificio da Terra', 'Habitação', 'Moderna', 6, '7F', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Braga', 'Prédio', 'Edificio da Floresta', 'Habitação', 'Moderna', 11, '2F', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());
INSERT INTO tb_edificio (localizacao, tipologia, nome, utilizacao, arquitetura, piso, fracao, img_url, date, created_At) VALUES ('Faro', 'Prédio', 'Edificio do Metal', 'Habitação', 'Moderna', 2, '7G', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z', NOW());

INSERT INTO tb_anomalia (consequente, inconsequente, tipologia, descricao, date) VALUES ('Sim', 'Não', 'Estrutural', 'Causou patologias', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z');
INSERT INTO tb_anomalia (consequente, inconsequente, tipologia, descricao, date) VALUES ('Não', 'Sim', 'Material', 'Não causou patologias', TIMESTAMP WITH TIME ZONE '2022-04-14T10:00:00Z');

INSERT INTO tb_causa (tipologia, descricao) VALUES ('Estrutural', 'Fissura no pilar');
INSERT INTO tb_causa (tipologia, descricao) VALUES ('Térmica', 'Falta de isolamento');

INSERT INTO tb_edificio_anomalia (edificio_id, anomalia_id) VALUES (1, 1);
INSERT INTO tb_edificio_anomalia (edificio_id, anomalia_id) VALUES (1, 2);
INSERT INTO tb_edificio_anomalia (edificio_id, anomalia_id) VALUES (2, 2);
INSERT INTO tb_edificio_anomalia (edificio_id, anomalia_id) VALUES (3, 2);
INSERT INTO tb_edificio_anomalia (edificio_id, anomalia_id) VALUES (4, 2);

INSERT INTO tb_causa_anomalia (causa_id, anomalia_id) VALUES (1, 1);
INSERT INTO tb_causa_anomalia (causa_id, anomalia_id) VALUES (2, 2);

INSERT INTO tb_patologia (tipologia, dano, descricao, img_url, date, created_At, anomalia_id) VALUES ('Prédio', 'Infiltrações', 'Água originou infiltrações e bolor', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-05-26T10:00:00Z', NOW(), 1);
INSERT INTO tb_patologia (tipologia, dano, descricao, img_url, date, created_At, anomalia_id) VALUES ('Prédio', 'Fissuras', 'Trepidação das reparações originaram fissurações', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', TIMESTAMP WITH TIME ZONE '2022-05-26T10:00:00Z', NOW(), 1);

INSERT INTO tb_tratamento (tipologia, procedimento, diagnostico, produto, img_url, patologia_id) VALUES ('Prédio', 'Enchimento das fissuras', 'Estrutura degradada em estado grave', 'Cimento - CIMPOR', 'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg', 1);


