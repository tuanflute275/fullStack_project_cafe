// database cafenodejs

create table users 
(
    id int primary key auto_increment,
    name varchar(250),
    contactNumber varchar(50),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),       
    unique (email)
);
INSERT INTO `users`(`name`, `contactNumber`, `email`, `password`, `status`, `role`) VALUES ('Admin','0386564543','admin@gmail.com','admin','true','admin');

create table category(
    id int primary key AUTO_INCREMENT,
    name varchar(255) not null
)

create table product(
    id int primary key AUTO_INCREMENT,
    name varchar(255) not null,
    categoryId int not null,
    description varchar(255),
    price float,
    status varchar(20)
);

create table bill(
    id int primary key AUTO_INCREMENT,
    uuid varchar(255) not null,
    name varchar(255) not null,
    email varchar(50) not null,
    contactNumber varchar(50) not null,
    paymentMethod varchar(50) not null,
    total int not null,
    productDetails JSON DEFAULT null,
    createBy varchar(200) not null
);