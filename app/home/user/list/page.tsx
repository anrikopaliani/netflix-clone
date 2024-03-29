import MovieCard from "@/app/components/MovieCard";
import { authOptions } from "@/app/utils/auth";
import prisma from "@/app/utils/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
async function getData(userId: string) {
  const data = await prisma.watchList.findMany({
    where: {
      userId: userId,
    },
    select: {
      Movie: {
        select: {
          title: true,
          age: true,
          duration: true,
          imageString: true,
          release: true,
          id: true,
          WatchLists: true,
          youtubeString: true,
          overview: true,
        },
      },
    },
  });

  return data;
}

const WatchlistPage = async () => {
  const session = await getServerSession(authOptions);
  const data = await getData(session?.user?.email as string);
  return (
    <>
      <h1 className="text-4xl font-bold underline mt-10 px-5 sm:px-0 text-white">
        Your Watchlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-0 gap-6">
        {data?.map((movie) => (
          <div key={movie.Movie?.id} className="relative h-60">
            <Image
              src={movie.Movie?.imageString as string}
              width={500}
              height={400}
              className="rounded absolute w-full h-full object-cover"
              alt="Movie"
            />
            <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-grandient-to-b from-transparent via-black/50 to-black z-10 w-full h-full  rounded-lg flex items-center justify-center">
                <Image
                  src={movie.Movie?.imageString as string}
                  width={800}
                  height={800}
                  className=" absolute w-full h-full -z-10 rounded-lg object-cover brightness-50 "
                  alt="Movie"
                />

                <MovieCard
                  key={movie.Movie?.id}
                  age={movie.Movie?.age as number}
                  movieId={movie.Movie?.id as number}
                  overview={movie.Movie?.overview as string}
                  time={movie.Movie?.duration as number}
                  title={movie.Movie?.title as string}
                  year={movie.Movie?.release as number}
                  youtubeUrl={movie.Movie?.youtubeString as string}
                  watchListId={movie.Movie?.WatchLists[0]?.id as string}
                  watchList={
                    (movie.Movie?.WatchLists.length as number) > 0
                      ? true
                      : false
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WatchlistPage;
