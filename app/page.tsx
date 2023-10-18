// import { gql } from "@apollo/client";
// import { getClient } from "../lib/apolloClient";

// type Student = {
//   firstName: string;
//   lastName: string;
//   age: number;
//   id: string;
// };

// const GET_STUDENTS = gql`
//   query getStudents {
//     students {
//       firstName
//       lastName
//       age
//       id
//     }
//   }
// `;

export default async function Home() {
  // const { data, error, loading } = await getClient().query({
  //   query: GET_STUDENTS,
  // });

  // if (loading) {
  //   return <p>...loading</p>;
  // }

  // if (error) {
  //   return null;
  // }

  return (
    <div className="container">
      <main>hello</main>
    </div>
  );
}
