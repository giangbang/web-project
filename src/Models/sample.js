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
  point: 10,
  quizId: 1,
  userId: 1
}

let submission2 = {
  sourceCode: "print(hello world)2",
  point: 11,
  quizId : 1,
  userId : 2
}

let submission3 = {
  sourceCode: "print(hello world)2",
  point: 4,
  quizId : 1,
  userId : 2
}

let submission4 = {
  sourceCode: "print(hello worlddw)2",
  point: 5,
  quizId : 2,
  userId : 3
}

let submission5 = {
  sourceCode: "pq23rint(hello world)2",
  point: 7,
  quizId : 2,
  userId : 2
}

let submission6 = {
  sourceCode: "ewdprint(hello world)2",
  point: 9,
  quizId : 1,
  userId : 2
}

let submission7 = {
  sourceCode: "2e2print(hello world)2",
  point: 8,
  quizId : 1,
  userId : 1
}

let submission8 = {
  sourceCode: "dwprint(hello world)2",
  point: 7,
  quizId : 2,
  userId : 1
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
  quiz: {
    title: "bai 1 khoa 1",
    content: "hello",
    tagId: 1
  }
}

let quiz2 = {
  quiz: {
    title: "bai 2 khoa 1",
    content: "hello world",
    tagId: 1
  }
}

let quiz3 = {
  quiz: {
    title: "bai 2 khoa 1",
    content: "hellofe world",
    tagId: 2
  }
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

let tag1 = {
  name: "string",
  courseId: 1
}


let tag2 = {
  name: "string2",
  courseId: 2
}

module.exports = async () => {
  let list = await controller.courses.getAll();
  if (list.data.length != 0) return ;
  try {
    await controller.users.create(user1);
    await controller.users.create(user2);
    await controller.courses.create(course1);
    await controller.courses.create(course2);
    await controller.tags.create(tag1);
    await controller.tags.create(tag2);
    await controller.quizzes.create(quiz2);
    await controller.quizzes.create(quiz1);
    await controller.quizzes.create(quiz3);
    await controller.submissions.create(submission1);
    await controller.submissions.create(submission2);
    await controller.submissions.create(submission3);
    await controller.submissions.create(submission4);
    await controller.submissions.create(submission5);
    await controller.submissions.create(submission6);
    await controller.submissions.create(submission7);
    await controller.submissions.create(submission8);
    await controller.comments.create(comment2);
    await controller.comments.create(comment1);
  } catch(e) {
    console.log('cannot init sample data');
  }
}