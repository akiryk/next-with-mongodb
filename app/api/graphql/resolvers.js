import { Student } from "./models/Student";

export const resolvers = {
  Query: {
    hello: () => "GraphQL is Awesome",
    welcome: (_, params) => `Hello ${params.name}`,
    students: async (parent, args, context) => {
      console.log("asking for students", parent, args, context);
      return await Student.find({});
    },
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
    update: async (parent, args) => {
      const { id } = args;
      const updatedStudent = await Student.findByIdAndUpdate(id, args, {
        new: true,
      });
      if (!updatedStudent) {
        throw new Error(`Student with ID ${id} not found`);
      }
      return updatedStudent;
    },
    delete: async (parent, args) => {
      const { id } = args;
      const deletedStudent = await Student.findByIdAndDelete(id);
      if (!deletedStudent) {
        throw new Error(`Student with id ${id} not found`);
      }
      return deletedStudent;
    },
  },
};
