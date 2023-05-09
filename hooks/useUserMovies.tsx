import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Movie } from "../@types/movie";

type UserMovies = {
  list: Movie[];
};

export const useUserMovies = () => {
  const [movies, setMovies] = useState<UserMovies | null>(null);
  const [loading, setLoading] = useState(true);
  const moviesDoc = useRef(
    firestore()
      .collection(`movies`)
      .doc(auth().currentUser?.uid)
      .collection("list"),
  ).current;

  useEffect(() => {
    const unsubscribe = moviesDoc.onSnapshot(async (snapshot) => {
      setLoading(true);

      if (snapshot.docs.length === 0) {
        return;
      }

      setMovies({ list: snapshot.docs.map((doc) => doc.data()) } as UserMovies);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return movies;
};
