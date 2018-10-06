drop table if exists towns, reg_numbers;

--  towns table
create table towns (
    id serial not null primary key,
    town_name varchar(50) not null,
    town_tag varchar(20) not null
);
--  registrations table
create table reg_numbers (
    id serial not null primary key,
    reg_number varchar(50) not null,
    town int not null,
    foreign key (town) references towns(id)
);


insert into towns(town_name,town_tag) values ('cape town','CA');
insert into towns(town_name,town_tag) values ('paarl','CJ');
insert into towns(town_name,town_tag) values ('belville','CY');
insert into towns(town_name,town_tag) values ('strand','CF');

insert into reg_numbers(reg_number,town) values('CY 234 400', 3);