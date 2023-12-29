import styles from './RentalAbout.module.css';

export function RentalAbout(){
    return (
        <div className="flex flex-col justify-center items-start ">
            <h1  className={styles.textGradient}>快速交易</h1>
            <h2  className='text-5xl font-bold'>能量秒到账</h2>
            <div className='py-1 text-gray-400 text-xl pt-4'><span>价格低至 40 SUN/天</span></div>
            <div className='py-1 text-gray-400 text-xl'><span>租期更长，最长30天</span></div>
            <div className='py-1 text-gray-400 text-xl'><span>范围更大，支持3.2 万起租</span></div>
            <div className='py-1 text-gray-400 text-xl'><span>剩余可租能量 144,772,901</span></div>
            <div className='py-1 text-gray-400 text-xl'><span>单笔最大可租：2,000,000,000</span></div>
            <div className='py-1 text-gray-400 text-xl'><span>如需预定大额能量 <a className='text-blue-600' href='https://t.me/bitcyber'>联系在线客服</a></span></div>
        </div>
    )
}