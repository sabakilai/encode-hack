"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui';
import { IoCameraOutline } from 'react-icons/io5';
import { images } from '@/public/images';

const ResultPage = () => {
    const router = useRouter();
    return (
        <main className="flex min-h-svh flex-col p-6">
            <h1 className="text-2xl uppercase text-right">oops!</h1>
            <div className="py-4"></div>
            <div className='my-auto'>
                <Image src={images.cat} alt="cat" width="500" height="500" className='m-auto frame' />
                <div className="py-4"></div>
                <div className='px-6'>
                    <div>
                        {/* <h2 className='font-mono uppercase'>food category:</h2> */}
                        <p className="uppercase">We're working hard to deploy our backend. Please bear with us!</p>
                    </div>
                </div>
                <div className="py-8"></div>

                <div className="flex w-full mb-8 justify-evenly">
                    <Button size="lg_icon" variant="secondary" onClick={() => router.push('/scanIngredients')}>
                        <IoCameraOutline size={60} />
                    </Button>
                </div>
            </div>
        </main >
    );
};

export default ResultPage;