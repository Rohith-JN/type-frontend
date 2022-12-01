export default function Home() {
  return (
    <>
      <div className='w-full flex flex-col items-center bg-primary h-screen'>
        <div className='w-1/2 h-10 rounded-xl mt-28 flex flex-row bg-sub-alt justify-around items-center'>
          <h1 className="text-sub text-md hover:text-white cursor-pointer font-lexend">@punctuation</h1>
          <h1 className="text-sub text-md hover:text-white cursor-pointer font-lexend">#numbers</h1>
          <div className="h-5 w-1 bg-primary rounded-md"></div>
          <h1 className="text-sub text-md hover:text-white cursor-pointer font-lexend">time</h1>
          <h1 className="text-sub text-md hover:text-white cursor-pointer font-lexend">quote</h1>
          <h1 className="text-sub text-md hover:text-white cursor-pointer font-lexend">words</h1>
          <div className="h-5 w-1 bg-primary rounded-md"></div>
          <h1 className="text-sub text-md hover:text-white cursor-pointer font-lexend">15</h1>
          <h1 className="text-sub text-md hover:text-white cursor-pointer font-lexend">30</h1>
          <h1 className="text-sub text-md hover:text-white cursor-pointer font-lexend">60</h1>
          <h1 className="text-sub text-md hover:text-white cursor-pointer font-lexend">120</h1>
        </div>
      </div>
    </>
  )
}
