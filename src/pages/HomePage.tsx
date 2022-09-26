import { useEffect, useState } from "react";
import { RepoCard } from "../components/RepoCart";
import { useDebounce } from "../hooks/debounce";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const debounced = useDebounce(search);
  const { isError, isLoading, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
  });
  useEffect(() => {
    setDropDown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();
  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="flex justify-center pt-10 mx-auto h-screen w-screen ">
          smth went wrong
        </p>
      )}
      <div className="relative w-[560px]">
        <input
          className="border py-2 px-4 w-full h-[42px] mb-2"
          type="text"
          placeholder="username"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        ></input>
        {dropDown && (
          <ul className="absolute list-none top-[42px] left-0 right-0 max-h-[200px] shadow-md overflow-y-scroll bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {data?.map((item) => (
              <li
                onClick={() => {
                  fetchRepos(item.login);
                  setDropDown(false);
                }}
                key={item.id}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer "
              >
                {item.login}
              </li>
            ))}
          </ul>
        )}
        <div>
          {areReposLoading && <p className="text-center">Loading...</p>}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
