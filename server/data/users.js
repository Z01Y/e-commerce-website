import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Tester1',
    email: 'tester1@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: ' Tester2',
    email: 'tester2@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
