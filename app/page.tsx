import { gql } from "@apollo/client";
import { getClient } from "../lib/apolloClient";

type Student = {
  firstName: string;
  lastName: string;
  age: number;
  id: string;
};

const GET_STUDENTS = gql`
  query getStudents {
    students {
      firstName
      lastName
      age
      id
    }
  }
`;

export default async function Home() {
  const { data, error, loading } = await getClient().query({
    query: GET_STUDENTS,
  });

  if (loading) {
    return <p>...loading</p>;
  }

  if (error) {
    return null;
  }

  return (
    <div className="container">
      <main>
        <ul>
          {data.students.map((student: Student) => (
            <li key={student.id}>
              {student.firstName} {student.lastName}: {student.id}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
