"use server";
import { revalidatePath } from "next/cache";
import prisma from "./utils/db";
export const addToWatchlist = async (formData: FormData) => {
  "use server";

  const movieId = formData.get("movieId");
  const pathname = formData.get("pathname") as string;
  const data = await prisma.watchList.create({
    data: {
      userId: "abc",
      movieId: Number(movieId),
    },
  });

  revalidatePath(pathname);
};

export const deleteFromWatchlist = async (formData: FormData) => {
  "use server";
  const watchListId = formData.get("watchlistId") as string;
  const pathname = formData.get("pathname") as string;

  const data = await prisma.watchList.delete({
    where: {
      id: watchListId,
    },
  });

  revalidatePath(pathname);
};
