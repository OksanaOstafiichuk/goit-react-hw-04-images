import { TailSpin } from 'react-loader-spinner';
import { Spiner } from './Loader.styled';

export const Loader = () => {
  return (
    <Spiner>
      <TailSpin color="#3f51b5" height={80} width={80} />
    </Spiner>
  );
};
