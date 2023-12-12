import Fuse from "fuse.js";
import { useEffect } from "react";

const fuseOptions = {
	isCaseSensitive: false,
	includeScore: true,
	shouldSort: true,
	findAllMatches: true,
	threshold: 0.2,
	keys: ["deckName"],
};

function useFuseFilter(list: unknown[]) {
  let fuse;
  useEffect(() => {
  }, list)
  
  // flascard deck filter helper
  const search = (target: string) => {

  }

}