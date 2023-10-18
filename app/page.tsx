import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type Movie = {
  title: string;
  year: number;
};

type ConnectionStatus = {
  isConnected: boolean;
  movies?: Array<Movie>;
};

export default async function Home() {
  let props = { isConnected: false, movies: [] };
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const raw = await db.collection("movies").find({}).limit(2).toArray();
    // const movie = JSON.stringify(raw);
    // const parsedMovie = JSON.parse(movie);

    props.isConnected = true;
    props.movies = JSON.parse(JSON.stringify(raw));
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }

  if (!props.isConnected) {
    return <p>loading...</p>;
  }
  const listItems = props.movies.map((movie: Movie) => (
    <li key={movie.title}>
      {movie.title} is from {movie.year}!
    </li>
  ));
  return (
    <div className="container">
      <main>
        {props.movies.length > 0 ? (
          <>
            <h2>Movies</h2>
            <ul>{listItems}</ul>
          </>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
            for instructions.
          </h2>
        )}
      </main>
    </div>
  );
}
