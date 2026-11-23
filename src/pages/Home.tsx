import DeskScene from '../components/home/DeskScene';
import { usePageTitle } from '../components/common/usePageTitle';

export default function Home() {
  usePageTitle();
  return <DeskScene />;
}
