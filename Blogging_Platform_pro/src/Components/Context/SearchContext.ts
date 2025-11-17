import { useContext } from "react";
import { createContext } from "react";
import type{ SearchContextType } from "../Helper/Type";

export const SearchContext=createContext<SearchContextType>({
    query:"",
    setQuery:(value:string)=>{},
    Searchdata:(username:string)=>[]
})
export const SearchContextProvider=SearchContext.Provider;
export default function useSearch(){
   return( useContext(SearchContext)); 
}   