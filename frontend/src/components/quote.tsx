import { GetQuote } from "../hooks/getQuote";
import { quote } from "../hooks/getQuote";

export default function Quote() {
  const quote : quote[] = GetQuote();
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col ">
      <div className="flex justify-center">
        <div className=" max-w-lg  ">
          <div className="text-3xl font-bold">
              {quote[0].q}
          </div>
          <div className="mt-4 max-w-lg text-xl font-semibold ">
              - {quote[0].a}
          </div>

        </div>
      </div>  
    </div>
  )
}
