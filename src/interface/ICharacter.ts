export default interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  type: string;
  location: {
    name: string;
    url: string;
  };
  episode: string[];
}
