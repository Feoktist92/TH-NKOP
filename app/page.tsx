import Slider from './components/Slider/Slider';
import { mockData } from './data/mockData';

export default function Home() {
    return (
        <main className='container'>
            <h1 className='title'>Полезные материалы</h1>
            <p className='text'>
                Собрали для вас полезные исследования схемы кормления и другие
                материалы, которые пригодятся для лучших результатов на вашем
                хозяйстве
            </p>
            <Slider data={mockData} />
        </main>
    );
}
