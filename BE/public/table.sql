DROP TABLE user_table;
DROP TABLE friend;
DROP TABLE own_list;
DROP TABLE list;
DROP TABLE item;
DROP TABLE own_item;
DROP TABLE prereq;

CREATE TABLE user_table (
  user_id varchar(10) not null,
  user_pw varchar(20),

  primary key (user_id)
);

CREATE TABLE friend (
  add_from varchar(10),
  add_to   varchar(10),

  primary key (add_from, add_to),
  foreign key (add_from) references user_table(user_id) ON DELETE CASCADE,
  foreign key (add_to) references user_table(user_id) ON DELETE CASCADE,

  check (add_from != add_to)
);

CREATE TABLE list (
  list_id SERIAL,
  list_name varchar(20) not null,

  primary key (list_id)
);

CREATE TABLE item(
  item_id SERIAL,
  item_title varchar(20) not null,
  item_detail varchar(40),
  is_done      boolean,
  is_important boolean,
  due_date    date,

  primary key (item_id)
);

CREATE TABLE prereq(
  prereq_id integer,
  item_id   integer,
  primary key (prereq_id, item_id),
  foreign key (prereq_id) references item(item_id) ON DELETE CASCADE,
  foreign key (item_id) references item(item_id) ON DELETE CASCADE,

  check (prereq_id != item_id)
);

CREATE TABLE own_list (
  user_id varchar(10),
  list_id integer,

  primary key (user_id, list_id),
  foreign key (user_id) references user_table(user_id) ON DELETE CASCADE,
  foreign key (list_id) references list(list_id) ON DELETE CASCADE
);

CREATE TABLE own_item (
  list_id integer,
  item_id integer,

  primary key (list_id, item_id),
  foreign key (list_id) references list(list_id) ON DELETE CASCADE,
  foreign key (item_id) references item(item_id) ON DELETE CASCADE
);

INSERT INTO user_table VALUES ('jeonghoon', '0129');
INSERT INTO user_table VALUES ('friend', '0000');

INSERT INTO friend VALUES ('jeonghoon', 'friend');

INSERT INTO list VALUES (DEFAULT, '시험공부');
INSERT INTO own_list VALUES ('jeonghoon', 1);

INSERT INTO item VALUES (DEFAULT, 'DB exam', 'study for final', false, true, '2021-12-14');
INSERT INTO own_item VALUES (1,1);

INSERT INTO item VALUES (DEFAULT, 'CA exam', 'study for final', false, false, '2021-12-20');
INSERT INTO own_item VALUES (1,2);

INSERT INTO prereq VALUES (2, 1);
