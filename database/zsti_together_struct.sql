drop database if exists `together`;
create database if not exists `together` character set utf8mb4 COLLATE utf8mb4_unicode_ci;
use `together`;

create table if not exists `subjects` (

    `id` int not null auto_increment primary key,
    `name` varchar(50) not null

);

create table if not exists `teachers` (

    `id` int not null auto_increment primary key,
    `fName` varchar(50) not null,
    `lName` varchar(50) not null,
    `email` varchar(50) not null,
    `password` varchar(50) not null,
    `subject` int not null,

    constraint `fk_teacher__subject` foreign key (`subject`) references `subjects` (`id`) on update cascade on delete restrict

);

create table if not exists `classes` (

    `id` int not null auto_increment primary key,
    `name` varchar(5) not null, /* 3b19 -> name of class 3b + year of beginning 2019 */
    `teacher` int not null,

    constraint `fk_class__teacher` foreign key (`teacher`) references `teachers` (`id`) on update cascade on delete cascade 

);

create table if not exists `students` (

    `id` int not null auto_increment primary key,
    `fName` varchar(50) not null,
    `lName` varchar(50) not null,
    `email` varchar(50) not null,
    `password` varchar(50) not null,
    `class` int not null,
    `isTutor` bool not null default false,

    constraint `fk_student__class` foreign key (`class`) references `classes` (`id`) on update cascade on delete restrict

);

create table if not exists `types` (

    `id` int not null auto_increment primary key,
    `name` varchar(50) not null

);

create table if not exists `posts` (

    `id` int not null auto_increment primary key,
    `body` varchar(255) not null,
    `subject` int,
    `tutor` int,
    `teacher` int,
    `type` int,

    constraint `fk_post__subject` foreign key (`subject`) references `subjects` (`id`) on update cascade on delete restrict,
    constraint `fk_post__tutor` foreign key (`tutor`) references `students` (`id`) on update restrict on delete cascade,
    constraint `fk_post__teacher` foreign key (`teacher`) references `teachers` (`id`) on update restrict on delete cascade,
    constraint `fk_post__type` foreign key (`type`) references `types` (`id`) on update restrict on delete restrict

);

create table if not exists `requests` (

    `id` int not null auto_increment primary key,
    `post` int,
    `student` int,
    
    constraint `fk_request__post` foreign key (`post`) references `posts` (`id`) on update restrict on delete restrict,
    constraint `fk_request__student` foreign key (`student`) references `students` (`id`) on update restrict on delete restrict

);

CREATE PROCEDURE getPostsForTeacher
(IN curr_Id int)
select 
    posts.body,
    subjects.name,
    teachers.fName,
    teachers.lName,
    types.name
        from posts 
        inner join subjects on subjects.id = posts.subject
        left join teachers on teachers.id = posts.teacher
        inner join types on types.id = posts.ptype
        where posts.teacher=curr_Id;

CREATE PROCEDURE getPostsForStudent
(IN curr_Id int)
select 
    posts.body,
    subjects.name,
    students.fName,
    students.lName,
    types.name,
    classes.name
        from posts 
        inner join subjects on subjects.id = posts.subject
        left join students on students.id = posts.tutor
        inner join types on types.id = posts.type
        left join classes on classes.id = students.class
        where posts.tutor=curr_Id;


CREATE PROCEDURE notUserPosts
(IN curr_Id int)
select distinct
    posts.body,
    subjects.name,
    students.fName,
    students.lName,
    teachers.fName,
    teachers.lName,
    types.name,
    classes.name,
    posts.id
from posts
left join students on posts.tutor = students.id
inner join subjects on subjects.id = posts.subject
left join teachers on teachers.id = posts.teacher
inner join types on types.id = posts.type
left join classes on classes.id = students.class
    
except

select distinct
    posts.body,
    subjects.name,
    students.fName,
    students.lName,
    teachers.fName,
    teachers.lName,
    types.name,
    classes.name,
    posts.id
from requests
inner join posts on requests.post = posts.id
left join students on posts.tutor = students.id
inner join subjects on subjects.id = posts.subject
left join teachers on teachers.tid = posts.teacher
inner join types on types.id = posts.type
left join classes on classes.id = students.class
where requests.student=curr_Id;

CREATE PROCEDURE userPosts
(IN curr_Id int)
select distinct
    posts.body,
    subjects.name,
    students.fName,
    students.lName,
    teachers.fName,
    teachers.lName,
    types.name,
    classes.name,
    posts.id
from requests
inner join posts on requests.post = posts.id
left join students on posts.tutor = students.id
inner join subjects on subjects.id = posts.subject
left join teachers on teachers.tid = posts.teacher
inner join types on types.id = posts.type
left join classes on classes.id = students.class
where requests.student=curr_Id;

