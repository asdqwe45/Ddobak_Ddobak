-- MEMEBER 생성
INSERT INTO ddobak.member ( created_at, modified_at, email, login_password, introduce_text, nickname, production_status, profile_img, sign_up_type, point) VALUES ( '2023-11-07 11:36:31.297964', '2023-11-07 11:36:31.297964', 'lkm454545@gmail.com', '$2a$10$pe2MOCxUmklNMBLPQ9fUluEQqzws2Ef6q0dTGtqmowOtu1s.BkB92', '안녕하세요! 이도하입니다.', '이도하', 0, '', 'GENERAL', 0);
INSERT INTO ddobak.member ( created_at, modified_at, email, login_password, introduce_text, nickname, production_status, profile_img, sign_up_type, point) VALUES ( '2023-11-07 11:36:31.297964', '2023-11-07 11:36:31.297964', 'user2@example.com', '$2a$10$pe2MOCxUmklNMBLPQ9fUluEQqzws2Ef6q0dTGtqmowOtu1s.BkB92', 'User 2', 'user2', 0, '', 'GENERAL', 0);
INSERT INTO ddobak.member ( created_at, modified_at, email, login_password, introduce_text, nickname, production_status, profile_img, sign_up_type, point) VALUES( '2023-11-07 11:36:31.297964', '2023-11-07 11:36:31.297964', 'user3@example.com', '$2a$10$pe2MOCxUmklNMBLPQ9fUluEQqzws2Ef6q0dTGtqmowOtu1s.BkB92', 'User 3', 'user3', 0, '', 'GENERAL', 0);
INSERT INTO ddobak.member ( created_at, modified_at, email, login_password, introduce_text, nickname, production_status, profile_img, sign_up_type, point) VALUES( '2023-11-07 11:36:31.297964', '2023-11-07 11:36:31.297964', 'user4@example.com', '$2a$10$pe2MOCxUmklNMBLPQ9fUluEQqzws2Ef6q0dTGtqmowOtu1s.BkB92', 'User 4', 'user4', 0, '', 'GENERAL', 0);
INSERT INTO ddobak.member ( created_at, modified_at, email, login_password, introduce_text, nickname, production_status, profile_img, sign_up_type, point) VALUES( '2023-11-07 11:36:31.297964', '2023-11-07 11:36:31.297964', 'user5@example.com', '$2a$10$pe2MOCxUmklNMBLPQ9fUluEQqzws2Ef6q0dTGtqmowOtu1s.BkB92', 'User 5', 'user5', 0, '', 'GENERAL', 0);

-- FONT 생성
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES (NOW(), NOW(), 0, 'Copyrighter 1', 1, Now(), 'English Font 1', 'font_file_url_1', 'font_sort_url_1', 1, 'Introduce text for Font 1', 'Korean Font 1', 1, 0, 1, 0, 1 , 1);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES (NOW(), NOW(), 1, 'Copyrighter 2', 0, Now(), 'English Font 2', 'font_file_url_2', 'font_sort_url_2', 0, 'Introduce text for Font 2', 'Korean Font 2', 1, 2000, 1, 0,1, 1);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES (NOW(), NOW(), 0, 'Copyrighter 3', 1, Now(), 'English Font 3', 'font_file_url_3', 'font_sort_url_3', 1, 'Introduce text for Font 3', 'Korean Font 3', 1, 0, 0, 0, 2, 2);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES (NOW(), NOW(), 1, 'Copyrighter 4', 0, Now(), 'English Font 4', 'font_file_url_4', 'font_sort_url_4', 0, 'Introduce text for Font 4', 'Korean Font 4', 1, 1800, 1, 3, 0, 2);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES (NOW(), NOW(), 0, 'Copyrighter 5', 1, Now(), 'English Font 5', 'font_file_url_5', 'font_sort_url_5', 1, 'Introduce text for Font 5', 'Korean Font 5', 1, 0, 0, 0, 3, 3);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES (NOW(), NOW(), 1, 'Copyrighter 6', 0, Now(), 'English Font 6', 'font_file_url_6', 'font_sort_url_6', 0, 'Introduce text for Font 6', 'Korean Font 6', 1, 2200, 1,4 ,  0, 3);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES (NOW(), NOW(), 0, 'Copyrighter 7', 1, Now(), 'English Font 7', 'font_file_url_7', 'font_sort_url_7', 1, 'Introduce text for Font 7', 'Korean Font 7', 1, 0, 0, 0,4 ,  4);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES (NOW(), NOW(), 1, 'Copyrighter 8', 0, Now(), 'English Font 8', 'font_file_url_8', 'font_sort_url_8', 0, 'Introduce text for Font 8', 'Korean Font 8', 1, 2500, 1, 5, 0, 4);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES (NOW(), NOW(), 0, 'Copyrighter 9', 1, Now(), 'English Font 9', 'font_file_url_9', 'font_sort_url_9', 1, 'Introduce text for Font 9', 'Korean Font 9', 1, 0, 0, 0, 5, 5);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES (NOW(), NOW(), 1, 'Copyrighter 10', 0, Now(), 'English Font 10', 'font_file_url_10', 'font_sort_url_10', 1, 'Introduce text for Font 10', 'Korean Font 10', 1, 0, 1, 0, 2, 5);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES(NOW(), NOW(), 1, 'Copyrighter 11', 0, Now(), 'English Font 11', 'font_file_url_11', 'font_sort_url_11', 0, 'Introduce text for Font 11', 'Korean Font 11', 1, 3000, 1, 0, 1, 5);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES(NOW(), NOW(), 1, 'Copyrighter 12', 0, Now(), 'English Font 12', 'font_file_url_12', 'font_sort_url_12', 1, 'Introduce text for Font 12', 'Korean Font 12', 1, 0, 1, 0, 1, 5);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES(NOW(), NOW(), 1, 'Copyrighter 13', 0, Now(), 'English Font 13', 'font_file_url_13', 'font_sort_url_13', 0, 'Introduce text for Font 13', 'Korean Font 13', 1, 3000, 1, 0, 1, 5);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES(NOW(), NOW(), 1, 'Copyrighter 14', 0, Now(), 'English Font 14', 'font_file_url_14', 'font_sort_url_14', 1, 'Introduce text for Font 14', 'Korean Font 14', 1, 0, 1, 0, 2, 5);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES(NOW(), NOW(), 1, 'Copyrighter 15', 0, Now(), 'English Font 15', 'font_file_url_15', 'font_sort_url_15', 0, 'Introduce text for Font 15', 'Korean Font 15', 1, 3000, 1, 0, 3, 5);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES(NOW(), NOW(), 1, 'Copyrighter 16', 0, Now(), 'English Font 16', 'font_file_url_16', 'font_sort_url_16', 1, 'Introduce text for Font 16', 'Korean Font 16', 1, 0, 1, 0, 4, 5);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES(NOW(), NOW(), 1, 'Copyrighter 17', 0, Now(), 'English Font 17', 'font_file_url_17', 'font_sort_url_17', 0, 'Introduce text for Font 17', 'Korean Font 17', 1, 3000, 1, 0, 5, 5);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES(NOW(), NOW(), 1, 'Copyrighter 18', 0, Now(), 'English Font 18', 'font_file_url_18', 'font_sort_url_18', 1, 'Introduce text for Font 18', 'Korean Font 18', 1, 0, 1, 0, 1, 5);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES(NOW(), NOW(), 1, 'Copyrighter 19', 0, Now(), 'English Font 19', 'font_file_url_19', 'font_sort_url_19', 0, 'Introduce text for Font 19', 'Korean Font 19', 1, 3000, 1, 0, null, 5);
INSERT INTO ddobak.font (created_at, modified_at, commerce_status, copyrighter, copyright_notice, create_datetime, eng_font_name, font_file_url, font_sort_url, free_status, introduce_text, kor_font_name, open_status, price, same_person_check, view_count, basket_id, producer) VALUES(NOW(), NOW(), 1, 'Copyrighter 20', 0, Now(), 'English Font 20', 'font_file_url_20', 'font_sort_url_20', 1, 'Introduce text for Font 20', 'Korean Font 20', 0, 0, 1, 0, null, 5);

-- 키워드 생성
INSERT INTO ddobak.keyword (keyword) VALUES("동글동글");
INSERT INTO ddobak.keyword (keyword) VALUES("귀여운");
INSERT INTO ddobak.keyword (keyword) VALUES("가지런한");
INSERT INTO ddobak.keyword (keyword) VALUES("단정한");
INSERT INTO ddobak.keyword (keyword) VALUES("더러운");
INSERT INTO ddobak.keyword (keyword) VALUES("역겨운");
INSERT INTO ddobak.keyword (keyword) VALUES("지저분한");
INSERT INTO ddobak.keyword (keyword) VALUES("ㅋㅋㅋㅋ");
INSERT INTO ddobak.keyword (keyword) VALUES("힝");
INSERT INTO ddobak.keyword (keyword) VALUES("졸려?잠와!");

-- 폰트와 키워드 연결
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (1,1);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (1,2);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (1,3);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (2,4);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (2,5);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (2,6);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (3,7);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (3,8);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (3,9);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (4,10);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (4,1);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (4,2);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (5,3);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (5,4);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (5,5);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (6,6);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (6,7);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (6,8);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (6,9);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (7,10);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (8,1);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (9,2);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (10,3);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (11,4);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (12,5);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (13,6);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (14,7);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (15,8);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (16,9);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (17,10);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (18,1);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (19,2);
INSERT INTO ddobak.font_keyword (font_id, keyword_id) VALUES (20,3);
