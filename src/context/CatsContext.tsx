// CatsContext.tsx
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { ICat, ICatImage } from '../interfaces';

interface CatsProviderProps {
  children: ReactNode;
}

interface CatsContextProps {
  breeds: ICat[] | undefined;
  setBreeds: React.Dispatch<React.SetStateAction<ICat[] | undefined>>;
  isLoadingBreeds: boolean;
  setIsLoadingBreeds: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingCats: boolean;
  setIsLoadingCats: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBreedId: string | undefined;
  setSelectedBreedId: React.Dispatch<React.SetStateAction<string | undefined>>;
  cats: ICatImage[] | undefined;
  setCats: React.Dispatch<React.SetStateAction<ICatImage[] | undefined>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  noMoreData: boolean;
  setNoMoreData: React.Dispatch<React.SetStateAction<boolean>>;
}

const CatsContext = createContext<CatsContextProps>({
  breeds: undefined,
  setBreeds: () => { /* do nothing */ },
  isLoadingBreeds: false,
  setIsLoadingBreeds: () => { /* do nothing */ },
  isLoadingCats: false,
  setIsLoadingCats: () => { /* do nothing */ },
  selectedBreedId: undefined,
  setSelectedBreedId: () => { /* do nothing */ },
  cats: undefined,
  setCats: () => { /* do nothing */ },
  page: 1,
  setPage: () => { /* do nothing */ },
  noMoreData: false,
  setNoMoreData: () => { /* do nothing */ },
});

export const useCatsContext = (): CatsContextProps => useContext(CatsContext);

export const CatsProvider: React.FC<CatsProviderProps> = ({ children }: CatsProviderProps) => {
  const [breeds, setBreeds] = useState<ICat[]>();
  const [isLoadingBreeds, setIsLoadingBreeds] = useState<boolean>(false);
  const [isLoadingCats, setIsLoadingCats] = useState<boolean>(false);
  const [selectedBreedId, setSelectedBreedId] = useState<string>();
  const [cats, setCats] = useState<ICatImage[]>();
  const [page, setPage] = useState<number>(1);
  const [noMoreData, setNoMoreData] = useState<boolean>(false);

  return (
    <CatsContext.Provider
      value={{
        breeds,
        setBreeds,
        isLoadingBreeds,
        setIsLoadingBreeds,
        isLoadingCats,
        setIsLoadingCats,
        selectedBreedId,
        setSelectedBreedId,
        cats,
        setCats,
        page,
        setPage,
        noMoreData,
        setNoMoreData,
      }}
    >
      {children}
    </CatsContext.Provider>
  );
};

export default CatsContext;