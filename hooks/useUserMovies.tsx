import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Movie } from "../@types/movie";

type UserMovies = {
  watched: Movie[];
  list: Movie[];
};

export const useUserMovies = () => {
  const [movies, setMovies] = useState<UserMovies | null>(null);
  const [loading, setLoading] = useState(true);
  const moviesDoc = useRef(
    firestore().collection("movies").doc(auth().currentUser?.uid),
  ).current;

  useEffect(() => {
    const unsubscribe = moviesDoc.onSnapshot(async (snapshot) => {
      setLoading(true);

      if (!snapshot.exists) {
        await moviesDoc.set({
          watched: [],
          list: [],
        });
      }

      const data = snapshot.data();

      if (!data) {
        return;
      }

      setMovies(data as UserMovies);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return movies;
};
