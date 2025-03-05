import { IBackground } from "../../../../common/types/background-interface";

interface CardDetailsProps {
    background: IBackground | null;
};

const CardDetails = ({ background }: CardDetailsProps) => {
    return (
        <div className="card-details-elements relative">
            <div className="card-details-left-button absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16">
                <button type="button" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                    <svg className="w-4 h-4 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                    <span className="sr-only">Previous card</span>
                </button>
            </div>
            <div className="card bg-neutral text-neutral-content w-96">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{background ? background.title : '?'}</h2>
                    <p>{background ? background.description : '???'}</p>
                </div>
            </div>
            <div className="card-details-buttons absolute right-0 top-1/2 -translate-y-1/2 translate-x-16">
                <div className="card-details-rigth-button">
                    <button type="button" className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                        <span className="sr-only">Next card</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;