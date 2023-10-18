import { Student } from "./models/Student";

export const resolvers = {
  Query: {
    hello: () => "GraphQL is Awesome",
    welcome: (_, params) => `Hello ${params.name}`,
    students: async () => await Student.find({}),
    student: async (parent, args) => await Student.findById(args.id),
  },
  Mutation: {
    create: async (parent, args) => {
      const { firstName, lastName, age } = args;
      const newStudent = new Student({
        firstName,
        lastName,
        age,
      });
      await newStudent.save();
      return newStudent;
    },
  },
};
