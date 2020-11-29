'use strict';

const controller  = require('../Controllers');


let user2 = {
  username: 'long',
  password: 'long',
  fullname: 'long',
  admin: false
}

let user1 = {
  username: 'giang',
  password: 'giang',
  fullname: 'giangbang',
  admin: false
}

let submission1 = {
  sourceCode: "print(hello world)1",
  quizId: 1,
  userId: 1
}

let submission2 = {
  sourceCode: "print(hello world)2",
  quizId : 1,
  userId : 2
}


let course2 = {
  name: "tin hoc co so 2",
  code: "THCS2"
}

let course1 = {
  name: "tin hoc co so 1",
  code: "THCS1"
}

let quiz1 = {
  title: "bai 1 khoa 1",
  content: "hello",
  courseId: 1
}

let quiz2 = {
  title: "bai 2 khoa 1",
  content: "hello world",
  courseId: 1
}

let comment2 = {
  content: "heyo",
  userId: 1,
  quizId: 1
}


let comment1 = {
  content: "hey",
  userId: 1,
  quizId: 1
}

module.exports = async () => {
  let list = await controller.courses.getAll();
  if (list.data.length != 0) return ;
  try {
    controller.users.create(user1);
    await controller.users.create(user2);
    controller.courses.create(course1);
    controller.courses.create(course2);
    controller.quizzes.create(quiz1);
    await controller.quizzes.create(quiz2);
    controller.submissions.create(submission1);
    controller.submissions.create(submission2);
    await controller.comments.create(comment2);
    controller.comments.create(comment1);
  } catch(e) {
    console.log('cannot init sample data');
  }
}