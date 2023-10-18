import Head from "next/head";
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

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const raw = await db.collection("movies").find({}).limit(2).toArray();
    const movie = JSON.stringify(raw);
    const parsedMovie = JSON.parse(movie);
    return {
      props: {
        isConnected: true,
        movies: parsedMovie,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
  movies = [],
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!isConnected) {
    return <p>loading...</p>;
  }
  const listItems = movies.map((movie: Movie) => (
    <li key={movie.title}>
      {movie.title} is from {movie.year}!
    </li>
  ));
  return (
    <div className="container">
      <main>
        <h2>Hi there!</h2>
        {movies.length > 0 ? (
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

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>
    </div>
  );
}
